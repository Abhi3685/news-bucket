import React, { Component } from 'react';
import { Modal } from 'react-native';
import { Container, Button, Content, Header, Left, Button, Right, Title } from 'native-base';

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    async UNSAFE_componentWillMount() {
        
    }

    render() {
        return (
            <Modal
                animationType="slide"
                visible={this.props.isVisible}
                transparent
            >
                <Container style={{margin:15, marginBottom:0, backgroundColor:'#fff'}}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name="close" style={{color: 'white', fontSize: 12}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title children="Title" style={{color: 'white'}}/>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="share" style={{color: 'white', fontSize: 12}}/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    
                </Content>
                </Container>
            </Modal>
        );
    }

}