import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

export default function SplineScene({ className = '', interactive = false, url = 'https://prod.spline.design/c0RQndEuf0Qy09Qx/scene.splinecode', rotateSpeed = 0.01 }) {
    const mountRef = useRef(null);
    const rendererRef = useRef(null);
    const splineRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const width = Math.max(100, rect.width || 400);
        const height = Math.max(100, rect.height || 400);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
        camera.position.set(189.48, 6.01, 72.34);
        camera.quaternion.setFromEuler(new THREE.Euler(-0.17, 1.12, 0.15));

        const scene = new THREE.Scene();

        const loader = new SplineLoader();
        loader.load(
            url,
            (splineScene) => {
                scene.add(splineScene);
                splineRef.current = splineScene;

                // Attempt to find a sensible robot root inside the loaded scene so we can
                // rotate the robot in place instead of revolving the whole scene.
                // Strategy: prefer a named node containing robot/bot/arm/head.
                // If none found, pick the largest mesh/group by bounding-box volume as a heuristic.
                let robotCandidate = null;
                splineScene.traverse((child) => {
                    if (!robotCandidate && child.name) {
                        const n = child.name.toLowerCase();
                        if (n.includes('robot') || n.includes('bot') || n.includes('arm') || n.includes('head')) {
                            robotCandidate = child;
                        }
                    }
                });

                if (!robotCandidate) {
                    // find largest mesh/group by bounding-box volume
                    let largest = { node: null, volume: 0 };
                    splineScene.traverse((child) => {
                        try {
                            if (child.isMesh || child.type === 'Group' || child.type === 'Object3D') {
                                const box = new THREE.Box3().setFromObject(child);
                                const size = box.getSize(new THREE.Vector3());
                                const volume = Math.max(0.000001, size.x * size.y * size.z);
                                if (volume > largest.volume) {
                                    largest.node = child;
                                    largest.volume = volume;
                                }
                            }
                        } catch (e) {
                            // ignore objects that fail bounding-box computation
                        }
                    });
                    if (largest.node) robotCandidate = largest.node;
                }

                // If we have a candidate, create a pivot group centered on its bounding box
                // center and reparent the candidate into that pivot so rotating the pivot
                // produces an in-place rotation (not a revolution around scene origin).
                if (robotCandidate) {
                    // store the detected robot node and keep it in its original parent
                    splineRef.current.robot = robotCandidate;
                    // record base rotation to ease back to neutral when pointer is idle
                    splineRef.current.robot._baseRotX = robotCandidate.rotation.x || 0;
                    splineRef.current.robot._baseRotY = robotCandidate.rotation.y || 0;

                    // debug info: log which node was selected and basic geometry info
                    try {
                        const box = new THREE.Box3().setFromObject(robotCandidate);
                        const center = box.getCenter(new THREE.Vector3());
                        const size = box.getSize(new THREE.Vector3());
                        const worldPos = new THREE.Vector3();
                        robotCandidate.getWorldPosition(worldPos);
                        //   console.log('Spline: selected robot node=', robotCandidate.name || robotCandidate.type, 'center=', center, 'size=', size, 'worldPos=', worldPos, 'parent=', robotCandidate.parent && robotCandidate.parent.name);

                        // Improved camera framing: offset further back and up, widen FOV for full robot view
                        try {
                            // Calculate a good distance based on robot size
                            const maxDim = Math.max(size.x, size.y, size.z);
                            // Zoom in: closer to robot, slightly above and in front
                            const offset = new THREE.Vector3(
                                0,
                                size.y * 0.2, // just above center
                                maxDim * 1.1 // much closer for zoom
                            );
                            camera.position.copy(center.clone().add(offset));
                            camera.fov = 38; // zoomed-in field of view
                            camera.lookAt(center);
                            camera.updateProjectionMatrix();
                            splineRef.current.targetCenter = center.clone();

                            // Make robot face the camera (reset rotation)
                            robotCandidate.rotation.x = 0;
                            robotCandidate.rotation.y = 0;
                            robotCandidate.rotation.z = 0;
                        } catch (e) {
                            console.warn('Spline: camera reposition failed', e);
                        }
                    } catch (e) {
                        console.log('Spline: robot debug error', e);
                    }
                }
            },
            undefined,
            (err) => console.error('Spline load error', err)
        );

        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.125;
        controls.enablePan = false;
        controls.enableZoom = interactive;
        controls.enabled = interactive;

        // If a target center was set earlier (when spline loaded), apply it to controls
        if (splineRef.current && splineRef.current.targetCenter) {
            try {
                controls.target.copy(splineRef.current.targetCenter);
                controls.update();
            } catch (e) { /* ignore */ }
        }

        // track when the user is actively interacting so we can pause auto-rotate
        let userInteracting = false;
        const onControlStart = () => { userInteracting = true; };
        const onControlEnd = () => { userInteracting = false; };
        controls.addEventListener && controls.addEventListener('start', onControlStart);
        controls.addEventListener && controls.addEventListener('end', onControlEnd);

        // Pointer tracking for subtle mouse-follow motion (works for mouse and touch)
        const pointer = { x: 0, y: 0 };
        const pointerTarget = { x: 0, y: 0 };
        let rectForPointer = container.getBoundingClientRect();
        const onPointerMove = (e) => {
            // prefer using the renderer canvas rect so coordinates map to the visible 3D area
            const rect = renderer.domElement.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const nx = (e.clientX - cx) / (rect.width / 2); // -1..1 relative to center
            const ny = (e.clientY - cy) / (rect.height / 2); // -1..1
            // clamp
            pointerTarget.x = Math.max(-1, Math.min(1, nx));
            pointerTarget.y = Math.max(-1, Math.min(1, ny));
            // debug
            // console.debug('[Spline] pointerTarget', pointerTarget.x.toFixed(2), pointerTarget.y.toFixed(2));
        };
        // ensure touch actions don't block pointer events on the canvas
        renderer.domElement.style.touchAction = 'none';

        const onPointerLeave = () => {
            pointerTarget.x = 0;
            pointerTarget.y = 0;
        };
        // attach pointer listeners to both the container and the renderer canvas
        // (some browsers dispatch to the canvas first). Also log for debugging.
        container.addEventListener('pointermove', onPointerMove);
        container.addEventListener('pointerleave', onPointerLeave);
        try {
            renderer.domElement.addEventListener('pointermove', onPointerMove);
            renderer.domElement.addEventListener('pointerleave', onPointerLeave);
        } catch (e) {
            // ignore if renderer element not available for some reason
        }

        // resize handling
        const resize = () => {
            const r = container.getBoundingClientRect();
            const w = Math.max(10, Math.floor(r.width));
            const h = Math.max(10, Math.floor(r.height));
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        let resizeObserver = null;
        if (window.ResizeObserver) {
            resizeObserver = new ResizeObserver(resize);
            resizeObserver.observe(container);
        } else {
            window.addEventListener('resize', resize);
        }

        let mounted = true;
        function animate() {
            if (!mounted) return;
            // follow the pointer to rotate the model in place (no auto-rotate)
            if (splineRef.current) {
                const robot = splineRef.current.robot;
                if (robot) {
                    // parameters for pointer-driven motion
                    const maxTilt = 0.12; // radians for X tilt
                    const maxYaw = 0.6; // radians for Y rotation range

                    // lerp pointer values for smooth motion
                    pointer.x += (pointerTarget.x - pointer.x) * 0.12;
                    pointer.y += (pointerTarget.y - pointer.y) * 0.12;

                    // initialize robot base rotations
                    if (robot._baseRotX === undefined) robot._baseRotX = robot.rotation.x || 0;
                    if (robot._baseRotY === undefined) robot._baseRotY = robot.rotation.y || 0;

                    // compute target rotations solely from pointer (no auto-rotation)
                    const targetRotX = robot._baseRotX + (-pointer.y) * maxTilt;
                    const targetRotY = robot._baseRotY + pointer.x * maxYaw;

                    // smooth toward target
                    robot.rotation.x += (targetRotX - robot.rotation.x) * 0.14;
                    robot.rotation.y += (targetRotY - robot.rotation.y) * 0.12;
                } else {
                    // fallback: rotate the whole scene based on pointer X (no auto-rotate)
                    pointer.x += (pointerTarget.x - pointer.x) * 0.12;
                    const targetY = pointer.x * 0.6;
                    splineRef.current.rotation.y += (targetY - splineRef.current.rotation.y) * 0.12;
                }
            }
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();

        return () => {
            mounted = false;
            if (resizeObserver) resizeObserver.disconnect();
            else window.removeEventListener('resize', resize);
            controls.removeEventListener && controls.removeEventListener('start', onControlStart);
            controls.removeEventListener && controls.removeEventListener('end', onControlEnd);
            controls.dispose();
            container.removeEventListener('pointermove', onPointerMove);
            container.removeEventListener('pointerleave', onPointerLeave);
            try {
                renderer.domElement.removeEventListener('pointermove', onPointerMove);
                renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
            } catch (e) {
                // ignore
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
                if (rendererRef.current.domElement && rendererRef.current.domElement.parentNode) {
                    rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
                }
            }
        };
    }, [interactive, url, rotateSpeed]);

    return (
        <div
            ref={mountRef}
            className={className}
            style={{
                width: '100%',
                height: '100%',
                pointerEvents: 'auto',
                overflow: 'visible', // ensure canvas is not clipped
                position: 'relative',
            }}
        />
    );
}
