import {Navigation} from 'react-native-navigation';

import FirstTabScreen from './FirstTabScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('app.SignUpScreen', () => SignUpScreen);
  Navigation.registerComponent('app.LoginScreen', () => LoginScreen);

}
