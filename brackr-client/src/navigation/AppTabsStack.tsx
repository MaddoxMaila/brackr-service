import React from "react";
import {Home, Search} from '../screens'
import { AppTabsParamList } from "../paramLists/AppTabsParamList";
import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Header from "../components/headers/HomeHeader";
import Settings from "../screens/settings";
import globalStyle from "../components/uiStyles/ui";

interface AppTabsProps{}

const {Navigator, Screen} = createBottomTabNavigator<AppTabsParamList>()

export const AppTabs: React.FC<AppTabsProps> = () => {
    return (
        <Navigator initialRouteName="Home" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch(route.name){
                case "Home":
                  return <AntDesign name={"home"} size={size} color={color} />
                case "Search":
                  return <EvilIcons name={"search"} size={size} color={color} />
                case "Settings":
                  return <AntDesign name={"setting"} size={size} color={color} />
                // default:
                //   // You can return any component that you like here!
                //   return <Ionicons name={iconName} size={size} color={color} />;

              }
    
            },
            header: ({route}) => {
              return <Header />
            },
            headerStyle: globalStyle.header
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray"
          }}>
            <Screen name="Home" component={Home}/>
            <Screen name="Search" component={Search}/>
            <Screen name="Settings" component={Settings} />
        </Navigator>
    )
}