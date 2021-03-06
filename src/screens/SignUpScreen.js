import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';

import ws from '../socket/client.js';

const Item = Picker.Item;

export default class SignUpScreen extends Component {
  static navigatorButtons = {
      leftButtons: [{
        title: 'Close',
        id: 'close'
      }]
    };
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: 'key0',
      results: {
        items: []
      },
      form: {
        nameInput: '',
        usernameInput: '',
        passwordInput: '',
        phoneInput: ''
      },
      status: ''
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value
    })
  }
  onNavigatorEvent(event) {
      if (event.id == 'close') {
        this.props.navigator.dismissModal();
      }
    }
  render() {
    let updateNameInput = this.updateInput.bind(this, 'nameInput');
    let updateUsernameInput = this.updateInput.bind(this, 'usernameInput');
    let updatePasswordInput = this.updateInput.bind(this, 'passwordInput');
    let updatePhoneInput = this.updateInput.bind(this, 'phoneInput');
    return (
      <Container style={{flex: 1, padding: 20}}>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="Name" value={this.state.form.nameInput} onChangeText={updateNameInput} placeholder="NAME" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                <Input placeholder="USERNAME" value={this.state.form.usernameInput} onChangeText={updateUsernameInput} />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={{ color: '#0A69FE'}}/>
                <Input placeholder="PASSWORD" secureTextEntry value={this.state.form.passwordInput} onChangeText={updatePasswordInput}  />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-call" style={{ color: '#0A69FE'}} />
                <Input placeholder="PHONE" keyboardType="numeric" value={this.state.form.phoneInput} onChangeText={updatePhoneInput} />
              </InputGroup>
            </ListItem>
          </List>
          <Button onPress={this.onSignUpPress.bind(this)} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
            Sign Up
          </Button>
        </Content>
      </Container>
      )
  }
  onSignUpPress(e) {
    e.preventDefault()
    var that = this
    ws.then(function(socket) {
      socket.sendMessage('/signup', 'post', that.state.form)
      .success(function(response) {
        console.log('success ', response);
        that.state.status = 'success'
        that.props.navigator.push({
          screen: 'app.HomeScreen',
          title: 'Poof Home'
        })
      })
      .failure(function(err) {
        console.log('err:', err)
        that.state.status = err
        //toast fail
      })
    })
  }
  updateInput(key, text) {
    var form = this.state.form
    form[key] = text
    this.setState({
      form
    })
  }
}