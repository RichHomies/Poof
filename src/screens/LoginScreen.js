import React, { Component } from 'react';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
const Item = Picker.Item;


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }
  onSignUpPress() {
    this.props.navigator.showModal({
      title: 'Sign Up',
      screen: 'app.SignUpScreen'
    })
  }
  render() {
    return (
      <Container style={{flex: 1, padding: 20}}>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                <Input placeholder="USERNAME" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={{ color: '#0A69FE'}} />
                <Input placeholder="PASSWORD" secureTextEntry />
              </InputGroup>
            </ListItem>
          </List>
          <Button success capitalize style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
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