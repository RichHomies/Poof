import React, { Component } from 'react';
import { Container, Content, InputGroup, Input, Icon, Button } from 'native-base';

export default class ChatInput extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <InputGroup borderType='rounded' >
                        <Icon name='ios-cloud' style={{color:'#384850'}}/>
                        <Input placeholder='Type your Poof here'/>
                        <Button rounded primary>Send</Button>
                    </InputGroup>
                </Content>
            </Container>
        );
    }
}