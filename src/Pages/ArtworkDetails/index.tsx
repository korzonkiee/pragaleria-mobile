import React, { Component } from 'react'
import AppContainer from '../../Components/AppContainer';
import { Text, Image, View} from "react-native";
import styles from "./styles";
import AppHeader from '../../Components/AppHeader';
import Logger from '../../Services/Logger';
import DataNotFound from '../../Components/DataNotFound';
import { l } from '../../Services/Language';
import FadeIn from 'react-native-fade-in-image';
import WebViewCustomized from '../../Components/WebViewCustomized/WebViewCustomized';
import { DefaultAppFont } from '../../Styles/Fonts';
import AppText from '../../Components/AppText';


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
                    <Image style={styles.artworkFullImage}
                           source={{uri: this.props.artwork.image_original}}
                           resizeMode="contain" />
                </FadeIn>
                <View style={{margin: 8}}>
                    {this.props.artwork.year.length > 0 && <AppText>{l("Artwork.Year")}: {this.props.artwork.year}</AppText>}
                    {this.props.artwork.sold && <AppText>{l("Artwork.Price")}: {this.props.artwork.sold_price}</AppText>}
                </View>
                <WebViewCustomized font={DefaultAppFont} innerHtml={this.props.artwork.description} />
            </AppContainer>
            )
        } else {
            return <DataNotFound retry={() => {}} message={l("Common.ApplicationError")} />;
        }
    }
}
