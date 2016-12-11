import React, {Component} from 'react';

import socketClient from '../socket/client';


import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import SignUpScreen from './SignUpScreen';

import { Container, Content, InputGroup, Input } from 'native-base';

import {Navigation} from 'react-native-navigation';

export default class FirstTabScreen extends Component {
  
  static navigatorStyle = {
    navBarBackgroundColor: '#4dbce9',
    navBarTextColor: '#ffff00',
    navBarSubtitleTextColor: '#ff0000',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light',
    tabBarBackgroundColor: '#4dbce9',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#ffff00'
  };

  constructor(props) {
    super(props);
  }
  componentWillMount(){
    let that = this;
    socketClient.then(function(sc){
      that.setState({socket:sc});
      console.log('yuhhh')
    });
  }
  render() {
    return (
      <View>
        <SignUpScreen />
      </View>
      );
  }

  onStartSingleScreenApp() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'example.FirstTabScreen'
      }
    });
  }
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue'
  }
});
