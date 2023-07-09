import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen/LoginScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import BulkAddTagScreen from './screens/HomeScreen/BulkAddTagScreen';
import BulkRemoveTagScreen from './screens/HomeScreen/BulkRemoveTagScreen';
import AddCardScreen from './screens/AddCardScreen/AddCardScreen';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
            title: "Login Screen"
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: "WeShowLight"}}
        />
        <Stack.Screen
          name="BulkAddTagScreen"
          component={BulkAddTagScreen}
        />
        <Stack.Screen
          name="BulkRemoveTagScreen"
          component={BulkRemoveTagScreen}
        />
        <Stack.Screen
          name="AddCardScreen"
          component={AddCardScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}