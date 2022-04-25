import React from "react"
import {Colors, ThemeContextType, Theme} from './contextTypes'

const AppTheme: Theme = {
    colors: {
        primaryColor: '#007bff'
    }
}

const setColors = (color: Colors) => {
    AppTheme.colors.primaryColor = color.primaryColor
}

const getTheme = () => AppTheme

const ThemeContext = React.createContext<ThemeContextType>({
    setColors: setColors,
    getTheme: getTheme
})


export {ThemeContext, getTheme, setColors}