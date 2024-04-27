import React, {createContext, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {FILTER_ADDED_AT_ASC, FILTER_ADDED_AT} from "../../global/constants/filters";
import {sortByOptions} from "../../recipe-list/use-filters";

const listViewFiltersContext = createContext({});

export function ProviderListViewFilters({children}) {
    const filters = useProvideListViewFilters();
    const history = useHistory();

    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'PUSH' && !location.pathname.startsWith('/my-lists/') && !location.pathname.startsWith('/recipes')) {
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
    sortBy: FILTER_ADDED_AT.id,
    page: 1,
}

function useProvideListViewFilters() {
    const [filters, setFilters] = useState({...listViewInitialState});

    const hasChanges = () => {
        return filters.search !== listViewInitialState.search ||
            filters.category !== listViewInitialState.category ||
            filters.page !== listViewInitialState.page ||
            JSON.stringify(filters.tags) !== JSON.stringify(listViewInitialState.tags) ||
            JSON.stringify(filters.diets) !== JSON.stringify(listViewInitialState.diets) ||
            JSON.stringify(filters.seasons) !== JSON.stringify(listViewInitialState.seasons);
    };

    return {
        filters,
        sortByOptions: [
            ...sortByOptions,
            FILTER_ADDED_AT,
            FILTER_ADDED_AT_ASC,
        ],
        onUpdateSearch: (search) => setFilters({...filters, search}),
        onToggleCategory: (category) => setFilters({...filters, category}),
        onToggleSortBy: (sortBy) => setFilters({...filters, sortBy}),
        setSelectedTags: (tags) => setFilters({...filters, tags}),
        setSelectedDiets: (diets) => setFilters({...filters, diets}),
        setSelectedSeasons: (seasons) => setFilters({...filters, seasons}),
        onUpdatePage: (page) => setFilters({...filters, page: page}),
        reset: () => setFilters({...listViewInitialState}),
        hasChanges,
    }
}
