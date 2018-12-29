import React, { Component } from 'react'
import AppContainer from '../../Components/AppContainer';
import { Button, Image, View, ScrollView, ImageBackground, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles from "./styles";
import AppHeader from '../../Components/AppHeader';
import DataNotFound from '../../Components/DataNotFound';
import { l } from '../../Services/Language';
import FadeIn from 'react-native-fade-in-image';
import AppText from '../../Components/AppText';
import * as Routes from "../../Routes";
import * as Nav from "react-navigation";
import { Black, White, LightGrayHidden } from '../../Resources/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import { responsiveFontSize } from '../../Styles/Dimensions';


export interface ArtworkDetailsProps {
    readonly artwork: Artwork | null;
}

export class ArtworkDetails extends Component<ArtworkDetailsProps & Nav.NavigationInjectedProps> {
    render() {
        let { artwork } = this.props;
        if (artwork) {
            return (<AppContainer style={{ flex: 1 }}>
                <AppHeader
                    title={artwork.title}
                    modalContent={
                        <ScrollView style={{ margin: 8 }}>
                            {artwork.year && artwork.year.length > 0 &&
                                <AppText style={{ color: Black }}>
                                    Wyprodukowano w {artwork.year} roku
                                </AppText>
                            }
                            {artwork.sold &&
                                <AppText style={{ marginTop: 4, color: Black, }}>
                                    Sprzedano za {artwork.sold_price} PLN
                                </AppText>
                            }
                            <AppText style={{ marginTop: 4, color: Black, textAlign: 'justify' }}>
                                Opis: {artwork.description}
                            </AppText>
                        </ScrollView>
                    }
                    withBackground />
                <FadeIn style={styles.artworkFullResImage} renderPlaceholderContent={(
                    <Image style={{ flex: 1 }} source={{ uri: artwork.image_medium_thumbnail || artwork.image_thumbnail }}
                        blurRadius={2} />
                )}>
                    <ImageBackground style={styles.artworkFullImage}
                        source={{
                            uri: artwork.image_medium || artwork.image_large || artwork.image_original
                        }}
                        resizeMode="contain">
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: LightGrayHidden,
                                    alignSelf: 'flex-end',
                                    margin: 8,
                                    paddingVertical: 8,
                                    paddingHorizontal: 24,
                                    borderRadius: 10
                                }}
                                onPress={() => this.navigateCamera(artwork!.image_original, artwork!.meta.dimension)}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <AppText style={{
                                        color: White,
                                        fontSize: responsiveFontSize(2),
                                        textAlign: 'right',
                                    }}>
                                        {l("Artwork.ImageHang")}
                                    </AppText>
                                    <View style={{ marginLeft: 8 }}>
                                        <Icon name="camera" size={responsiveFontSize(2)} color={White} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {artwork.meta.dimension.length < 3 && artwork.sold === false ?
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: LightGrayHidden,
                                        alignSelf: 'flex-end',
                                        margin: 8,
                                        paddingVertical: 8,
                                        paddingHorizontal: 24,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => this.purchaseArtwork()}>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <AppText style={{
                                            color: White,
                                            fontSize: responsiveFontSize(2),
                                            textAlign: 'right',
                                        }}>
                                            {l("Artwork.ImageBuy")}
                                        </AppText>
                                        <View style={{ marginLeft: 8 }}>
                                            <Icon name="price-tag" size={responsiveFontSize(2)} color={White} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                : <View />}
                        </View>
                    </ImageBackground>
                </FadeIn>
            </AppContainer>
            )
        } else {
            return <DataNotFound retry={() => {
            }} message={l("Common.ApplicationError")} />;
        }
    }

    private navigateCamera = (imageUrl: string, imageDimension: [number, number]) => {
        this.props.navigation.navigate(Routes.Camera, {
            imageUrl: imageUrl,
            imageDimension: imageDimension
        });
    }

    private purchaseArtwork = () => {
        this.props.navigation.navigate(Routes.PurchaseArtwork, {
            artwork: this.props.artwork
        })
    }
}
