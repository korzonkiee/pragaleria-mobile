import {Component} from "react";

import {
    ViroARScene,
    ViroText,
    ViroConstants,
} from 'react-viro';
import React from "react";
import {StyleSheet} from 'react-native'


export default class HelloWorldSceneAR extends Component{
    render(){
        return (
            <ViroARScene>
                <ViroText text={"Siemanko"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
            </ViroARScene>
        );
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
