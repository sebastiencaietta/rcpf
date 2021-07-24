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

export const filterSearch = (needle, stack, getFullString) => {
    if (needle === '') {
        return stack;
    }

    const lowerCaseNeedle = needle.toLowerCase();
    const normalizedNeedle = lowerCaseNeedle.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return stack.filter(element => {
        const fullString = typeof element === 'object' ? getFullString(element) : element;
        const lowerCaseFullString = fullString.toLowerCase();

        if (lowerCaseFullString.includes(lowerCaseNeedle)) {
            return true;
        }

        //remove accents
        const normalizedFullString = lowerCaseFullString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        return normalizedFullString.includes(normalizedNeedle);
    });
};

export const includesNormalized = (needle, compare) => {
    if (needle === '') {
        return true;
    }

    const lowerCaseNeedle = needle.toLowerCase();
    const lowerCaseCompare = compare.toLowerCase();

    if (lowerCaseCompare.includes(lowerCaseNeedle)) {
        return true;
    }

    const normalizedCompare = lowerCaseCompare.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalizedCompare.includes(lowerCaseNeedle.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
}
