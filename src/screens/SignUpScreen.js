import React, { Component } from 'react';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';


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
    return (
      <Container style={{flex: 1, padding: 20}}>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="First Name" placeholder="John" />
              </InputGroup>
            </ListItem>
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
            <ListItem>
              <InputGroup>
                <Icon name="ios-call" style={{ color: '#0A69FE'}} />
                <Input placeholder="PHONE" keyboardType="numeric" />
              </InputGroup>
            </ListItem>
            <ListItem iconLeft>
              <Icon name="ios-transgender" style={{ color: '#0A69FE' }} />
              <Text>GENDER</Text>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selected1}
                onValueChange={this.onValueChange.bind(this)} >
                  <Item label="Male" value="key0" />
                  <Item label="Female" value="key1" />
                  <Item label="Other" value="key2" />
              </Picker>
            </ListItem>
            <ListItem>
              <InputGroup >
                <Input stackedLabel label="Permanent Address" placeholder="Address" />
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
}