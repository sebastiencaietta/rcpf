import React, {useEffect, useState} from 'react';
import {Search} from "@material-ui/icons";
import {Collapse, makeStyles} from "@material-ui/core";
import CheckboxFilter from "./checkbox-filter";
import {SEASONS} from "../../global/constants/seasons";
import {DIETS} from "../../global/constants/diets";
import RadioFilter from "./radio-filter";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import clsx from "clsx";
import {fetchCategories, fetchTags} from "../../global/eve";

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.background.paper,
        padding: theme.spacing(4, 0),
    },
    filterArrow: {
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
        transform: 'rotate(0)',
    },
    filterArrowOpen: {
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
        transform: 'rotate(180deg)',
    },
    filtersRoot: {
        flexGrow: 1,
    },
    filterWrapper: {
        textAlign: 'right',
    },
}));

const Filters = ({filtersContext}) => {
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const {filters, ...filtering} = filtersContext;
    const classes = useStyles();

    useEffect(() => {
        Promise.all([fetchTags(), fetchCategories()]).then(([tags, categories]) => {
            setTags(tags);
            setCategories(categories);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if (filters.tags.length !== 0 || filters.diets.length !== 0 || filters.seasons.length !== 0 || filters.category !== '') {
            setFiltersOpen(true);
        }
    }, [filters.tags, filters.diets, filters.seasons, filters.category])

    const seasons = Object.keys(SEASONS).map(key => SEASONS[key]);
    const diets = Object.keys(DIETS).map(key => DIETS[key]);

    const filterArrowClasses = clsx(classes.filterArrow, {[classes.filterArrowOpen]: filtersOpen});

    return <div className={classes.root}>
        <Container fixed>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={12} sm={5} md={7}>
                    <FormControl fullWidth>
                        <Input
                            value={filters.search}
                            onChange={(e) => filtering.onUpdateSearch(e.target.value)}
                            placeholder="Chercher une recette..."
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={7} sm={4} md={3}>
                    <RadioFilter options={filtering.sortByOptions} selectedOption={filters.sortBy} idField={'id'}
                                 labelField={'title'}
                                 onToggle={filtering.onToggleSortBy}
                                 label="Trier par"/>
                </Grid>
                <Grid item xs={5} sm={3} md={2} className={classes.filterWrapper}>
                    <Button
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        startIcon={<FilterListIcon/>}
                        endIcon={<ArrowDropDownIcon className={filterArrowClasses}/>}
                    >
                        Filtres
                    </Button>
                </Grid>
                <Collapse in={filtersOpen} className={classes.filtersRoot}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={12} sm={6} md={3}>
                            <RadioFilter options={categories} selectedOption={categories.length !== 0 ? filters.category : ''} idField={'id'}
                                         labelField={'title'}
                                         onToggle={filtering.onToggleCategory}
                                         label="Catégorie"
                                         nullOption={{title: 'Toutes les catégories', id: ''}}/>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            {
                                tags.length > 0
                                    ? <CheckboxFilter options={tags} selectedOptions={filters.tags} idField={'id'}
                                                              labelField={'title'}
                                                              setSelected={filtering.setSelectedTags} label="Tags"/>
                                    : ''
                            }

                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <CheckboxFilter options={seasons} selectedOptions={filters.seasons} idField={'name'}
                                            labelField={'name'}
                                            setSelected={filtering.setSelectedSeasons} label="Saisons"/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <CheckboxFilter options={diets} selectedOptions={filters.diets} idField={'name'}
                                            labelField={'name'}
                                            setSelected={filtering.setSelectedDiets} label="Régime"/>
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
        </Container>
    </div>
}

export default Filters;
