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
import ModalBox from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';

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
      isLoadMore: false,
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
        clickItem={this._clickItem.bind(this, rowID)}
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
    this.setState({
      isLoadMore: true
    });
    setTimeout(() => {
      let loadMoreData = Array(20).fill('').map((_, i) => `load item #${i + this.listViewData.length}`);
      //注意此处，因为文本都是string的，如果string都相同，那么会导致list判断，数据都是一样的，不更新ui
      //所以，需要用listViewData的长度，
      this.listViewData = this.listViewData.concat(loadMoreData);
      this.setState({
        dataSource: this.ds.cloneWithRows(this.listViewData)
      });
      this.setState({
        isLoadMore: false,
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

  /**
   * 列表item点击
   * */
  _clickItem(rowId) {
    let modal = (rowId % 2 === 0) ? this.refs.modal : this.refs.modalLoad;
    modal.open();
  }

  /**
   * 通过context引用
   * */
  getChildContext() {
    return {
      modalOpen: () => {
        this.refs.modal.open();
      }
    };
  }

  /**
   * 配置getChildContext，必须静态
   * 子控件还需要配置contextTypes
   * 然后子控件即可通过this.context引用父空间的方法等
   * */
  static childContextTypes = {
    modalOpen: React.PropTypes.func.isRequired,
  };


  render() {
    return (
      <View style={styles.container}>
        <SwipeListView
          removeClippedSubviews={false}//配合swiper使用，不设置的话，作为listview的header会不被绘制
          ref="list"
          //每一页加载的数量
          initialListSize={20}
          pageSize={20}
          onEndReachedThreshold={20}
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

        <ModalBox style={[styles.modal,styles.centered]}
                  ref={"modal"}
                  backButtonClose={true}
                  backdropPressToClose={true}
                  animationDuration={300}
                  backdrop={true}
                  backdropOpacity={0.4}
        >
          <Text
            style={[styles.centered, {color:'white'}]}>
            测试模态框。
          </Text>
        </ModalBox>

        <ModalBox style={[styles.modal,styles.centered]}
                  ref={"modalLoad"}
                  backButtonClose={true}
                  backdropPressToClose={true}
                  animationDuration={300}
                  backdrop={true}
                  backdropOpacity={0.4}
        >
          <Spinner style={[styles.centered]}
                   isVisible={true}
                   size={50} type="9CubeGrid" color="#FFFFFF"/>
        </ModalBox>
      </View>
    );
  }


}


export default TabListPage;
