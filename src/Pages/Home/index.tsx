import React, {Component} from 'react'
import {Text, Button, View} from 'react-native'
import AppContainer from '../../Components/AppContainer';
import * as Routes from "../../Routes";

export interface HomeProps {
}



export class Home extends Component<HomeProps> {
    render() {
        return (
            <AppContainer>
                <Button
                    onPress={() => this.props.navigation.navigate(Routes.camera,{
                        imageUrl: 'https://i.imgur.com/etjgJ2D.jpg',
                        imageDimension: [100,100]
                    })}
                    title="Camera tests"
                    color="#ff0000"
                />
            </AppContainer>
        )
    }
}
