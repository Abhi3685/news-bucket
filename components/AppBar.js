import React, { Component } from 'react';
import { Button, Header, Right, Body, Title, Icon } from 'native-base';

export default class AppBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <Header noLeft style={{height: 80, paddingTop: 20, marginBottom: -10}}>
                <Body>
                    <Title>NewsBucket</Title>
                </Body>
                <Right>
                    <Button transparent onPress={this.props.reload}>
                        <Icon name='refresh'></Icon>
                    </Button>
                </Right>
            </Header>
        );
    }

}