import React, { Component } from 'react';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
const Item = Picker.Item;

import ws from '../socket/client.js';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        usernameInput: '',
        passwordInput: ''
      }
    }
  }
  onSignUpPress() {
    this.props.navigator.showModal({
      title: 'Sign Up',
      screen: 'app.SignUpScreen'
    })
  }
  onLoginPress(e) {
    e.preventDefault();
    var that = this
    ws.then(function(socket) {
      console.log('that state form', that.state.form);
      socket.sendMessage('/login', 'post', that.state.form)
      .success(function(response) {
        that.props.navigator.push({
          'screen': 'app.HomeScreen',
          'title': 'Poof Home'
        })
      })
      .failure(function(err) {
        console.log('loginErr', err)
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
  render() {
    let updateUsernameInput = this.updateInput.bind(this, 'usernameInput');
    let updatePasswordInput = this.updateInput.bind(this, 'passwordInput');

    return (
      <Container style={{flex: 1, padding: 20}}>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                <Input placeholder="USERNAME" value={this.state.form.usernameInput} onChangeText={updateUsernameInput}/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={{ color: '#0A69FE'}} />
                <Input placeholder="PASSWORD" secureTextEntry value={this.state.form.passwordInput} onChangeText={updatePasswordInput} />
              </InputGroup>
            </ListItem>
          </List>
          <Button onPress={ this.onLoginPress.bind(this) } success capitalize style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
            Login
          </Button>
          <Button onPress={ this.onSignUpPress.bind(this) } capitalize style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
            Sign Up
          </Button>
        </Content>
      </Container>
      )
    
  }
}