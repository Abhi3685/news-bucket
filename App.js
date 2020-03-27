import React, { Component } from 'react';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';

import Category from './components/Category';
import Loading from './components/Loading';
import AppBar from './components/AppBar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      categories: [ 'entertainment', 'business', 'science', 'health', 'sports' ]
    };

    this.reload = this.reload.bind(this);
  }

  async UNSAFE_componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  reload() {
    this.setState({ loading: true });
    let that = this;
    setTimeout(function(){
      that.setState({ loading: false });
    }, 500);
  }

  render() {
    if (!this.state.loading) {
      return (
        <Container>
          <AppBar reload={this.reload} />
          <Tabs renderTabBar={()=> <ScrollableTab />}>
            {
              this.state.categories.map(category => {
                return (
                  <Tab key={category} heading={category.charAt(0).toUpperCase() + category.slice(1)}>
                    <Category category={category} />
                  </Tab>
                );
              })
            }
          </Tabs>
        </Container>
      );
    } else {
      return( <Loading padding="85" /> );
    }
  }
}