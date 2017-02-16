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
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

import Icon from 'react-native-vector-icons/FontAwesome'

class ListItem extends Component {

  /**
   * 定义后，因为父空间定义getChildContext();
   * 这里即可以通过this.context引用到父空间的方法。
   *
   * 而且ListItem的子控件也可以通过this.context.引用到
   * */
  static contextTypes = {
    modalOpen: React.PropTypes.func.isRequired,
  };

  render() {

    let iconSize = listItemHeight - 10;

    return (
      <SwipeRow
        leftOpenValue={80}
        rightOpenValue={-150}
      >
        <View style={styles.rowBack}>
          <Text style={{color:'#885ff3'}}>左边</Text>

          <TouchableHighlight style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => { this.context.modalOpen();}}>
            <Text style={{color: 'black'}}>右键</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.backRightBtn, styles.backRightBtnRight]}
                              onPress={() => alert("you click delete item " + this.props.data)}>
            <Text style={{color: 'white'}}>删除</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          onPress={ this.props.clickItem}
          underlayColor={'#C9C9C9'}>
          <View
            style={styles.listRowItem}>
            <Icon name={'music'} size={iconSize} color={'#885ff3'}/>
            <Text style={[styles.commonMargin, {fontSize: 15, color:'black'}]}>
              I'm {this.props.data} in a List
            </Text>
          </View>
        </TouchableHighlight>
      </SwipeRow>


    );
  }
}

export default ListItem;