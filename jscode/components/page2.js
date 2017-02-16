import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import Counter from '../components/widget/counter';
import * as counterActions from '../actions/counter';
import { connect } from 'react-redux';

class Page2 extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <Counter
        counter={state.count}
        //直接展开绑定的action，作为counter的props传递进去
        {...actions} />
    );
  }
}

//
export default connect(state => ({
    state: state.counter //这个是reducers/index下的counter,关联page的props中的state
  }),
  //把
  (dispatch) => ({
    //将../actions/counter下的所有action绑定到actions
    actions: bindActionCreators(counterActions, dispatch)
  })
)(Page2);