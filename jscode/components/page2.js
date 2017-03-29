import React, {Component} from 'react';
import {View} from 'react-native';

import {bindActionCreators} from 'redux';
import Counter from '../components/widget/counter';
import Record from '../components/widget/recorder';
import GridCount from '../components/widget/gridCount';
import * as counterActions from '../actions/counter';
import {connect} from 'react-redux';
import styles from '../style/styles'
import Autolink from 'react-native-autolink';

class Page2 extends Component {

    constructor(props) {
        super(props);

        this.onButtonPressIn = this.onButtonPressIn.bind(this);
        this.onButtonPressOut = this.onButtonPressOut.bind(this);
    }

    onButtonPressIn() {

    }

    onButtonPressOut() {

    }

    render() {
        const {state, actions} = this.props;

        let counter =
            <Counter
                counter={state.count}
                //直接展开绑定的action，作为counter的props传递进去
                {...actions} />;
        let recorder = <Record/>
        return (
            <View style={styles.container}>
                {counter}
                {recorder}
                <GridCount/>
                <Autolink
                    text="This 😖😖 is the string to parse for urls (https://github.com/joshswan/react-native-autolink), phone numbers (415-555-5555), emails (josh@sportifik.com), mentions/handles (@twitter), and hashtags (#exciting)"
                    hashtag="instagram"
                    mention="twitter" />
            </View>
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