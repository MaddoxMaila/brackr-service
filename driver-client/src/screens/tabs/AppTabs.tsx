import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {Home, Search} from '../'

interface AppTabsProps{}

const Tabs = createBottomTabNavigator()

export const AppTabs: React.FC<AppTabsProps> = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Home" component={Home}/>
            <Tabs.Screen name="Search" component={Search}/>
        </Tabs.Navigator>
    )
}