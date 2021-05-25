import React from 'react';
import {useThemeSwitcher} from "../../layout/use-theme-switcher";
import Grid from "@material-ui/core/Grid";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

const AccountSettings = () => {
    const themeSwitcher = useThemeSwitcher();
    const onChange = (event, value) => {
        themeSwitcher.onToggleTheme(value);
    }

    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Thème</FormLabel>
                <RadioGroup row aria-label="theme" name="theme" onChange={onChange}>
                    <FormControlLabel
                        value="dark"
                        control={<Radio color="primary"/>}
                        label="Sombre"
                        checked={themeSwitcher.getPreferredPaletteType() === 'dark'}
                    />
                    <FormControlLabel
                        value="light"
                        control={<Radio color="primary"/>}
                        label="Clair"
                        checked={themeSwitcher.getPreferredPaletteType() === 'light'}
                    />
                </RadioGroup>
            </FormControl>
        </Grid>
    </Grid>;
}

export default AccountSettings;
