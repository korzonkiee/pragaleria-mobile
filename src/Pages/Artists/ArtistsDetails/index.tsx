import React, { Component } from 'react'
import * as Nav from "react-navigation";
import { FlatList, Image, Text, StyleSheet, TouchableWithoutFeedback, View, ImageBackground, ActivityIndicator, WebView } from 'react-native'
import AppContainer from '../../../Components/AppContainer';
import styles from "./styles";
import { ArtworkItem } from '../../../Components/ArtworkItem';
import DataNotFound from '../../../Components/DataNotFound';
import { l } from '../../../Services/Language';
import CenteredActivityIndicator from '../../../Components/CenteredActivityIndicator';
import AppHeader from '../../../Components/AppHeader';


export interface ArtistsDetailsProps {
    readonly artist: ArtistDetailsData;
    readonly getArtistDetails: () => void;
}

export class ArtistDetails extends Component<ArtistsDetailsProps> {
    componentDidMount() {
        if (!this.props.artist || (this.props.artist.data === undefined && !this.props.artist.loading)) {
            this.props.getArtistDetails();
        }
    }

    render() {
        const artist = this.props.artist && this.props.artist.data;
        if (!this.props.artist) {
            return null;
        }

        if (this.props.artist.loading) {
            return (
                <CenteredActivityIndicator />
            );
        }
        else if (!this.props.artist.loading && this.props.artist.data == null) {
            return (<DataNotFound retry={this.props.getArtistDetails} message={l("Common.GenericErrorMessageWithRetry")}/>)
        }
        else {
            return (
                <AppContainer style={{flex: 1}}>
                    { artist && <>
                    <AppHeader
                        title={artist.name}
                        withBackground />
                    <FlatList
                        data={artist.artworks}
                        keyExtractor={(item, _) => item.id.toString()}
                        ListHeaderComponent={this.renderAristDescription()}
                        renderItem={this.renderArtwork}
                        numColumns={1} />
                    </> }
                </AppContainer>
            )
        }
    }

    private renderArtwork = ({ item, index: number }: { item: Artwork, index: number }) => {
        return (<ArtworkItem
            artwork={item} />)
    }

    private renderAristDescription = () => {
        if (this.props.artist && this.props.artist.data) {
            // let html = "<html>" +
            //     + "<head>" +
            //     + "<style type=\"text/css\">" +
            //     + "@font-face {" +
            //     + "font-family: MyFont;src: url(\"file:///android_asset/font/Poppins-Regular.ttf\")}" +
            //     + "body {font-family: MyFont;font-size: medium;text-align: justify;}" +
            //     + "</style>"
            //     + "</head>" +
            //     + "<body>" + this.props.artist.data.description + "</body>"
            //     + "</html>"
            let html = `<html>

            <head>
                <style type="text/css">
                    @font-face {
                        font-family: MyFont;
                        src: url("file:///android_asset/fonts/Poppins_Regular.ttf")
                    }

                    body {
                        font-family: MyFont;
                        font-size: medium;
                    }
                </style>
            </head>

            <body>` + this.props.artist.data.description + `</body>

            </html>`
            return <WebView style={{flex: 1, height: 240}} source={{html: html, baseUrl: ""}} />;
        } else {
            return null;
        }
    }
}
