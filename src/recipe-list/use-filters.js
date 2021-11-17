import React, {createContext, useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {FILTER_NAME_ID, FILTER_NEW_ID, FILTER_OLD_ID} from "../global/constants/filters";

const filtersContext = createContext({});

export function ProviderFilters({children}) {
    const filters = useProvideFilters();
    const history = useHistory();

    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'PUSH' && !location.pathname.startsWith('/recipes/')) {
                filters.reset();
            }
        });
    }, [filters, history])

    return <filtersContext.Provider value={filters}>
        {children}
    </filtersContext.Provider>
}

export const useFilters = () => {
    return useContext(filtersContext);
}

const sortByOptions = [
    {id: FILTER_NEW_ID, title: 'Nouveauté'},
    {id: FILTER_OLD_ID, title: 'Ancieneté'},
    {id: FILTER_NAME_ID, title: 'Nom'},
];

const initialState = {
    search: '',
    category: '',
    tags: [],
    diets: [],
    seasons: [],
    sortBy: 'new',
    page: 1,
};

function useProvideFilters() {
    const [filters, setFilters] = useState({...initialState});

    return {
        filters,
        sortByOptions: sortByOptions,
        onUpdateSearch: (search) => setFilters({...filters, search}),
        onToggleCategory: (category) => setFilters({...filters, category}),
        onToggleSortBy: (sortBy) => setFilters({...filters, sortBy}),
        setSelectedTags: (tags) => setFilters({...filters, tags}),
        setSelectedDiets: (diets) => setFilters({...filters, diets}),
        setSelectedSeasons: (seasons) => setFilters({...filters, seasons}),
        onUpdatePage: (page) => setFilters({...filters, page: page}),
        reset: () => setFilters({...initialState}),
    }
}
