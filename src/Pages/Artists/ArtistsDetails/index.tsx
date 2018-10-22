import React, { Component } from 'react'
import * as Nav from "react-navigation";
import { FlatList, Image, Text, StyleSheet, TouchableWithoutFeedback, View, ImageBackground } from 'react-native'
import AppContainer from '../../../Components/AppContainer';
import styles from "./styles";
import { Artist } from "../../../Models/Artist";


export interface ArtistsDetailsProps {
    // artists: Artist[]
    // getArtists: () => void
}

export class ArtistDetails extends Component<ArtistsDetailsProps> {
    componentDidMount() {
        // this.props.getArtists();
    }

    render() {
        return (
            <AppContainer>
                <Text>Artist</Text>
            </AppContainer>
        )
    }
}
