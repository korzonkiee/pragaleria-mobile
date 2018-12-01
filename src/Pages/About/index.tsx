import React, {Component} from 'react'
import {Text, Button, View} from 'react-native'
import AppContainer from '../../Components/AppContainer';
import * as Routes from "../../Routes";
import AppText from "../../Components/AppText";

export interface AboutProps {
}



export class About extends Component<AboutProps> {
    render() {
        return (
            <AppContainer>
                <AppText>About</AppText>
            </AppContainer>
        )
    }
}
