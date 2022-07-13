import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import SettingsScreen from './Screens/SettingsScreen';
import NavigationString from '../Utils/NavigationString';

import Ionic from 'react-native-vector-icons/Ionicons';
import Color from '../Styles/Color';

const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: Color.boardblack,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 8,
          backgroundcolor: Color.blue_,
          borderRadius: 15,
          height: 63,
          opacity: 0.9,
        },

        tabBarIcon: ({focused, size, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Details') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          }
          return <Ionic name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        component={HomeScreen}
        name={NavigationString.HOME}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Color.skyColor__},
        }}
      />

      <Tab.Screen
        component={SettingsScreen}
        name={NavigationString.ADD}
        options={({navigation}) => ({
          tabBarIcon: ({focused, size, color}) => {
            return (
              <Ionic
                name="add-circle"
                size={size + 55}
                color={Color.buttonAdd}
              />
            );
          },
          headerStyle: {backgroundColor: Color.skyColor__},
          tabBarButton: props => {
            return (
              <TouchableOpacity
                style={{
                  top: -18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  ...styles.shadow,
                }}
                onPress={() => navigation.navigate('Create New')}>
                <View
                  style={{
                    width: 70,
                    right: 2.5,
                    height: 90,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {props.children}
                </View>
              </TouchableOpacity>
            );
          },
        })}
      />
      <Tab.Screen
        component={DetailsScreen}
        name={NavigationString.DETAILS}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Color.skyColor__},
        }}
      />
    </Tab.Navigator>
  );
}

export default TabRoutes;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1.25,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 30,
  },
});
