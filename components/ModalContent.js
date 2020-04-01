import React, { Component } from 'react';
import { Dimensions, Share } from 'react-native';
import { WebView } from 'react-native-webview';
import { Container, Button, Content, Header, Left, Right, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

let ScreenHeight = Dimensions.get("window").height;

export default class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };

        this.onShare = this.onShare.bind(this);
    }

    async onShare() {
        await Share.share({
            message: `${this.state.data.title}\n\nRead More: ${this.state.data.url}\n\n-- Shared using NewsBucket`
        });
    }

    render() {
        return (
            <Container style={{margin:10, marginBottom:0, backgroundColor:'#fff'}}>
                <Header>
                    <Left>
                        <Button transparent onPress={this.props.closeModal}>
                            <Icon name="close" size={17} color="white" />
                        </Button>
                    </Left>
                    <Body>
                        <Title children="News Report" style={{color: 'white'}}/>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.onShare}>
                            <Icon name="share" size={17} color="white" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <WebView
                        source={{uri: this.state.data.url}}
                        style={{width: '100%', height: ScreenHeight - 95}}
                    />
                </Content>
            </Container>
        );
    }

}