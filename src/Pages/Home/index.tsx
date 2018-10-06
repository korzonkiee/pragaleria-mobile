import React, {Component} from 'react'
import {Text} from 'react-native'
import AppContainer from '../../Components/AppContainer';

export interface HomeProps {
}

export function Home(_: HomeProps) {
    return <AppContainer>
        <Text>Home</Text>
    </AppContainer>
}
