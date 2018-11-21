export const addOrRemoveInArray = (array, id) => {
    const index = array.indexOf(id);
    let newArray;

    if (index === -1) {
        newArray = [...array, id];
    } else {
        newArray = [
            ...array.slice(0, index),
            ...array.slice(index + 1, array.length),
        ];
    }

    return newArray;
};
