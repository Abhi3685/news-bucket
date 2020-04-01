import React, { Component } from 'react';
import { Button, Header, Right, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AppBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <Header noLeft>
                <Body>
                    <Title>NewsBucket</Title>
                </Body>
                <Right>
                    <Button transparent onPress={this.props.reload}>
                        <Icon name="refresh" size={17} color="#fff" />
                    </Button>
                </Right>
            </Header>
        );
    }

}