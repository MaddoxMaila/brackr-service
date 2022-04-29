import React from 'react'
import { Provider } from 'react-redux'
import MainNavigation from '../navigation/mainNavigation'
import { store } from '../store'


interface ProvidersProps {}

const Providers : React.FC<ProvidersProps> = () => {
        return (
        <Provider store={store}>
                <MainNavigation></MainNavigation>
        </Provider>
        )
}

export default Providers