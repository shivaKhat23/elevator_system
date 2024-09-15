import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import Admin from './admin/Admin';
import Elevator from './elevator/ElevatorHome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Home() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ElevatorHome"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'ElevatorHome') {
              iconName = focused ? 'elevator' : 'elevator';
            } else if (route.name === 'Admin') {
              iconName = focused ? 'supervised-user-circle' : 'supervised-user-circle';
            }

            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="ElevatorHome" component={Elevator} />
        <Tab.Screen name="Admin" component={Admin} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
