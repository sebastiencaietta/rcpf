import Grid from "@material-ui/core/Grid";
import ListCard from "./list-card";
import RecipeImage from "../../../recipe-list/images/recipe.jpg";
import React from "react";
import {useAuth} from "../../../auth/use-auth";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    listList: {
        paddingTop: theme.spacing(3),
    }
}));

const getLists = lists => {
    //Remove deleted
    const filteredLists = lists.filter(list => list.deletedAt === null || list.deletedAt === undefined);

    //Set favorites first
    const index = filteredLists.findIndex(list => list.id === "favourites");
    const favourites = filteredLists[index];
    return [
        favourites,
        ...filteredLists.slice(0, index),
        ...filteredLists.slice(index + 1, filteredLists.length),
    ];
}

const AllLists = () => {
    const auth = useAuth();
    const classes = useStyles();

    const lists = getLists(auth.user.lists)

    return <Grid container justifyContent="flex-start" spacing={4} className={classes.listList}>
        {
            lists.map(list => <Grid item xs={12} sm={6} md={4} key={list.id}>
                    <ListCard key={list.id}
                              link={`/my-lists/${list.id}`}
                              title={list.name}
                              id={list.id}
                              image={list.thumbnailUrl || RecipeImage}
                              listId={list.id}
                    />
                </Grid>
            )
        }
    </Grid>
}

export default AllLists;
