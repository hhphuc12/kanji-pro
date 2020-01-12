export const getRandomPositionArray = length => {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(i);
    }
    // random swap
    let currentIndex = length;
    while (0 !== currentIndex) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        let temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

export const randomizeOneOrTwo = () => {
    return Math.random() >= 0.5 ? 1 : 2;
}

export const randomizeInRange = (min, max) => {
    if (max < min) return 0;
    return Math.round(Math.random() * (max - min) + min);
}