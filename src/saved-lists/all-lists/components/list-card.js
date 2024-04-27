import React from "react";
import withMoreButton from "../../../global/components/card-with-more-button";
import MoreButton from "../containers/more-button";
import Card from "../../../global/components/card";

const ListCard = ({listId, image, link, title}) => {
    if (listId === "favourites") {
        return <Card title={title} link={link} image={image}/>
    }
    return withMoreButton(() => <MoreButton listId={listId} listName={title}/>)({image, link, title})
}

export default ListCard;
