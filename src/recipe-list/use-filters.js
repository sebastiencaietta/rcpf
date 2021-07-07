import React, {useContext} from 'react';
import {createContext, useState} from "react";
import {addOrRemoveInArray} from "../global/lodash";

const filtersContext = createContext({});

export function ProviderFilters({children}) {
    const filters = useProvideFilters();

    return <filtersContext.Provider value={filters}>
        {children}
    </filtersContext.Provider>
}

export const useFilters = () => {
    return useContext(filtersContext);
}

function useProvideFilters() {
    const [filters, setFilters] = useState({
            search: '',
            category: '',
            tags: [],
            diets: [],
            seasons: [],
        }
    );

    return {
        filters,
        onUpdateSearch: (search) => setFilters({...filters, search}),
        onToggleCategory: (category) => setFilters({...filters, category}),
        onToggleTag: (tagId) => setFilters({...filters, tags: addOrRemoveInArray(filters.tags, tagId)}),
        onToggleDiet: (dietId) => setFilters({...filters, diets: addOrRemoveInArray(filters.diets, dietId)}),
        onToggleSeason: (seasonId) => setFilters({...filters, seasons: addOrRemoveInArray(filters.seasons, seasonId)}),
    }
}
