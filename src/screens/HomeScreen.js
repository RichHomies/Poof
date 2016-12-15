import React, { Component } from 'react';
import { Header, Footer, Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
  }
  onSendNewPoof(e) {
    e.preventDefault();
    this.props.navigator.push({
      screen: 'app.NewPoofScreen',
      title: 'New Poof'
    })
  }
  render() {
    return (
      <Container style={{flex: 1, padding: 20}}>
        <Header>
          <Text>Poofs</Text>
        </Header>
        <Content>

        </Content>
        <Footer>
          <Button onPress={this.onSendNewPoof.bind(this)}>Send New Poof</Button>
        </Footer>
      </Container>
    )
  }
}