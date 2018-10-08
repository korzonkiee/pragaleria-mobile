import {Component} from "react";

import {
    ViroARScene,
    ViroText,
    ViroARPlaneSelector,
} from 'react-viro';
import React from "react";
import {StyleSheet} from 'react-native'


export default class HelloWorldSceneAR extends Component {
    render() {
        return (
            <ViroARScene onTrackingUpdated={this._onInitialized}>
                <ViroText text={"Gówno"} scale={[.5, .5, .5]} position={[0, 0, -1]}
                          style={styles.helloWorldTextStyle}/>
                <ViroARPlaneSelector/>
                {/*<ViroARPlaneSelector alignment="Vertical"/>*/}
            </ViroARScene>
        )
    }

    _onInitialized(state, reason) {
        console.log("onTrackingUpdated called");
        console.log(state);
        console.log(reason);
        // Viro recording error constants
        // RECORD_ERROR_NONE : -1,
        // RECORD_ERROR_UNKNOWN : 0,
        // RECORD_ERROR_NO_PERMISSION : 1,
        // RECORD_ERROR_INITIALIZATION : 2,
        // RECORD_ERROR_WRITE_TO_FILE : 3,
        // RECORD_ERROR_ALREADY_RUNNING : 4,
        // RECORD_ERROR_ALREADY_STOPPED : 5,
        //
        // / Viro AR Tracking constants,
        // TRACKING_UNAVAILABLE : 1,
        // TRACKING_LIMITED : 2,
        // TRACKING_NORMAL : 3,
        //
        // / Viro AR Tracking reason constants,
        // RACKING_REASON_NONE : 1,
        // RACKING_REASON_EXCESSIVE_MOTION : 2,
        // RACKING_REASON_INSUFFICIENT_FEATURES : 3,
    }

}
var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});
