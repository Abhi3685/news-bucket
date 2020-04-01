import React, { Component } from 'react';
import { Text, Image, Modal, View } from 'react-native';
import { Container, Card, CardItem, Content } from 'native-base';
import Loading from './Loading';
import Icon from 'react-native-vector-icons/FontAwesome';

import ModalContent from './ModalContent';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modalVisible: false,
            modalDataIndex: 0
        };

        this.closeModal = this.closeModal.bind(this);
        this.loadDefaultImage = this.loadDefaultImage.bind(this);
    }

    async UNSAFE_componentWillMount() {
        let url = 'http://newsapi.org/v2/top-headlines?country=in&category='+this.props.category+'&apiKey=c6ef3c067708492e8223b8ae32ba7efa';
        if(this.props.category == 'home'){
            url = 'http://newsapi.org/v2/top-headlines?country=in&apiKey=c6ef3c067708492e8223b8ae32ba7efa';
        }
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            this.setState({ data: responseJson.articles });
        } catch (error) {
            console.error(error);
        }
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }

    loadDefaultImage(index) {
        var temp = this.state.data;
        temp[index].urlToImage = 'https://assets-global.website-files.com/583347ca8f6c7ee058111b55/5afc770caa130421393fa412_google-doc-error-message.png';
        this.setState({ data: temp });
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
                        onRequestClose={this.closeModal}
                    >
                        <ModalContent closeModal={this.closeModal} data={this.state.data[this.state.modalDataIndex]} />
                    </Modal>
                    
                    {this.state.data.filter(news => news.urlToImage !== null && news.urlToImage !== '').map((news, index) => {
                        return (
                            <Card key={index}>
                                <CardItem style={{ paddingHorizontal: 10 }}>
                                    <View style={{ width: "70%" }}>
                                        <Text style={{fontSize: 16, textAlign: 'justify', fontWeight: 'bold', marginRight: 10, marginBottom: 5}}>{news.title.slice(0, news.title.lastIndexOf('-'))}</Text>
                                        <Text style={{ color: "#696969" }}>{news.source.name}</Text>
                                        <Text style={{ color: "blue", opacity: 0.7 }}
                                            onPress={() => this.setState({ modalVisible: true, modalDataIndex: index })}>Read More &nbsp;<Icon name="angle-right" size={14}></Icon></Text>
                                    </View>
                                    <Image style={{width: "30%", height: 100}} source={{uri: news.urlToImage}} 
                                        onError={() => this.loadDefaultImage(index)} />
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