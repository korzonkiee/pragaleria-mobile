import React, { Component } from 'react';
import AppContainer from '../../Components/AppContainer';

export interface ArtworksProps {
}


export class Artworks extends Component<ArtworksProps> {
    render() {
        return (
            <AppContainer style={{
                backgroundColor: 'blue',
                height: 250
            }}>

            </AppContainer>
        )
    }
}