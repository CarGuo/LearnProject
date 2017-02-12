/**
 * Created by guoshuyu on 2017/2/10.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  RefreshControl,
  TouchableHighlight,
  Platform,
  ActivityIndicator
} from 'react-native';

import ListViewItem from './widget/listItem';
import Slider from './widget/slide';

import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

import styles from '../style/styles';


class TabListPage extends Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    //创建20条数据，从零开始遍历填充数据
    this.listViewData = Array(20).fill('').map((_, i) => `item #${i}`);

    //设置state
    this.state = {
      isRefresh: false,
      dataSource: this.ds.cloneWithRows(this.listViewData)
    }
  }

  /**
   * 绘制List的item
   * */
  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <ListViewItem
        data={rowData}
      />
    );
  };

  /**
   * 绘制List的头部
   * */
  _renderHeader() {
    return (
      <Slider/>
    );
  };


  /**
   * 绘制load more footer
   * */
  _renderFooter() {

    let footer =
      <View style={{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
        <ActivityIndicator
          color={'#885ff3'}
          animating={this.state.animating}
          style={ {height: 50}}
          size="large"/>
        <Text style={{fontSize: 15, color:'black'}}>
          正在加载更多···
        </Text>
      </View>;

    return (footer);
  }

  /**
   * 加载更多
   * */
  _loadMore() {
    let loadMoreData = Array(20).fill('').map((_, i) => `load item #${i + this.listViewData.length}`);
    this.listViewData = this.listViewData.concat(loadMoreData);
    setTimeout(() => {
      this.setState({
        dataSource: this.ds.cloneWithRows(this.listViewData)
      });
    }, 5000);
  }

  /**
   * 刷新
   * */
  _refresh() {
    this.setState({
      isRefresh: true
    });
    setTimeout(() => {
      this.listViewData = Array(20).fill('').map((_, i) => `refresh item #${i}`);
      this.setState({
        dataSource: this.ds.cloneWithRows(this.listViewData)
      });
      this.setState({
        isRefresh: false
      });
    }, 2500);
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeListView
          removeClippedSubviews={false}//配合swiper使用，不设置的话，作为listview的header会不被绘制
          ref="list"
          refreshControl={<RefreshControl
             refreshing={this.state.isRefresh}
             onRefresh={this._refresh.bind(this)}
             tintColor="#885ff3"
             title="刷新中..."
             colors={['#885ff3', '#885fc3']}
          />}
          renderRow={
            (rowData, sectionID, rowID, highlightRow) =>
            this._renderRow(rowData, sectionID, rowID, highlightRow)
          }
          dataSource={this.state.dataSource}
          renderHeader={this._renderHeader.bind(this)}
          renderFooter={this._renderFooter.bind(this)}

          onEndReached={this._loadMore.bind(this)}
        />
      </View>
    );
  }


}


export default TabListPage;
