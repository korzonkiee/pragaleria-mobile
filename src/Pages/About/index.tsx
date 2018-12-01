import React, {Component} from 'react'
import {View, ScrollView, Linking} from 'react-native'
import AppContainer from '../../Components/AppContainer';
import AppText from "../../Components/AppText";
import Icon from 'react-native-vector-icons/Entypo';
import styles from "./styles";
import {responsiveFontSize} from '../../Styles/Dimensions';
import { Black } from '../../Resources/Colors';
import ViewMoreText from 'react-native-view-more-text';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export interface AboutProps {
}


export class About extends Component<AboutProps> {
    private renderViewMore = (onPress: any) =>
        (<Icon onPress={onPress} name="chevron-thin-down" size={responsiveFontSize(3)} color={Black} />)

    private subtitleContainer = (subtitle: string, subtitleItems: any) =>
        (
            <View style={styles.subtitleContainer}>
                <AppText style={styles.subtitle}>{subtitle}</AppText>
                {subtitleItems.map((item: any, i: number) =>
                    <AppText style={{color: Black}} key={i}>
                        {item[0]}<AppText style={{fontWeight: 'bold', color: Black}}>{item[1]}</AppText>
                    </AppText>
                )}
            </View>
        )

    private onInstagramPress = () => {
        Linking.openURL('https://www.instagram.com/pragaleria/');
    }

    private onFacebookPress = () => {
        Linking.openURL('https://www.facebook.com/pragaleria/');
    }

    render() {
        return (
            <AppContainer style={styles.container}>
                <View style={styles.titleContainer}>
                    <AppText style={styles.title}>O nas</AppText>
                    <Icon style={styles.link} name="instagram-with-circle" size={responsiveFontSize(4)} color="#e1306c" onPress={this.onInstagramPress}/>
                    <Icon style={styles.link} name="facebook-with-circle" size={responsiveFontSize(4)} color="#3b5998" onPress={this.onFacebookPress}/>
                </View>
                <View style ={styles.container}>
                    <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    }}
                    region={{
                        latitude: 52.258540,
                        longitude: 21.036110,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    >
                        <Marker coordinate={{
                            latitude: 52.258540,
                            longitude: 21.036110,
                        }}/>
                    </MapView>
                </View>
                <ScrollView style={styles.content}>
                    {this.subtitleContainer(
                        "Kontakt",
                        [
                            ["Adres: ", "Stalowa 3, 03-425 Warszawa"],
                            ["Telefon: ", "Mikołaj Konopacki +48 884 79 88 52"],
                            ["E-mail: ", "info@pragaleria.pl"],
                        ]
                    )}
                    {this.subtitleContainer(
                        "Godziny Otwarcia",
                        [
                            ["Poniedziałek - piątek: ", "12:00 - 19:00"],
                            ["Sobota: ", "11:00 - 16:00"],
                        ]
                    )}
                    <ViewMoreText numberOfLines={1} renderViewMore={this.renderViewMore}>
                        <AppText style={styles.paragraph}>
                            Pragaleria działa od marca 2015 roku i znajduje się na warszawskiej Pradze, niedaleko stacji Metro Dworzec Wileński.
                            Profil galerii koncertuje się na szeroko pojętej sztuce współczesnej, ze szczególnym uwzględnieniem grafiki, zarówno
                            w jej wydaniu cyfrowym, jak i tradycyjnym. Ten kierunek obrazują jej dwie pierwsze indywidualne wystawy: „1920 +”
                            Jakuba Różalskiego – przykład malarstwa cyfrowego oraz „Akwaforta towarzyska” Kacpra Bożka – przykład użycia klasycznej
                            techniki grafiki warsztatowej. W Pragalerii prezentowane są również wystawy malarstwa od streetartu, poprzez malarstwo figuratywne,
                            aż do abstrakcji.Pragaleria jest miejscem organizacji regularnych aukcji dzieł sztuki współczesnej.
                            Co dwa miesiące prezentowane są tu wystawy przedaukcyjne z cyklu Młoda Sztuka i Sztuka Aktualna,
                            a także wystawy tematyczne m.in.: grafika cyfrowa, komiks streetart, ilustracja i fotografia.
                            To pierwsza i jedyna galeria w Polsce prezentująca prace z kategorii game-development.
                        </AppText>
                    </ViewMoreText>
                </ScrollView>
            </AppContainer>
        )
    }
}