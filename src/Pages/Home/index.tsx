import React from 'react'
import { Text, View, Button } from 'react-native'
import { updateCounter } from '../../Modules/Home';

export interface HomeProps {
    readonly counter: number;
    readonly updateCounter: () => void;
}

export function Home(props: HomeProps) {
    return <View>
        <Text>Counter: {props.counter}</Text>
        <Button onPress={props.updateCounter} title="Increment"></Button>
    </View >
}
