import React, { Component } from 'react';
import { Text, Modal, View, FlatList } from 'react-native';
import { Container, Card, CardItem } from 'native-base';
import Loading from './Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageLoad from 'react-native-image-placeholder';

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
    }

    async UNSAFE_componentWillMount() {
        let url = 'https://newsapi.org/v2/top-headlines?country=in&category='+this.props.category+'&apiKey=c6ef3c067708492e8223b8ae32ba7efa';
        if(this.props.category == 'home'){
            url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=c6ef3c067708492e8223b8ae32ba7efa';
        }
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            this.setState({ data: responseJson.articles.filter(news => news.urlToImage !== null && news.urlToImage !== '') });
        } catch (error) {
            console.error(error);
        }
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }

    render() {
        if(this.state.data.length > 0){
        return (
            <Container>
                <Modal
                    animationType="slide"
                    visible={this.state.modalVisible}
                    transparent
                    onRequestClose={this.closeModal}
                >
                    <ModalContent closeModal={this.closeModal} data={this.state.data[this.state.modalDataIndex]} />
                </Modal>

                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={( { item: news, index } ) => (
                        <Card key={index}>
                            <CardItem style={{ paddingHorizontal: 10 }}>
                                <View style={{ width: "70%" }}>
                                    <Text style={{fontSize: 16, textAlign: 'justify', fontWeight: 'bold', marginRight: 10, marginBottom: 5}}>{news.title.slice(0, news.title.lastIndexOf('-'))}</Text>
                                    <Text style={{ color: "#696969" }}>{news.source.name}</Text>
                                    <Text style={{ color: "blue", opacity: 0.7 }}
                                        onPress={() => this.setState({ modalVisible: true, modalDataIndex: index })}>Read More &nbsp;<Icon name="angle-right" size={14}></Icon></Text>
                                </View>
                                <ImageLoad
                                    style={{width: "30%", height: 100}}
                                    progressiveRenderingEnabled={true}
                                    source={{uri: news.urlToImage}}
                                />
                            </CardItem>
                        </Card>
                    )}
                />
            </Container>
        );
        } else {
            return ( <Loading padding="70" /> );
        }
    }

}