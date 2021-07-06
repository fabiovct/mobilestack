import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {Button, Icon } from 'react-native-elements';
// import { UsersProvider } from './context/UsersContext';
import Login from './pages/Home/Login';
import ListProducts from './pages/Produtos/List-products';

const Stack = createStackNavigator()

export default props => {
    return (
        // <UsersProvider>
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={screenOptions}
                >
                <Stack.Screen
                 name="Login"
                 component={Login}
                 options={{
                     title:"Login"
                 }}
                />
                <Stack.Screen
                 name="ListProducts"
                 component={ListProducts}
                 options={{
                     title:"ListProducts"
                 }}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
        // </UsersProvider>
    )
}




const screenOptions = {
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff'
}