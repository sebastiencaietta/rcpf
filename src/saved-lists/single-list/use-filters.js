import React, {createContext, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {FILTER_ADDED_ASC_AT_ID, FILTER_ADDED_AT_ID} from "../../global/constants/filters";
import {sortByOptions} from "../../recipe-list/use-filters";

const listViewFiltersContext = createContext({});

export function ProviderListViewFilters({children}) {
    const filters = useProvideListViewFilters();
    const history = useHistory();

    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'PUSH' && !location.pathname.startsWith('/my-lists/')) {
                filters.reset();
            }
        });
    }, [filters, history])

    return <listViewFiltersContext.Provider value={filters}>
        {children}
    </listViewFiltersContext.Provider>
}

export const useListViewFilters = () => {
    return useContext(listViewFiltersContext);
}

const listViewInitialState = {
    search: '',
    category: '',
    tags: [],
    diets: [],
    seasons: [],
    sortBy: FILTER_ADDED_AT_ID,
    page: 1,
}

function useProvideListViewFilters() {
    const [filters, setFilters] = useState({...listViewInitialState});

    return {
        filters,
        sortByOptions: [
            ...sortByOptions,
            {id: FILTER_ADDED_AT_ID, title: 'Ajoutée le + récemment à la liste'},
            {id: FILTER_ADDED_ASC_AT_ID, title: 'Ajoutée le - récemment à la liste'},
        ],
        onUpdateSearch: (search) => setFilters({...filters, search}),
        onToggleCategory: (category) => setFilters({...filters, category}),
        onToggleSortBy: (sortBy) => setFilters({...filters, sortBy}),
        setSelectedTags: (tags) => setFilters({...filters, tags}),
        setSelectedDiets: (diets) => setFilters({...filters, diets}),
        setSelectedSeasons: (seasons) => setFilters({...filters, seasons}),
        onUpdatePage: (page) => setFilters({...filters, page: page}),
        reset: () => setFilters({...listViewInitialState}),
    }
}
