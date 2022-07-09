import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Login from '../../Components/Login';

export default class SettingsScreen extends Component {
  state = {};
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Login />
        </View>
      </View>
    );
  }
}
