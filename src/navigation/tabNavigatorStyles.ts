import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import colors from '@theme/colors';

export const tabNavigatorStyles = (): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarStyle: {
    backgroundColor: colors.common.darkGray,
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarLabelStyle: {
    paddingBottom: 2,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: colors.common.offWhite,
  },
  tabBarActiveTintColor: colors.common.offWhite,
  tabBarInactiveTintColor: colors.lowOpacity.whiteMid,
  tabBarIconStyle: {
    marginTop: 4,
  },
});
