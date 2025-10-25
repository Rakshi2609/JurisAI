// Centralized avatar imports and names — use the SVG files that already exist in the icons folder.
import Bird from './animal-bird-domestic-svgrepo-com.svg';
import Bug from './animal-bug-domestic-2-svgrepo-com.svg';
import Butterflies from './animal-butterflies-domestic-svgrepo-com.svg';
import CatDomestic from './animal-cat-domestic-2-svgrepo-com.svg';
import Face from './animal-domestic-face-3-svgrepo-com.svg';
import Mouse from './animal-domestic-mouse-svgrepo-com.svg';
import Octopus from './animal-domestic-octopus-2-svgrepo-com.svg';
import Pet from './animal-domestic-pet-3-svgrepo-com.svg';

export const avatarUrls = [
    Bird,
    Bug,
    Butterflies,
    CatDomestic,
    Face,
    Mouse,
    Octopus,
    Pet,
];

export const avatarNames = [
    'animal-bird-domestic-svgrepo-com.svg',
    'animal-bug-domestic-2-svgrepo-com.svg',
    'animal-butterflies-domestic-svgrepo-com.svg',
    'animal-cat-domestic-2-svgrepo-com.svg',
    'animal-domestic-face-3-svgrepo-com.svg',
    'animal-domestic-mouse-svgrepo-com.svg',
    'animal-domestic-octopus-2-svgrepo-com.svg',
    'animal-domestic-pet-3-svgrepo-com.svg',
];

export function getAvatarUrlByName(name) {
    const idx = avatarNames.indexOf(name);
    if (idx >= 0) return avatarUrls[idx];
    return null;
}

export default avatarUrls;
