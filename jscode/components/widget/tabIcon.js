/**
 * Created by guoshuyu on 2017/2/10.
 */

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import styles from '../../style/styles'
import Icon from 'react-native-vector-icons/FontAwesome'

import {tabIconSize} from '../../style/styles'

const config = {
  ['列表']: 'rocket',
  ['第二']: 'facebook',
};

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  tabName: PropTypes.string,
};

class TabIon extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    let textColor = this.props.selected ? styles.primaryFontColor : styles.grayFontColor;

    let iconPath = config[this.props.tabName];

    let color = this.props.selected ? '#885ff3' : '#999999';

    return (
      <View style={styles.centered}>
        <Icon name={iconPath} size={tabIconSize} color={color}/>
        <Text style={[textColor, styles.tinyFontSize]}>{this.props.tabName}</Text>
      </View>
    );
  }
}

TabIon.propTypes = propTypes;

export default TabIon;