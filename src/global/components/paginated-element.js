import React, {useEffect} from "react";
import {Pagination} from "@material-ui/lab";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    paginationRoot: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1),
    }
}));

const PaginatedElement = ({items, perPage, onPageChangeCallback, currentPage, ...props}) => {
    const classes = useStyles();
    const pageCount = Math.max(1, Math.ceil(items.length / perPage));

    const handlePageChange = (event, value) => {
        window.scrollTo(0, 0);
        onPageChangeCallback(value);
    }

    useEffect(() => {
        if (pageCount < currentPage) {
            onPageChangeCallback(pageCount);
        }
    }, [pageCount, onPageChangeCallback, items, currentPage])


    return <>
        {props.children}
        {
            pageCount <= 1
                ? ''
                : <div className={classes.paginationRoot}>
                    <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} color="primary"/>
                </div>
        }
    </>
};

const paginatedRecipes = (filteredRecipes, page, perPage) => {
    return [
        ...filteredRecipes.slice(
            (page - 1) * perPage,
            Math.max((page - 1) * perPage + perPage), filteredRecipes.length
        ),
    ];
}

export const paginated = (options, props) => {
    return (ReactElement) => {
        const {items, perPage, onPageChangeCallback, currentPage, propName} = options;
        const pageCount = Math.max(1, Math.ceil(items.length / perPage));

        const classes = useStyles();

        const handlePageChange = (event, value) => {
            window.scrollTo(0, 0);
            onPageChangeCallback(value);
        }

        const visibleItems = paginatedRecipes(items, currentPage, perPage);

        useEffect(() => {
            if (pageCount < currentPage) {
                onPageChangeCallback(pageCount);
            }
        }, [pageCount, onPageChangeCallback, items, currentPage]);

        const elementProps = {
            [propName]: visibleItems,
            ...props
        }

        return <>
            <ReactElement {...elementProps}/>
            {
                pageCount <= 1
                    ? ''
                    : <div className={classes.paginationRoot}>
                        <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} color="primary"/>
                    </div>
            }
        </>
    }
}

export default PaginatedElement;
