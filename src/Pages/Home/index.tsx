import React from 'react'
import {
    ViroARSceneNavigator
} from 'react-viro';
import HelloWorldSceneAR from "./arscene";

export interface HomeProps {
}

var sharedProps = {
    apiKey: "E5FF3472-E7C0-4653-958B-989F94A7E7A1",
}

export function Home(props: HomeProps) {
    return (
        <ViroARSceneNavigator {...sharedProps}
                              initialScene={{scene: HelloWorldSceneAR}}/>
    );


}
