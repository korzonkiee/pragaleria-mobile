import React, { Component } from 'react';
import * as Nav from "react-navigation";
import AppContainer from '../../Components/AppContainer';
import DataNotFound from '../../Components/DataNotFound';
import { ExhibitionsTabBar } from '../../Components/ExhibitionsTabBar';
import ExhibitionsPlaceholder from '../../Components/Placeholders/ExhibitionsPlaceholder';
import { DirtyWhite } from '../../Resources/Colors';
import { l } from '../../Services/Language';


export interface ExhibitionsProps {
    readonly exhibitions: ExhibitionsData;
    readonly getExhibitions: () => void;
}

export class Exhibitions extends Component<ExhibitionsProps & Nav.NavigationInjectedProps> {
    constructor(props: ExhibitionsProps & Nav.NavigationInjectedProps) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.exhibitions.loading) {
            this.props.getExhibitions();
        }
    }

    render() {
        const exhibitionsData = this.props.exhibitions.data;
        if (this.props.exhibitions.loading) {
            return <ExhibitionsPlaceholder />
        }

        if (!this.props.exhibitions.loading && this.props.exhibitions.data.length === 0) {
            return (<DataNotFound
                message={l("Common.GenericErrorMessageWithRetry")}
                retry={this.props.getExhibitions} />)
        }

        const currentExhibitions = exhibitionsData.filter(exhibition => {
            return exhibition.is_current;
        });

        const closedExhibitions = exhibitionsData.filter(exhibition => {
            return !exhibition.is_current;
        });

        return (
            <AppContainer style={{
                flex: 1,
                backgroundColor: DirtyWhite,
            }}>
                <ExhibitionsTabBar navigation={this.props.navigation}
                    incomingExhibitions={currentExhibitions}
                    closedExhibitions={closedExhibitions} />
            </AppContainer>
        )
    }
}
