import React, {Component} from 'react'
import {Text, Button, View} from 'react-native'
import AppContainer from '../../Components/AppContainer';
import * as Routes from "../../Routes";
import AppText from "../../Components/AppText";

export interface HomeProps {
}



export class Home extends Component<HomeProps> {
    render() {
        return (
            <AppContainer>
                <AppText>Home</AppText>
            </AppContainer>
        )
    }
}
