import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import Admin from './admin/Admin';
import Elevator from './elevator/ElevatorHome';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Home() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="ElevatorHome" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="ElevatorHome" component={Elevator} />
        <Tab.Screen name="Admin" component={Admin} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
