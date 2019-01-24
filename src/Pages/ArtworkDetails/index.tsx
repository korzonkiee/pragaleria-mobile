import React, { Component } from 'react';
import { ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import * as Nav from "react-navigation";
import AppContainer from '../../Components/AppContainer';
import AppHeader from '../../Components/AppHeader';
import AppText from '../../Components/AppText';
import DataNotFound from '../../Components/DataNotFound';
import { Black, LightBlack, LightGray, LightGrayHidden, White } from '../../Resources/Colors';
import * as Routes from "../../Routes";
import { l } from '../../Services/Language';
import { responsiveFontSize } from '../../Styles/Dimensions';
import styles from "./styles";


export interface ArtworkDetailsProps {
    readonly artistId: number | null;
    readonly artwork: Artwork | CatalogItem | null;
}

export class ArtworkDetails extends Component<ArtworkDetailsProps & Nav.NavigationInjectedProps> {
    render() {
        const { artwork } = this.props;

        if (artwork) {
            return (<AppContainer style={{ flex: 1 }}>
                <AppHeader withBackground
                    title={artwork.title}
                    modalContent={
                        <ScrollView style={{ margin: 8 }}>
                            {artwork.year !== undefined && artwork.year !== "" && artwork.year.length > 0 &&
                                <AppText style={{ color: Black }}>
                                    Wyprodukowano w {artwork.year} roku
                                </AppText>
                            }

                            {artwork.sold &&
                                <AppText style={{ marginTop: 4, color: Black, }}>
                                    Sprzedano za {artwork.sold_price} PLN
                                </AppText>
                            }

                            {!artwork.sold && artwork.initial_price !== "" &&
                                <AppText style={{ marginTop: 4, color: Black, }}>
                                    Cena wywoławcza: {artwork.initial_price} PLN
                                </AppText>
                            }

                            {<AppText style={{ marginTop: 4, color: Black, textAlign: 'justify' }}>
                                Opis: {artwork.description}
                            </AppText>}
                        </ScrollView>
                    }
                />
                {this.renderFullScreenImageView(artwork)}
            </AppContainer>
            )
        } else {
            return <DataNotFound retry={() => {
            }} message={l("Common.ApplicationError")} />;
        }
    }

    private navigateToCamera = (imageUrl: string, imageDimension: [number, number]) => {
        this.props.navigation.push(Routes.Camera, {
            imageUrl: imageUrl,
            imageDimension: imageDimension
        });
    }

    private purchaseArtwork = () => {
        this.props.navigation.push(Routes.PurchaseArtwork, {
            artwork: this.props.artwork
        })
    }

    private navigateToArtist = () => {
        this.props.navigation.push(Routes.ArtistDetails, {
            artistId: this.props.artistId
        });
    }

    private renderFullScreenImageView = (artwork: Artwork) => {
        return (<ImageBackground style={{ flex: 1 }} source={{ uri: artwork.image_medium_thumbnail || artwork.image_thumbnail }}
            blurRadius={2}>
            <ImageBackground style={styles.artworkFullImage}
                source={{
                    uri: artwork.image_medium || artwork.image_large || artwork.image_original
                }}
                resizeMode="contain">
                {this.props.artistId !== undefined && <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: White,
                        borderBottomColor: LightGray,
                        borderBottomWidth: 1,
                        alignItems: 'center',
                        zIndex: 999,
                    }} onPress={() => this.navigateToArtist()}>
                        <AppText style={{
                            color: LightBlack,
                            textAlign: 'center',
                            marginVertical: 8,
                            fontSize: responsiveFontSize(2.1),
                        }}>
                            {artwork.author} <Icon name={"chevron-with-circle-right"} size={responsiveFontSize(2.4)} />
                        </AppText>
                    </TouchableOpacity>
                </View>}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {artwork.meta.dimension.length < 3 ? <TouchableOpacity
                        style={{
                            backgroundColor: LightGrayHidden,
                            alignSelf: 'flex-end',
                            margin: 8,
                            paddingVertical: 8,
                            paddingHorizontal: 24,
                            borderRadius: 10
                        }}
                        onPress={() => this.navigateToCamera(artwork!.image_original, artwork!.meta.dimension)}>
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
                    </TouchableOpacity> : <View />}
                    {!artwork.sold ?
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
        </ImageBackground>
        );
    }
}
