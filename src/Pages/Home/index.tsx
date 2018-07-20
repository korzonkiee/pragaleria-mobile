import React from 'react'
import { Text, View, Button } from 'react-native'
import { updateCounter } from '../../Modules/Home';
import styles from './styles';
import AppContainer from '../../Components/AppContainer';
import { NavigationDrawerScreenOptions } from 'react-navigation';

export interface HomeProps {
    readonly counter: number;
    readonly updateCounter: () => void;
}

export function Home(props: HomeProps) {
    return <AppContainer style={styles.container}>
        <Text style={styles.title}>Counter: {props.counter}</Text>
        <Button onPress={props.updateCounter} title="Increment"></Button>
    </AppContainer >
}
