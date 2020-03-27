import React, { Component } from 'react';
import { Text, Image, Modal, Dimensions, Share } from 'react-native';
import { WebView } from 'react-native-webview';
import { Container, Button, Card, CardItem, Content, Header, Left, Right, Body, Title, Icon } from 'native-base';
import Loading from './Loading';

let ScreenHeight = Dimensions.get("window").height;

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modalVisible: false,
            modalDataIndex: 0
        };

        this.onShare = this.onShare.bind(this);
    }

    async UNSAFE_componentWillMount() {
        try {
            let response = await fetch('http://newsapi.org/v2/top-headlines?country=in&category='+this.props.category+'&apiKey=c6ef3c067708492e8223b8ae32ba7efa');
            let responseJson = await response.json();
            this.setState({ data: responseJson.articles });
        } catch (error) {
            console.error(error);
        }
    }

    async onShare() {
        await Share.share({
            message: `${this.state.data[this.state.modalDataIndex].title}\n\nRead More: ${this.state.data[this.state.modalDataIndex].url}\n\n-- Shared using NewsBucket`
        });
    }

    render() {
        if(this.state.data.length > 0){
        return (
            <Container>
                <Content>
                    <Modal
                        animationType="slide"
                        visible={this.state.modalVisible}
                        transparent
                        onRequestClose={() => this.setState({ modalVisible: false })}
                    >
                        <Container style={{margin:10, marginBottom:0, backgroundColor:'#fff'}}>
                            <Header>
                                <Left>
                                    <Button transparent onPress={() => this.setState({ modalVisible: false })}>
                                        <Icon name="close" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Title children={this.state.data[this.state.modalDataIndex].title} style={{color: 'white'}}/>
                                </Body>
                                <Right>
                                    <Button transparent onPress={this.onShare}>
                                        <Icon name="share" />
                                    </Button>
                                </Right>
                            </Header>
                            <Content>
                                <WebView
                                    source={{uri: this.state.data[this.state.modalDataIndex].url}}
                                    style={{width: '100%', height: ScreenHeight - 95}}
                                    startInLoadingState={true}
                                />
                            </Content>
                        </Container>
                    </Modal>
                    
                    {this.state.data.filter(news => news.urlToImage !== null && news.urlToImage !== '').map((news, index) => {
                        return (
                            <Card key={index}>
                                <CardItem style={{flexDirection: 'column'}}>                       
                                    <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5}}>{news.title.slice(0, news.title.lastIndexOf('-'))}</Text>
                                </CardItem>

                                <CardItem cardBody style={{flexDirection: 'column'}}> 
                                    <Image style={{width: '90%', height: 200}} source={{uri: news.urlToImage}} /> 
                                    <Text style={{width: '90%', marginVertical: 15}}>{news.description}</Text>
                                    <Button style={{width: '35%', flexDirection: 'column', marginBottom: 15}}
                                        onPress={() => this.setState({ modalVisible: true, modalDataIndex: index })}>
                                        <Text style={{color: 'white', textAlign: 'center', alignSelf: 'stretch', paddingTop: 7}}>
                                            Read More!
                                        </Text>
                                    </Button>
                                </CardItem>
                            </Card>
                        );
                    })}
                </Content>
            </Container>
        );
        } else {
            return ( <Loading padding="70" /> );
        }
    }

}