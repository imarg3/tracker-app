import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./src/RootNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{ title: "Tracks" }}
      />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
}

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TabStack"
        component={TabStack}
        options={{
          title: "Tracks",
          tabBarIcon: () => {
            return <FontAwesome name="th-list" size={20} />;
          },
        }}
      />
      <Tab.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        options={{
          title: "Add Track",
          tabBarIcon: () => {
            return <FontAwesome name="plus" size={20} />;
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account",
          tabBarIcon: () => {
            return <FontAwesome name="gear" size={20} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Signin" component={SigninScreen} />
              <Stack.Screen name="BottomTab" component={BottomTab} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};

export default App;
