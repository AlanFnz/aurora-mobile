import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import LoginScreen from '@screens/LoginScreen';
import HomeScreen from '@screens/HomeScreen';
import SettingsScreen from '@screens/SettingsScreen';

// store
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@store/index';
import { bootstrapAsync } from '@store/authSlice';
import { tabNavigatorStyles } from '@navigation/tabNavigatorStyles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={tabNavigatorStyles}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, userToken } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    dispatch(bootstrapAsync());
  }, [dispatch]);

  if (isLoading) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          <Stack.Screen
            name="SignIn"
            component={LoginScreen}
            options={{ title: 'Sign in', headerShown: false }}
          />
        ) : (
          <Stack.Screen name="AuthStack" component={HomeTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
