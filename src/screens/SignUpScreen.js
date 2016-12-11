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
      }
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
                <Input inlineLabel label="Name" value={this.state.form.nameInput} onChange={updateNameInput} placeholder="NAME" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                <Input placeholder="USERNAME" value={this.state.form.usernameInput} onChange={updateUsernameInput} />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={{ color: '#0A69FE'}}/>
                <Input placeholder="PASSWORD" secureTextEntry value={this.state.form.passwordInput} onChange={updatePasswordInput}  />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-call" style={{ color: '#0A69FE'}} />
                <Input placeholder="PHONE" keyboardType="numeric" value={this.state.form.phoneInput} onChange={updatePhoneInput} />
              </InputGroup>
            </ListItem>
          </List>
          <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
            Sign Up
          </Button>
        </Content>
      </Container>
      )
  }
  onSignUpPress(e) {
    e.preventDefault()
    var name = this.state.form.nameInput
    var username = this.state.form.userNameInput
    var password = this.state.form.passwordInput
    var phone = this.state.form.phoneInput
    ws.sendMessage('/signup', {
      name,
      username,
      password,
      phone
    }).success()
  }
  updateInput(key, e) {
    var obj = {}
    obj[key] = e.target.value
    this.setState(obj)
  }
}