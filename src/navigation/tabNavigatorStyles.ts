import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export const tabNavigatorStyles = (): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#22262e',
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarLabelStyle: {
    paddingBottom: 5,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#e0e0e0',
  },
  tabBarActiveTintColor: '#e0e0e0',
  tabBarInactiveTintColor: '#54565b',
  tabBarIconStyle: {
    marginTop: 5,
  },
});
