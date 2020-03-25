import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Container, Header, Tab, Tabs, Body, Title, Right, Icon, Button, Card, CardItem, Content, ScrollableTab } from 'native-base';

import Entertainment from './components/Entertainment';
import Business from './components/Business';
import Science from './components/Science';
import Health from './components/Health';
import Sports from './components/Sports';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true
    };
  }

  async UNSAFE_componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (!this.state.loading) {
      return (
        <Container>
          <Header noLeft style={{height: 80, paddingTop: 20, marginBottom: -10}}>
            <Body>
              <Title>NewsBucket</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='search'></Icon>
              </Button>
            </Right>
          </Header>
          <Tabs renderTabBar={()=> <ScrollableTab />}>
            <Tab heading="Entertainment">
              <Entertainment />
            </Tab>
            <Tab heading="Business">
              <Business />
            </Tab>
            <Tab heading="Science">
              <Science />
            </Tab>
            <Tab heading="Health">
              <Health />
            </Tab>
            <Tab heading="Sports">
              <Sports />
            </Tab>
          </Tabs>
        </Container>
      );
    } else {
      return(
        <View style={{padding: 50}}>
          <Text>Loading!</Text>
        </View>
      );
    }
  }
}