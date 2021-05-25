import React, {createContext, useContext, useState} from "react";
import {
    createTheme,
    PALETTE_TYPE_DARK, PALETTE_TYPE_LIGHT,
    setPreferredPaletteType
} from "../global/theme-settings";

const themeSwitcherContext = createContext({});

export function ProviderThemeSwitcher({children}) {
    const preferredTheme = useProvideTheme();

    return <themeSwitcherContext.Provider value={preferredTheme}>
        {children}
    </themeSwitcherContext.Provider>
}

export const useThemeSwitcher = () => {
    return useContext(themeSwitcherContext);
}

const getPreferredPaletteType = () => {
    const paletteType = window.localStorage.getItem('paletteType');
    if (!paletteType || (paletteType !== PALETTE_TYPE_DARK && paletteType !== PALETTE_TYPE_LIGHT)) {
        window.localStorage.setItem('paletteType', PALETTE_TYPE_DARK);
        return PALETTE_TYPE_DARK;
    }

    return paletteType;
};

function useProvideTheme() {
    const [theme, setTheme] = useState(createTheme(getPreferredPaletteType()));


    const onToggleTheme = paletteType => {
        setPreferredPaletteType(paletteType);
        setTheme(createTheme(paletteType));
    };

    return {
        theme,
        onToggleTheme,
        getPreferredPaletteType,
    }
}
