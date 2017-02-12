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
        {...actions} />
    );
  }
}

export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(Page2);