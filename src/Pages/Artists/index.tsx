import React, {Component} from 'react'
import {FlatList, Text} from 'react-native'
import AppContainer from '../../Components/AppContainer';
import {Artist} from "../../Modules/Artists";


export interface ArtistsProps {
    artists: [Artist]
    getArtists: Function
}

export class Artists extends Component<ArtistsProps> {
    componentDidMount() {
        this.props.getArtists();
    }

    render() {
        return (
            <AppContainer>
                <Text>Artists</Text>
                <FlatList
                    data={this.props.artists}
                    renderItem={({item}) => <Text>{item.toString()}</Text>} // TODO nice rendering with styles
                />
            </AppContainer>
        )
    }
}
