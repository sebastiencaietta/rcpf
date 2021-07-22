import React, {useEffect, useState} from 'react';
import {useFilters} from "../use-filters";
import {ExpandMore, Search} from "@material-ui/icons";
import {Accordion, AccordionDetails, AccordionSummary, makeStyles} from "@material-ui/core";
import CheckboxFilter from "./checkbox-filter";
import {SEASONS} from "../../global/constants/seasons";
import {DIETS} from "../../global/constants/diets";
import RadioFilter from "./radio-filter";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(2, 0),
        width: '100%',
    },
}));

const NewFilters = ({tags, categories}) => {
    const {filters, ...filtering} = useFilters();
    const [expandedAccordions, setExpandedAccordions] = useState({
        category: false,
        tags: false,
        season: false,
        diet: false
    });

    const classes = useStyles();

    useEffect(() => {
            setExpandedAccordions({
                ...expandedAccordions,
                category: filters.category !== '',
                tags: filters.tags.length !== 0,
                season: filters.seasons.length !== 0,
                diet: filters.diets.length !== 0,
            })
        },
        []
    );

    const seasons = Object.keys(SEASONS).map(key => SEASONS[key]);
    const diets = Object.keys(DIETS).map(key => DIETS[key]);

    const handleExpandAccordion = (accordionName) => setExpandedAccordions({
        ...expandedAccordions,
        [accordionName]: !expandedAccordions[accordionName]
    });

    return <>
        <FormControl className={classes.margin}>
            <Input
                value={filters.search}
                onChange={(e) => filtering.onUpdateSearch(e.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Search/>
                    </InputAdornment>
                }
            />
        </FormControl>
        <Accordion expanded={expandedAccordions['category']}>
            <AccordionSummary expandIcon={<ExpandMore/>} aria-label="Expand"
                              onClick={() => handleExpandAccordion('category')}>
                Catégories
            </AccordionSummary>
            <AccordionDetails>
                <RadioFilter options={categories} selectedOption={filters.category} idField={'id'} label={'title'}
                             onToggle={filtering.onToggleCategory}
                             nullOption={{title: 'Toutes les catégories', id: ''}}/>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedAccordions['tags']}>
            <AccordionSummary expandIcon={<ExpandMore/>} aria-label="Expand"
                              onClick={() => handleExpandAccordion('tags')}>
                Tags
            </AccordionSummary>
            <AccordionDetails>
                <CheckboxFilter options={tags} selectedOptions={filters.tags} idField={'id'} label={'title'}
                                onToggle={filtering.onToggleTag}/>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedAccordions['season']}>
            <AccordionSummary expandIcon={<ExpandMore/>} aria-label="Expand"
                              onClick={() => handleExpandAccordion('season')}>
                Saison
            </AccordionSummary>
            <AccordionDetails>
                <CheckboxFilter options={seasons} selectedOptions={filters.seasons} idField={'name'} label={'name'}
                                onToggle={filtering.onToggleSeason}/>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedAccordions['diet']}>
            <AccordionSummary expandIcon={<ExpandMore/>} aria-label="Expand"
                              onClick={() => handleExpandAccordion('diet')}>
                Régime
            </AccordionSummary>
            <AccordionDetails>
                <CheckboxFilter options={diets} selectedOptions={filters.diets} idField={'name'} label={'name'}
                                onToggle={filtering.onToggleDiet}/>
            </AccordionDetails>
        </Accordion>
    </>
}

export default NewFilters;
