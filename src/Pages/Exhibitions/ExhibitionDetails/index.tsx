import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import * as Nav from "react-navigation";
import AppContainer from '../../../Components/AppContainer';
import AppHeader from '../../../Components/AppHeader';
import AppText from '../../../Components/AppText';
import DataNotFound from '../../../Components/DataNotFound';
import ArtistDetailsPlaceholder from '../../../Components/Placeholders/ArtistDetailsPlaceholder';
import { SwitchGridCarousel } from '../../../Components/SwitchGridCarousel';
import { Black } from '../../../Resources/Colors';
import { l } from '../../../Services/Language';


export interface ExhibitionDetailsProps {
    readonly exhibition: Exhibition;
    readonly catalog: CatalogData;
    readonly getExhibitionsDetails: () => void;
}

export class ExhibitionDetails extends Component<ExhibitionDetailsProps & Nav.NavigationInjectedProps> {
    componentDidMount() {
        if (!this.props.catalog) {
            this.props.getExhibitionsDetails();
        }
    }

    render() {
        const { exhibition, catalog } = this.props;

        if (!catalog) {
            return null;
        }

        if (catalog.loading) {
            return <ArtistDetailsPlaceholder />
        }

        if (catalog.data == null) {
            return <DataNotFound retry={this.props.getExhibitionsDetails} message={l("Common.GenericErrorMessageWithRetry")} />
        }

        return (
            <AppContainer style={{ flex: 1 }}>
                {exhibition && catalog && <>
                    <AppHeader
                        title='Wystawa'
                        withBackground
                        modalContent={
                            <ScrollView style={{ margin: 8 }}>
                                <AppText style={{ color: Black }}>
                                    {exhibition.title}
                                </AppText>
                                <AppText style={{ color: Black }}>
                                    Rozpoczęcie: {exhibition.auction_start}
                                </AppText>
                                <AppText style={{ color: Black }}>
                                    Zakończenie: {exhibition.auction_end}
                                </AppText>
                                <AppText style={{ marginTop: 4, color: Black, textAlign: 'justify' }}>
                                    Opis: {exhibition.description_content || exhibition.description_excerpt}
                                </AppText>
                            </ScrollView>
                        } />
                    {catalog.data.length > 0 ?
                        <SwitchGridCarousel auction={exhibition} catalogItems={catalog.data} navigation={this.props.navigation} />
                        : <AppText style={{ color: Black, marginLeft: 10 }}>
                            Brak dzieł w katalogu tej wystawy, więcej informacji pod przyciskiem w prawym górnym rogu.
                    </AppText>}

                </>}
            </AppContainer>
        )
    }
}
