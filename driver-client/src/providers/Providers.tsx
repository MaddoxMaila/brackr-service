import React from 'react'
import MainNavigation from '../navigation/mainNavigation'
import {ThemeProvider} from '.'

interface ProvidersProps {}

const Providers : React.FC<ProvidersProps> = () => {
        return (
                <ThemeProvider>
                    <MainNavigation></MainNavigation>
                </ThemeProvider>
        )
}

export default Providers