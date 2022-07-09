import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// require('dotenv').config();
// import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

GoogleSignin.configure({
  webClientId:
    '44405175272-7cojjdi57l20mu0ma7s6hfb0vg69kcq1.apps.googleusercontent.com',
  offlineAccess: true,
});

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const googleSignIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const services = await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        this.setState({userInfo});
        console.log(userInfo);
        console.log(services);
      } catch (error) {
        console.log(error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
          }}
          onPress={googleSignIn}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Google Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
