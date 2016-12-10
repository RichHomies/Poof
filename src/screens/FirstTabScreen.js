import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import ChatInput from '../components/ChatInput';

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
    // if you want to listen on navigator events, set this up
  }


  render() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <ChatInput />
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
