import React from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function CategoryTabs({categories, onChange}) {
    if (!categories.length) {
        return <span/>;
    }

    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
        onChange(newValue);
    }

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
        >
            <Tab value={0} label="Toutes les recettes"/>
            {categories.map(category => {
                return <Tab label={category.title} value={category.id} key={category.id}/>
            })}
        </Tabs>
    );
}
