/**
 * Created by guoshuyu on 2017/2/10.
 */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from '../../style/styles'
import {listItemHeight} from '../../style/styles'

import Icon from 'react-native-vector-icons/FontAwesome'

class ListItem extends Component {

  render() {

    let iconSize = listItemHeight - 10;

    return (
      <TouchableHighlight
        onPress={ _ => console.log('You touched me') }
        underlayColor={'#C9C9C9'}>
        <View
          style={styles.listRowItem}>
          <Icon name={'music'} size={iconSize} color={'#885ff3'}/>
          <Text style={[styles.commonMargin, {fontSize: 15, color:'black'}]}>
            I'm {this.props.data} in a List
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ListItem;