export const addOrRemoveInArray = (array, id) => {
    const index = array.indexOf(id);

    if (index === -1) {
        return [...array, id];
    }
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1, array.length),
    ];
};
