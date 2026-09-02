import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CadastroScreen from './screens/CadastroScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '🎬 CineList' }}
        />

        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ title: 'Novo Filme' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}