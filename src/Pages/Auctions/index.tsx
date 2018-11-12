import React from 'react'
import { Text } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import AppText from '../../Components/AppText';

export interface AuctionsProps {
}

export function Auctions(props: AuctionsProps) {
    return <AppContainer>
        <AppText>Auctions</AppText>
    </AppContainer >
}
