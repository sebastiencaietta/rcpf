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

export const sortAlphabetically = (array, propName) => {
    return array.sort((a, b) => a[propName] < b[propName] ? -1 : a[propName] > b[propName] ? 1 : 0);
}
