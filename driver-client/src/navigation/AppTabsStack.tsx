import React from "react";
import {Home, Search} from '../screens'
import { AppTabsParamList } from "../paramLists/AppTabsParamList";
import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

interface AppTabsProps{}

const {Navigator, Screen} = createBottomTabNavigator<AppTabsParamList>()

export const AppTabs: React.FC<AppTabsProps> = () => {
    return (
        <Navigator initialRouteName="Home" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === "Home") {
                iconName = "home";
                return <AntDesign name={"home"} size={size} color={color} />;
              } else if (route.name === "Search") {
                return <EvilIcons name={"search"} size={size} color={color} />;
              }
    
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray"
          }}>
            <Screen name="Home" component={Home}/>
            <Screen name="Search" component={Search}/>
        </Navigator>
    )
}