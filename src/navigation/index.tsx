import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import LoginScreen from '@screens/LoginScreen';
import HomeScreen from '@screens/HomeScreen';
import SettingsScreen from '@screens/SettingsScreen';
import NoteDetailsScreen from '@screens/NoteDetailsScreen';

// store
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@store/index';
import { bootstrapAsync } from '@store/authSlice';
import { tabNavigatorStyles } from '@navigation/tabNavigatorStyles';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NoteDetails" component={NoteDetailsScreen} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={tabNavigatorStyles}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
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
