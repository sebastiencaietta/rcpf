const FILTER_NEW_ID = 'new';
const FILTER_OLD_ID = 'old';
const FILTER_NAME_ID = 'slug';
const FILTER_ADDED_AT_ID = 'addedAt';
const FILTER_ADDED_AT_ASC_ID = 'addedAtAsc';

export const FILTER_NEW = {
    id: 'new',
    title: 'Date (Du + au - récent)',
    field: 'createdAt',
    order: 'desc',
    isListMetadata: false
};
export const FILTER_OLD = {
    id: 'old',
    title: 'Date (Du - au + récent)',
    field: 'createdAt',
    order: 'asc',
    isListMetadata: false
};
export const FILTER_NAME = {
    id: 'slug',
    title: 'Ordre alphabétique',
    field: 'slug',
    order: 'asc',
    isListMetadata: false
};
export const FILTER_ADDED_AT = {
    id: 'addedAt',
    title: 'Ordre d\'ajout',
    field: 'addedAt',
    order: 'desc',
    isListMetadata: true
};
export const FILTER_ADDED_AT_ASC = {
    id: 'addedAtAsc',
    title: 'Ordre d\'ajout (- au + récent)',
    field: 'addedAt',
    oder: 'asc',
    isListMetadata: true
};

export const filterIdToObjectMap = {
    [FILTER_NEW_ID]: FILTER_NEW,
    [FILTER_OLD_ID]: FILTER_OLD,
    [FILTER_NAME_ID]: FILTER_NAME,
    [FILTER_ADDED_AT_ID]: FILTER_ADDED_AT,
    [FILTER_ADDED_AT_ASC_ID]: FILTER_ADDED_AT_ASC,
}
