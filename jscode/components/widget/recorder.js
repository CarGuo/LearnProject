/**
 * Created by guoshuyu on 2017/3/11.
 */
import React, {Component} from 'react';
import {
    View, TouchableOpacity, Text, Platform, Modal,
    PermissionsAndroid,
} from 'react-native';

import styles from '../../style/styles'
import {AudioRecorder, AudioUtils} from 'react-native-audio';

export default class Recorder extends Component {

    constructor(props) {
        super(props);

        this.onButtonPressIn = this.onButtonPressIn.bind(this);
        this.onButtonPressOut = this.onButtonPressOut.bind(this);
        this.mill = 0;
        //设置state
        this.state = {
            currentTime: 0.0,
            recording: false,
            stoppedRecording: false,
            finished: false,
            hasPermission: undefined,
            audioPath: AudioUtils.DocumentDirectoryPath + '/test.amr',
            voiceLevel: 0,
            shareModalVisible: false

        }
    }

    componentDidMount() {
        this._checkPermission().then((hasPermission) => {
            this.setState({hasPermission});

            if (!hasPermission) return;

            console.log('************ hadPermission ************')

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({
                    currentTime: Math.floor(data.currentTime),
                    voiceLevel: data.maxAmp
                });
            };

            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    //alert(this.mill + ' path: ' + data.audioFileURL);
                    //this._finishRecording(data.status === "OK", data.audioFileURL);
                }
            };
        });
    }

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "amr_nb",
            AudioEncodingBitRate: 32000
        });
    }

    _checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            'title': 'Microphone Permission',
            'message': 'AudioExample needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                console.log('Permission result:', result);
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }


    async _stop() {
        if (!this.state.recording) {
            console.warn('Can\'t stop, not recording!');
            return;
        }

        this.setState({stoppedRecording: true, recording: false});

        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                //alert(this.mill + ' path: ' + filePath);
                //this._finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    async _record() {
        if (this.state.recording) {
            console.warn('Already recording!');
            return;
        }

        if (!this.state.hasPermission) {
            console.warn('Can\'t record, no permission granted!');
            return;
        }

        if (this.state.stoppedRecording) {
            this.prepareRecordingPath(this.state.audioPath);
        }

        this.setState({recording: true});

        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }

    onButtonPressIn() {
        this._record();
        this.recordTime = (new Date()).valueOf();
        this.setState({
            shareModalVisible: true
        });
    }

    onButtonPressOut() {
        this._stop();
        let endTime =  (new Date()).valueOf();
        //差值
        let time = endTime - this.recordTime;

        this.mill = time / (1000);

        this.setState({
            shareModalVisible: false
        });

        if (this.mill < 1) {
            alert("时间太短了")
        }
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.button}
                                  onPressIn={ this.onButtonPressIn}
                                  onPressOut={ this.onButtonPressOut}>
                    <Text style={styles.button}> 按下录音，不支持模拟器 </Text>

                </TouchableOpacity>

                <Modal animationType='fade'
                       transparent={true}
                       onRequestClose={()=>{}}
                       visible={this.state.shareModalVisible}
                       onShow={() => console.log('onShow...')}>
                    <View style={[styles.overlayBox,styles.translucentBg,styles.defaultPageContainer]}>
                        <View style={[styles.blankBackgroundColor,
                        {width:300, height: 300, borderRadius:10}, styles.centered]}>
                            <Text style={styles.centered}>
                                {"声音大小 " + this.state.voiceLevel}
                            </Text>
                        </View>
                    </View>

                </Modal>


            </View>)
    }
}
