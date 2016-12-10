import { Navigation } from 'react-native-navigation';


import { registerScreens } from './screens';

registerScreens();

Navigation.startSingleScreenApp({
 screen: {
   screen: 'example.FirstTabScreen',
   title: 'Navigation',
   navigatorStyle: {
     navBarBackgroundColor: '#4dbce9',
     navBarTextColor: '#ffff00',
     navBarSubtitleTextColor: '#ff0000',
     navBarButtonColor: '#ffffff',
     statusBarTextColorScheme: 'light'
   }
 }
});