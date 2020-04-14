import React, {useEffect, useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search} from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import {FixedSizeList} from "react-window";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    list: {
        listStyleType: 'none',
    }
}));

const RecipeList = ({recipeList, onRecipeSelect, checkedRecipes}) => {
    const [search, setSearch] = useState('');
    const [visibleRecipes, setVisibleRecipes] = useState([...recipeList]);
    const classes = useStyles();

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleToggle = (recipeId) => {
        onRecipeSelect(recipeId);
    };

    useEffect(() => {
        const filteredRecipes = recipeList.filter(recipe => {
            if (!search) {
                return true;
            }
            return recipe.title.toLowerCase().includes(search.toLowerCase());
        });

        setVisibleRecipes(filteredRecipes);
    }, [search, recipeList]);

    return <>
        <FormControl fullWidth={true}>
            <Input
                value={search}
                onChange={handleSearch}
                startAdornment={
                    <InputAdornment position="start">
                        <Search/>
                    </InputAdornment>
                }
                fullWidth={true}
            />
        </FormControl>
        <FixedSizeList height={400} width="100%" itemSize={46} itemCount={visibleRecipes.length}
                       itemData={visibleRecipes} className={classes.list}>
            {({style, index, data}) => {
                const recipe = data[index];

                return <div style={style}>
                    <ListItem key={index} button onClick={() => handleToggle(recipe.id)}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`${recipe.slug} thumbnail`}
                                src={`${recipe.thumbnail}`}
                            />
                        </ListItemAvatar>
                        <ListItemText id={recipe.slug} primary={recipe.title}/>
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={() => handleToggle(recipe.id)}
                                checked={checkedRecipes.indexOf(recipe.id) !== -1}
                                inputProps={{'aria-labelledby': recipe.slug}}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </div>
            }}
        </FixedSizeList>
    </>
};

export default RecipeList;
