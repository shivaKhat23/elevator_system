import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../types/types';
import Elevator from './elevator/Elevator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Elevator" component={Elevator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
