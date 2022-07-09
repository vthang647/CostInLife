import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
// screen
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import SettingsScreen from './Screens/SettingsScreen';

import NavigationString from '../Utils/NavigationString';

// Routes
import TabRoutes from './TabRoutes';

// custom
import CustomDrawer from './CustomDrawer';

// color
import Color from '../Styles/Color';

const Drawer = createDrawerNavigator();

//icon
import Ionicons from 'react-native-vector-icons/Ionicons';

function DrawRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      useLegacyImplementation={true}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
          marginLeft: -25,
        },
      }}>
      <Drawer.Screen
        component={TabRoutes}
        name="HOME"
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: Color.skyColor__},
          drawerIcon: ({color, size}) => {
            return <Ionicons name="home-outline" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        component={SettingsScreen}
        name={NavigationString.SETTINGS}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Color.skyColor__},
          drawerIcon: ({color, size}) => {
            return <Ionicons name="save-outline" size={size} color={color} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawRoutes;
