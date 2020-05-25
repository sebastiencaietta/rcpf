import React from 'react';
import PropTypes from 'prop-types';
import {UNITS} from "../../../../../global/constants/units";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    ingredientWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    ingredientAvatar: {width: theme.spacing(5), height: theme.spacing(5), marginRight: theme.spacing(2)},
    ingredientText: {fontSize: '1.15em'},
}));

const getQuantityWithUnit = (unitConstant, quantity) => {
    const unitOptions = UNITS[unitConstant];
    if (unitOptions.isScientific) {
        return `${quantity}${unitOptions.unit}`;
    }

    return `${quantity} ${quantity > 1 ? unitOptions.plural : unitOptions.unit}`;
}
const IngredientRenderer = ({recipeIngredient, ingredientSettings}) => {
    const {quantity, unit, comment} = recipeIngredient;
    const classes = useStyles();

    return <div className={classes.ingredientWrapper}>
        <Avatar alt={ingredientSettings.name} src={ingredientSettings.thumbnail} className={classes.ingredientAvatar}/>
        <span className={classes.ingredientText}>
            {`${getQuantityWithUnit(unit, quantity)} ${ingredientSettings.name}${comment}`}
        </span>
    </div>
};

IngredientRenderer.propTypes = {
    ingredient: PropTypes.shape({
        ingredientId: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired,
        quantity: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
        comment: PropTypes.string,
        substitute: PropTypes.object,
    })
};

export default IngredientRenderer;
