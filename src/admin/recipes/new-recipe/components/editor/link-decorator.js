import React from "react";
import Link from '@material-ui/core/Link';

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

export const linkDecorator = {
    strategy: findLinkEntities,
    component: (props) => {
        const {url} = props.contentState.getEntity(props.entityKey).getData();
        return <Link href={url} color="inherit">{props.children}</Link>;
    },
};
