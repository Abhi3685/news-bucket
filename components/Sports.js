import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { Container, Button, Card, CardItem, Content } from 'native-base';

export default class Sports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    async UNSAFE_componentWillMount() {
        try {
            let response = await fetch('http://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=c6ef3c067708492e8223b8ae32ba7efa');
            let responseJson = await response.json();
            this.setState({ data: responseJson.articles });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.state.data.map((news, index) => {
                        return (
                            <Card key={index}>
                                <CardItem style={{flexDirection: 'column'}}>                       
                                    <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5}}>{news.title.split('-')[0]}</Text>
                                </CardItem>

                                <CardItem cardBody style={{flexDirection: 'column'}}> 
                                    <Image style={{width: '90%', height: 200}} source={{uri: news.urlToImage}} /> 
                                    <Text style={{width: '90%', marginVertical: 15}}>{news.description}</Text>
                                    <Button style={{width: '35%', flexDirection: 'column', marginBottom: 15}}><Text style={{color: 'white', textAlign: 'center', alignSelf: 'stretch', paddingTop: 7}}>Read More!</Text></Button>
                                </CardItem>
                            </Card>
                        );
                    })}
                </Content>
            </Container>
        );
    }

}