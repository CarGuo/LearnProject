import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Platform,
} from 'react-native';
import {
  Scene,
  Router,
  Modal
} from 'react-native-router-flux';

import Page2 from '../components/page2'
import PhotoView from '../components/PhotoView'
import TabIcon from '../../jscode/components/widget/tabIcon';
import {iosNav, androidNav, tabBarHeight} from '../style/styles'
import TabListPage from '../../jscode/components/tabListPage';

//设置router的样式
const getSceneStyle = (props, computedProps) => {

  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };

  //因为tab和navBar会overlap，导致被遮挡看不到，所以需要设置padding
  if (computedProps.isActive) {
    style.paddingTop = computedProps.hideNavBar ? 0 : (Platform.OS == 'ios' ? iosNav : androidNav);
    style.paddingBottom = computedProps.hideTabBar ? 0 : tabBarHeight;
  }
  return style;
};


export const getRouter = () => {
  return (
    <Router getSceneStyle={getSceneStyle}>
      <Scene key="modal" component={Modal}>
        <Scene key="root">
          <Scene
            key="main"
            tabs
            tabBarStyle={{
              height:tabBarHeight,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:'#f9f9f9'
              }}>
            <Scene
              key="tabListPage"
              component={TabListPage}
              icon={TabIcon}
              title="演示列表"
              tabName="列表"
            />
            <Scene
              key="page2"
              component={Page2}
              icon={TabIcon}
              tabName="第二"
              title="第二页"
            />
          </Scene>
        </Scene>
        <Scene key="PhotoView" component={PhotoView}/>
      </Scene>
    </Router>
  )
};
