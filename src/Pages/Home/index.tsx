import React, {Component} from 'react'
import { StyleSheet } from 'react-native'
import {Text} from 'react-native'
import AppContainer from '../../Components/AppContainer';

import {
    ViroARScene,
    ViroText,
    ViroConstants,
} from 'react-viro';

export interface HomeProps {
}

export function Home(props: HomeProps) {
    return <AppContainer>
            <ViroARScene onTrackingUpdated={console.log("halo")}>
        <ViroText text={"Siemanko"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    </AppContainer>
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
