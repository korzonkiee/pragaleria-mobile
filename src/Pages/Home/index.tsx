import React, {Component} from 'react'
import AppContainer from '../../Components/AppContainer';
import AppText from '../../Components/AppText';

export interface HomeProps {
}

export function Home(_: HomeProps) {
    return <AppContainer>
        <AppText>Home</AppText>
    </AppContainer>
}
