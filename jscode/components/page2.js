import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Page2 extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
          <Text style={{fontSize:30}}>waiting for...</Text>
        </View>
      </View>
    );
  }
}


export default Page2