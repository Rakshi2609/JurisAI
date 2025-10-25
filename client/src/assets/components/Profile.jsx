import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { avatarUrls as avatars, avatarNames, getAvatarUrlByName } from '../icons/avatars';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || {};
        } catch {
            return {};
        }
    });

    const initialIndex = (() => {
        // support both older user.avatar (string) and user.avatarIndex (number)
        if (typeof user.avatarIndex === 'number') return user.avatarIndex;
        if (user.avatar) {
            const idx = avatars.findIndex(a => a === user.avatar);
            return idx >= 0 ? idx : 0;
        }
        return 0;
    })();

    const [name, setName] = useState(user.name || "");
    const [avatarIndex, setAvatarIndex] = useState(initialIndex);

    useEffect(() => {
        setName(user.name || "");
        // when user object changes externally, keep avatarIndex in sync
        if (typeof user.avatarIndex === 'number') setAvatarIndex(user.avatarIndex);
    }, [user]);

    const handleSave = (e) => {
        e.preventDefault();
        const avatarName = avatarNames[avatarIndex] || null;
        const updatedLocal = { ...user, name, avatar: avatars[avatarIndex], avatarName, avatarIndex };

        // Optimistically update localStorage first
        try {
            localStorage.setItem('user', JSON.stringify(updatedLocal));
            setUser(updatedLocal);
        } catch (err) {
            console.error('Failed to write localStorage', err);
        }

        // If we have an email, attempt to persist to server
        const email = user && user.email;
        if (email) {
            fetch('/api/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, avatar: avatarName, avatarIndex })
            })
                .then((res) => res.json().then(j => ({ status: res.status, body: j })))
                .then(({ status, body }) => {
                    if (status >= 200 && status < 300) {
                        // prefer server returned user
                        if (body && body.user) {
                            // server returns avatar (name or null) and avatarIndex
                            const srv = body.user;
                            // map server avatar to local URL for rendering
                            const url = srv.avatarIndex != null ? avatars[srv.avatarIndex] : (srv.avatar ? getAvatarUrlByName(srv.avatar) : null);
                            const merged = { ...srv, avatar: url, avatarName: srv.avatar };
                            localStorage.setItem('user', JSON.stringify(merged));
                            setUser(merged);
                        }
                        navigate('/home');
                    } else {
                        console.warn('Server rejected profile update', body);
                        // still navigate back — local update applied
                        navigate('/home');
                    }
                })
                .catch((err) => {
                    console.error('Failed to update profile on server', err);
                    // offline/failure: keep local changes
                    navigate('/home');
                });
            return;
        }

        // No email (not logged-in) — just store locally
        navigate('/home');
    };

    return (
        <div className="profile-page">

            <form className="profile-form" onSubmit={handleSave}>
                <label>
                    Display name
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                </label>

                <div className="avatar-picker">
                    <div className="label">Choose an avatar</div>
                    <div className="avatars" role="list">
                        {avatars.map((src, i) => (
                            <button
                                key={i}
                                type="button"
                                role="listitem"
                                className={`avatar-btn ${avatarIndex === i ? 'selected' : ''}`}
                                onClick={() => setAvatarIndex(i)}
                                aria-pressed={avatarIndex === i}
                                aria-label={`Choose avatar ${i + 1}`}
                            >
                                <img src={src} alt={`avatar ${i + 1}`} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="actions">
                    <button type="submit" className="save-btn">Save</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
