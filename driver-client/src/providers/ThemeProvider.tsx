import React from 'react'
import {ThemeContext, setColors, getTheme } from '../contexts/Theme'

interface ThemeProviderProps {}

const ThemeProvider : React.FC<ThemeProviderProps> = ({children}) => {

    return (
        <ThemeContext.Provider value={{ setColors, getTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider