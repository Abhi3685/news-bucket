import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Container, Header, Tab, Tabs, Body, Title, Right, Icon, Button, Card, CardItem, Content, Thumbnail } from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
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
          <Header noLeft style={{height: 80, paddingTop: 20}}>
            <Body>
              <Title>NewsBucket</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='search'></Icon>
              </Button>
            </Right>
          </Header>
          <Tabs>
            <Tab heading="Tab1">
              <Container>
                  <Content>
                      <Card>
                          <CardItem style={{flexDirection: 'column'}}>                       
                              <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5}}>Asian stocks rebound, Fed soothes with boundless QE - Reuters</Text>
                          </CardItem>

                          <CardItem cardBody style={{flexDirection: 'column'}}> 
                              <Image style={{width: '90%', height: 200}} source={{uri: 'https://s3.reutersmedia.net/resources/r/?m=02&d=20200324&t=2&i=1507373163&w=1200&r=LYNXMPEG2N0BL'}} /> 
                              <Text style={{width: '90%', marginVertical: 15}}>LONDON (Reuters) - Global equities rebounded almost 2% on Tuesday, off near four-year lows, and the dollar slipped as investors pinned hopes on unprecedented stimulus steps by the U.S Federal Reserve and other policymakers to ease strains in financial markets… </Text>
                              <Button style={{width: '35%', flexDirection: 'column', marginBottom: 15}}><Text style={{color: 'white', textAlign: 'center', alignSelf: 'stretch', paddingTop: 7}}>Read More!</Text></Button>
                          </CardItem>
                    </Card>
                  </Content>
              </Container>
            </Tab>
            <Tab heading="Tab2">
              <Text>Hello Tab2</Text>
            </Tab>
            <Tab heading="Tab3">
              <Text>Hello Tab3</Text>
            </Tab>
            <Tab heading="Tab4">
              <Text>Hello Tab4</Text>
            </Tab>
            <Tab heading="Tab5">
              <Text>Hello Tab5</Text>
            </Tab>
          </Tabs>
        </Container>
      );
    } else {
      return(
        <View>
          <Text>Loading!</Text>
        </View>
      );
    }
  }
}