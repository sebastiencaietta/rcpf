import React, {createContext, useContext, useEffect, useState} from 'react';
import {addOrRemoveInArray} from "../global/lodash";
import {useHistory} from "react-router-dom";

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

const initialState = {
    search: '',
    category: '',
    tags: [],
    diets: [],
    seasons: [],
    page: 1,
};

function useProvideFilters() {
    const [filters, setFilters] = useState({...initialState});

    return {
        filters,
        onUpdateSearch: (search) => setFilters({...filters, search}),
        onToggleCategory: (category) => setFilters({...filters, category}),
        onToggleTag: (tagId) => setFilters({...filters, tags: addOrRemoveInArray(filters.tags, tagId)}),
        onToggleDiet: (dietId) => setFilters({...filters, diets: addOrRemoveInArray(filters.diets, dietId)}),
        onToggleSeason: (seasonId) => setFilters({...filters, seasons: addOrRemoveInArray(filters.seasons, seasonId)}),
        onUpdatePage: (page) => setFilters({...filters, page: page}),
        reset: () => setFilters({...initialState}),
    }
}
