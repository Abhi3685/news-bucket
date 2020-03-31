import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';

import Category from './components/Category';
import Loading from './components/Loading';
import AppBar from './components/AppBar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      categories: [ 
        { heading: 'Home', slug: 'home' },
        { heading: 'Tech', slug: 'technology' },
        { heading: 'Health', slug: 'health' },
        { heading: 'Sports', slug: 'sports' }
      ]
    };

    this.reload = this.reload.bind(this);
  }

  UNSAFE_componentWillMount() {
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
          <Tabs style={{ borderTopWidth: 0 }}>
            {
              this.state.categories.map(category => {
                return (
                  <Tab key={category.slug} heading={category.heading}>
                    <Category category={category.slug} />
                  </Tab>
                );
              })
            }
          </Tabs>
        </Container>
      );
    } else {
      return(
        <Loading padding="85" /> 
      );
    }
  }
}