import React from 'react';
import {Typography} from "@material-ui/core";
import Renderer from "../../global/components/RteRenderer";

export default function recipePage({recipe}) {
    return <React.Fragment>
        <Typography variant="h2">{recipe.title}</Typography>

        <Renderer raw={recipe.description}/>
    </React.Fragment>;
}
