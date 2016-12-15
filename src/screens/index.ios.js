import {Navigation} from 'react-native-navigation';

import FirstTabScreen from './FirstTabScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import NewPoofScreen from './NewPoofScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('app.SignUpScreen', () => SignUpScreen);
  Navigation.registerComponent('app.LoginScreen', () => LoginScreen);
  Navigation.registerComponent('app.NewPoofScreen', () => NewPoofScreen);
  Navigation.registerComponent('app.HomeScreen', () => HomeScreen);

}
