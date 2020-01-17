import { FIREBASE_URL } from './constants.js';

export const apiGetImages = async () => {
    try {
        const response = await fetch(FIREBASE_URL + 'images.json');
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const ApiSetImage = async (imageData) => {
    try {
        const response = await fetch(FIREBASE_URL + 'images.json', {
            method: 'POST',
            body: JSON.stringify(imageData),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const apiRemoveImageById = async (imageId) => {
    try {
        const response = await fetch(FIREBASE_URL + 'images/' + imageId +'.json', {
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const apiRemoveImages = async () => {
    try {
        const response = await fetch(`${FIREBASE_URL}images.json`, {
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};