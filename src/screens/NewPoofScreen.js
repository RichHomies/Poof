import React, {Component} from 'react';
import { Header, Footer, Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button, Item } from 'native-base';
import storage from '../storage.js';

import ws from '../socket/client.js';

export default class NewPoofScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        selectedItem: undefined,
        selected1: '1',
    };
  }
  onValueChange(value: string) {
    this.setState({
        selected1: value,
    });
  }
  onSendPoof() {
    var that = this;
    //get id from async
    storage.get('sessionId').then(function(id){
      ws.then(function(socket) {
        socket.sendMessage('/poof', 'post', {
          recipient: 'Z',
          sender: 'Joe',
          message: 'test test',
          id: id
        })
      });
    })

  
  }
  render() {
    return (
      <Container style={{flex: 1, padding: 20}}>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="To" placeholder="Your friend" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="Message" placeholder="Your Poof" />
              </InputGroup>
            </ListItem>
            <ListItem iconLeft>
                <Icon name="ios-clock" style={{ color: '#0A69FE' }} />
                <Text>Duration</Text>
                <Picker
                  iosHeader="Poof Duration"
                  mode="dropdown"
                  selectedValue={this.state.selected1}
                  onValueChange={this.onValueChange.bind(this)} >
                    <Item label="1" value="1" />
                    <Item label="2" value="2" />
                    <Item label="3" value="3" />
                </Picker>
            </ListItem>
          </List>
        </Content>
        <Footer>
          <Button onPress={this.onSendPoof.bind(this)}>Send Poof</Button>
        </Footer>
      </Container>
      )
  }
}