import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterUser from './RegisterUser';
import ListUsers from './ListUsers';

const Stack = createStackNavigator();

function App () {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='RegisterUser'>
                <Stack.Screen name="RegisterUser" component={RegisterUser} options={{ title: 'Cadastro de Usuário' }} />
                <Stack.Screen name="ListUsers" component={ListUsers} options={{ title: 'Lista de Usuários' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
