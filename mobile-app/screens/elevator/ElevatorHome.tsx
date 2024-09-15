import { ElevatorStackParamList } from '@/types/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuildingSelect from './BuildingSelect';
import FloorSelect from './FloorSelect';
import FloorView from './FloorView';

const Stack = createNativeStackNavigator<ElevatorStackParamList>();

export default function ElevatorHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Building" component={BuildingSelect} />
      <Stack.Screen name="Floor" component={FloorSelect} />
      <Stack.Screen name="Elevator" component={FloorView} />
    </Stack.Navigator>
  );
}
