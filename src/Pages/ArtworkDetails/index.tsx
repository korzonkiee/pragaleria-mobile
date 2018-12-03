import React, {Component} from 'react'
import AppContainer from '../../Components/AppContainer';
import {Button, Image, View} from "react-native";
import styles from "./styles";
import AppHeader from '../../Components/AppHeader';
import DataNotFound from '../../Components/DataNotFound';
import {l} from '../../Services/Language';
import FadeIn from 'react-native-fade-in-image';
import AppText from '../../Components/AppText';
import * as Routes from "../../Routes";
import * as Nav from "react-navigation";
import { Black } from '../../Resources/Colors';


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
                    {this.props.artwork.meta.dimension.length < 3 ?
                        <View style={{width: 200}}><Button
                            onPress={() => this.navigateCamera(this.props.artwork.image_original, this.props.artwork.meta.dimension)}
                            title={l("Artwork.VirtuallyHang")}
                        /></View>
                        : <View/>}
                    <AppText style={{color: Black}}>
                        {this.props.artwork.description}
                    </AppText>
                </AppContainer>
            )
        } else {
            return <DataNotFound retry={() => {
            }} message={l("Common.ApplicationError")}/>;
        }
    }

    private navigateCamera = (imageUrl: string, imageDimension: [number, number]) => {
        this.props.navigation.navigate(Routes.camera, {
            imageUrl: imageUrl,
            imageDimension: imageDimension
        });
    }
}
