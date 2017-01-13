import React, { Component } from 'react';
import { Header, Footer, Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import storage from '../storage.js';

import ws from '../socket/client.js';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poofs: []
    }
  }
  componentWillMount() {
    var that = this;
    storage.get('sessionId').then(function(id){
      ws.then(function(socket) {
        socket.sendMessage('/poof', 'get', {
            id: JSON.parse(id)
          }).success(function(response) {
            that.setState({poofs: response[0]})
          })
      })
    })
    
  }
  onSendNewPoof(e) {
    e.preventDefault();
    this.props.navigator.push({
      screen: 'app.NewPoofScreen',
      title: 'New Poof'
    })
  }
  render() {
    var poofs = this.state.poofs.map(function(val, i) {
      return (<ListItem key={i}><Text>Poof from {val.from}</Text></ListItem>)
    })
    return (
      <Container style={{flex: 1, padding: 20}}>
        <Header>
          <Text>Poofs</Text>
        </Header>
        <Content>
          <List>
            {poofs}
          </List>
        </Content>
        <Footer>
          <Button onPress={this.onSendNewPoof.bind(this)}>Send New Poof</Button>
        </Footer>
      </Container>
    )
  }
}