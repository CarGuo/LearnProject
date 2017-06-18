import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    ActivityIndicator,
} from 'react-native'
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'

import {Actions} from "react-native-router-flux";
import Styles from '../style/styles'

const {width, height} = Dimensions.get('window');

var styles = {
    wrapper: {
        backgroundColor: '#000',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        width,
        height,
        flex: 1
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    thumbWrap: {
        marginTop: 100,
        borderWidth: 5,
        borderColor: '#000',
        flexDirection: 'row'
    },
    thumb: {
        width: 50,
        height: 50
    }
}

const renderPagination = (index, total, context) => {
    return (
        <View style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 25,
      left: 0,
      right: 0
    }}>
            <View style={{
        borderRadius: 7,
        backgroundColor: 'rgba(255,255,255,.15)',
        padding: 3,
        paddingHorizontal: 7
      }}>
                <Text style={{
          color: '#fff',
          fontSize: 14
        }}>{index + 1} / {total}</Text>
            </View>
        </View>
    )
}


const Viewer = props => <Swiper index={props.index} style={styles.wrapper} renderPagination={renderPagination}>
    {
        props.imgList.map((item, i) => <View key={i} style={styles.slide}>
            <PhotoViewItemVier
                key={i}
                onPressViewer={props.onPressViewer.bind(null)}
                item={item}
            />
        </View>)
    }
</Swiper>


class PhotoViewItemVier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageLoaded: true
        }
    }

    componentDidMount() {
        this.mount = true;
    }

    componentWillUnmount() {
        this.mount = false;
    }

    render() {
        let loading = (this.state.imageLoaded) ?

            <View style={[{position: 'absolute', top: 100, left: 100, right: 100, bottom: 100},
                Styles.transparentBg, Styles.defaultPageContainer, Styles.centered]}>
                <ActivityIndicator
                    color={'#885ff3'}
                    animating={true}
                    style={ [{height: 80}, Styles.centered]}
                    size="large"/>
            </View> : <View/>
        return (
            <View style={styles.slide}>
                <PhotoView
                    onTap={this.props.onPressViewer}
                    source={{uri: this.props.item}}
                    resizeMode='contain'
                    minimumZoomScale={0.5}
                    maximumZoomScale={3}
                    androidScaleType='center'
                    onLoadStart={this.onLoadStart.bind(this)}
                    onLoad={this.onLoad.bind(this)}
                    style={styles.photo}/>
                {loading}
            </View>
        )
    }

    onLoadStart(e) {
        if (this.mount == true) {
            setTimeout(() => {
                this.setState({
                    imageLoaded: true
                });
            }, 50);
        }
    }

    onLoad(e) {
        if (this.mount == true) {
            setTimeout(() => {
                this.setState({
                    imageLoaded: false
                });
            }, 50);
        }
    }
}

class PhotoComponent extends Component {
    constructor(props) {
        super(props);
        let {i} = this.props.selectPosition;
        this.state = {
            imgList: this.props.imgData,
            showViewer: true,
            showIndex: i,
        };
        this.thumbPressHandle = this.thumbPressHandle.bind(this);
        this.viewerPressHandle = this.viewerPressHandle.bind(this);
    }

    thumbPressHandle(i) {
        this.setState({
            showIndex: i,
            showViewer: true
        })
    }

    viewerPressHandle() {
        Actions.pop();
    }

    render() {
        return (<View style={{position: 'relative'}}>
            {this.state.showViewer && <Viewer
                onPressViewer={this.viewerPressHandle.bind(this)}
                index={this.state.showIndex}
                imgList={this.state.imgList}/>}
            <View style={styles.thumbWrap}>
                {
                    this.state.imgList.map((item, i) => <TouchableOpacity key={i}
                                                                          onPress={e => this.thumbPressHandle(i)}>
                        <Image style={styles.thumb} source={{uri: item}}/>
                    </TouchableOpacity>)
                }
            </View>
        </View>)
    }
}

export default PhotoComponent;