import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

function Test() {
  return (
    <View>
      <Text>Hello Test!</Text>
    </View>
  );
}

export default function Home() {
  const data = useSelector((state: RootState) => state.auth.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={<Test />} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
