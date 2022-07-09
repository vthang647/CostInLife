import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NavigationString from '../Utils/NavigationString';

// screen
import CreateNewScreen from './Screens/CreateNewScreen';
import DetailsPerDayScreen from './Screens/DetailsPerDayScreen';
import DashBoardItem from '../Components/DashBoardItem';

import DrawRoutes from './DrawRoutes';
import Color from '../Styles/Color';
const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={DrawRoutes}
          name="Home"
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: Color.skyColor__},
          }}
        />
        <Stack.Screen
          component={CreateNewScreen}
          name="Create New"
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: Color.skyColor__},
          }}
        />
        <Stack.Screen
          component={DetailsPerDayScreen}
          name="DetailsThatDay"
          options={{headerStyle: {backgroundColor: Color.skyColor__}}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
