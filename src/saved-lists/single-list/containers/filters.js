import React from 'react';
import FiltersComponent from '../../../recipe-list/components/filters';
import {useListViewFilters} from "../use-filters";

const Filters = () => {
    const filtersContext = useListViewFilters();

    return <FiltersComponent filtersContext={filtersContext}/>
}

export default Filters;
