import React, {Component} from 'react'
import AppContainer from '../../Components/AppContainer';
import {Text, Image, View, Button} from "react-native";
import styles from "./styles";
import AppHeader from '../../Components/AppHeader';
import Logger from '../../Services/Logger';
import DataNotFound from '../../Components/DataNotFound';
import {l} from '../../Services/Language';
import FadeIn from 'react-native-fade-in-image';
import WebViewCustomized from '../../Components/WebViewCustomized/WebViewCustomized';
import {DefaultAppFont} from '../../Styles/Fonts';
import AppText from '../../Components/AppText';
import * as Routes from "../../Routes";
import * as Nav from "react-navigation";


export interface ArtworkDetailsProps {
    readonly artwork: Artwork | null;
}

export class ArtworkDetails extends Component<ArtworkDetailsProps & Nav.NavigationInjectedProps> {
    render() {
        if (this.props.artwork) {
            return (<AppContainer style={{flex: 1}}>
                    <AppHeader
                        title={this.props.artwork.title}
                        withBackground/>
                    <FadeIn style={styles.artworkFullResImage} renderPlaceholderContent={(
                        <Image style={{flex: 1}} source={{uri: this.props.artwork.image_thumbnail}}
                               blurRadius={2}/>
                    )}>
                        <Image style={styles.artworkFullImage}
                               source={{uri: this.props.artwork.image_original}}
                               resizeMode="contain"/>
                    </FadeIn>
                    <View style={{margin: 8}}>
                        {this.props.artwork.year.length > 0 &&
                        <AppText>{l("Artwork.Year")}: {this.props.artwork.year}</AppText>}
                        {this.props.artwork.sold &&
                        <AppText>{l("Artwork.Price")}: {this.props.artwork.sold_price}</AppText>}
                    </View>
                    {this.props.artwork.meta.dimension.length < 3 ? <Button
                        onPress={() => this.navigateCamera(this.props.artwork.image_original, this.props.artwork.meta.dimension)}
                        title="Przypasuj obraz."
                        color="#ff0000"
                    /> : <View/>}
                    <WebViewCustomized font={DefaultAppFont} innerHtml={this.props.artwork.description}/>
                </AppContainer>
            )
        } else {
            return <DataNotFound retry={() => {
            }} message={l("Common.ApplicationError")}/>;
        }
    }

    private navigateCamera = (image_url: string, dimension: [number, number]) => {
        this.props.navigation.navigate(Routes.camera, {
            image_url: image_url,
            dimension: dimension
        });
    }
}
