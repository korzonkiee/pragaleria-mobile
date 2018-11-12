import React, { Component } from 'react'
import AppContainer from '../../Components/AppContainer';
import { Text, Image} from "react-native";
import styles from "./styles";
import AppHeader from '../../Components/AppHeader';
import Logger from '../../Services/Logger';
import DataNotFound from '../../Components/DataNotFound';
import { l } from '../../Services/Language';
import FadeIn from 'react-native-fade-in-image';


export interface ArtworkDetailsProps {
    readonly artwork: Artwork | null;
}

export class ArtworkDetails extends Component<ArtworkDetailsProps> {
    render() {
        if (this.props.artwork) {
            return (<AppContainer style={{flex: 1}}>
                <AppHeader
                    title={this.props.artwork.title}
                    withBackground />
                <FadeIn style={styles.artworkFullResImage} renderPlaceholderContent={(
                    <Image style={{flex: 1}} source={{uri: this.props.artwork.image_thumbnail}}
                        blurRadius={2} />
                )}>
                    <Image style={{flex: 1}} source={{uri: this.props.artwork.image_original}} />
                </FadeIn>
            </AppContainer>
            )
        } else {
            return <DataNotFound retry={() => {}} message={l("Common.ApplicationError")} />;
        }
    }
}

