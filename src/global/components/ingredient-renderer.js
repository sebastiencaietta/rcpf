import React from 'react';
import PropTypes from 'prop-types';
import {UNITS} from "../constants/units";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    ingredientWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    ingredientAvatar: {width: theme.spacing(5), height: theme.spacing(5), marginRight: theme.spacing(1)},
    ingredientText: {fontSize: '1.1em'},
}));

const getQuantityWithUnit = (unitConstant, quantity) => {
    const unitOptions = UNITS[unitConstant];
    if (unitOptions.isScientific) {
        return `${quantity}${unitOptions.unit}`;
    }

    return `${quantity} ${quantity > 1 ? unitOptions.plural : unitOptions.unit}`;
}

const getPreposition = (ingredientName, unit) => {
    if (unit === 'UNIT_NO_UNIT') {
        return '';
    }

    const firstLetter = ingredientName[0];
    const isVowel = ['e', 'a', 'i', 'o', 'u', 'y', 'é', 'à', 'è', 'î', 'ê'].indexOf(firstLetter.toLowerCase()) !== -1;

    if (isVowel) {
        return "d'";
    }

    const exceptions = ['huile', 'huitre', 'huître'];
    const isException = exceptions.some((exception) => ingredientName.toLowerCase().includes(exception));

    return isException ? "d'" : 'de '
};

const IngredientRenderer = ({recipeIngredient, ingredientSettings}) => {
    const {quantity, unit, comment} = recipeIngredient;
    const {name, thumbnail} = ingredientSettings;
    const classes = useStyles();

    return <div className={classes.ingredientWrapper}>
        <Avatar alt={ingredientSettings.name} src={thumbnail} className={classes.ingredientAvatar}/>
        <span className={classes.ingredientText}>
            {`${getQuantityWithUnit(unit, quantity)} ${getPreposition(name, unit)}`}
            <b>{name.toLowerCase()}</b>
            {comment}
        </span>
    </div>
};

IngredientRenderer.propTypes = {
    recipeIngredient: PropTypes.shape({
        unit: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        comment: PropTypes.string,
    }),
    ingredientSettings: PropTypes.shape(({
        name: PropTypes.string,
        thumbnail: PropTypes.string,
    })),
};

export default IngredientRenderer;
