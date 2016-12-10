import {Navigation} from 'react-native-navigation';

import FirstTabScreen from './FirstTabScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
}
