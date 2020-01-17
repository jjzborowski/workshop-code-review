export const firebaseURL = 'https://frontend-workshop.firebaseio.com/zborowski/';
export const PICSUM_URL = "https://picsum.photos/";

export const getRandomIntegerNumberBetweenTwoValues = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const returnedValue = Math.floor(Math.random() * (
        max - min + 1
    )) + min;
    return returnedValue;
};