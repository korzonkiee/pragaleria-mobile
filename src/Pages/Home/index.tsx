import React from 'react'
import { Text } from 'react-native'
import AppContainer from '../../Components/AppContainer';

export interface HomeProps {
}

export function Home(props: HomeProps) {
    return <AppContainer>
        <Text>Home</Text>
    </AppContainer >
}
