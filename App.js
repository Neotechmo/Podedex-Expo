import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import HomeScreen from './screens/HomeScreen';
import PokedexScreen from './screens/PokedexScreen';
import GenerationsScreen from './screens/GenerationsScreen';
import PokemonDetailScreen from './screens/PokemonDetailScreen';
import { COLORS } from './constants/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pokedex"
          component={PokedexScreen}
          options={{ title: 'Pokédex' }}
        />
        <Stack.Screen
          name="Generations"
          component={GenerationsScreen}
          options={{ title: 'Generaciones' }}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={PokemonDetailScreen}
          options={{ title: 'Detalle' }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
