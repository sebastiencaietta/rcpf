import React from 'react';
import FiltersComponent from '../components/filters';
import {useFilters} from "../use-filters";

const Filters = () => {
    const filtersContext = useFilters();

    return <FiltersComponent filtersContext={filtersContext}/>
}

export default Filters;
