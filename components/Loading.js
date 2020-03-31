import React, { Component } from 'react';
import { View, Spinner } from 'native-base';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ paddingTop: this.props.padding + '%' }}>
                <Spinner color='blue' />
            </View>
        );
    }

}