/**
 * Created by guoshuyu on 2017/2/12.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Actions} from "react-native-router-flux";

import {connect} from 'react-redux';

import styles from '../../style/styles'
import {slideItemHeight}  from '../../style/styles'

const loading = require('../../img/loading.gif');

class SlideItem extends Component {

  render() {
    return (<TouchableOpacity activeOpacity={1} style={styles.slideContainer} onPress={this.props.onClick.bind(null, this.props.i)}>
      <Image onLoad={this.props.onLoad.bind(null, this.props.i)} style={styles.slideImage} source={{uri: this.props.uri}}

      />
      {
        (!this.props.loaded) && <View style={styles.slideLoadingView}>
          <Image style={styles.slideLoadingImage} source={loading}/>
        </View>
      }
    </TouchableOpacity>)
  }
}


class Slide extends Component {

  constructor(props) {
    super(props);
    this.imgList = [
      'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
      'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
      'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
    ];
    this.state = {
      loadQueue: [0, 0, 0, 0]
    };

  }

  /**
   * 图片的加载
   * */
  _loadHandle(i) {
    let loadQueue = this.state.loadQueue;
    loadQueue[i] = 1;
    this.setState({
      loadQueue
    })
  }

  _onClickItem(i) {
    Actions.PhotoView({selectPosition: {i}, imgData: this.imgList});
  }

  render() {
    return (
      <View>
        <Swiper loadMinimal loadMinimalSize={1} height={slideItemHeight} loop={false}>
          {
            this.imgList.map((item, i) => <SlideItem
              loaded={!!this.state.loadQueue[i]}
              onLoad={this._loadHandle.bind(this)}
              onClick={this._onClickItem.bind(this)}
              uri={item}
              i={i}
              key={i}/>)
          }
        </Swiper>
      </View>
    );
  }

}

export default Slide;