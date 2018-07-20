import React from 'react'
import { Text, View, Button } from 'react-native'
import { updateCounter } from '../../Modules/Home';
import styles from './styles';

export interface HomeProps {
    readonly counter: number;
    readonly updateCounter: () => void;
}

export function Home(props: HomeProps) {
    return <View style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>Counter: {props.counter}</Text>
            <Button onPress={props.updateCounter} title="Increment"></Button>
        </View>
    </View >
}
