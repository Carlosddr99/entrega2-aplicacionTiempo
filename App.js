import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home'; 
import * as React from 'react';
import Weather from './pages/Weather'; 
import Informacion from './pages/Informacion'; 


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="Informacion" component={Informacion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
