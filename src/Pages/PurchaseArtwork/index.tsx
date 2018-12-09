import React, { Component } from 'react'
import { l } from '../../Services/Language';
import AppText from '../../Components/AppText';
import * as Nav from "react-navigation";


export interface PurchaseArtworkProps {
    readonly artwork: Artwork | null;
}

export class PurchaseArtwork extends Component<PurchaseArtworkProps & Nav.NavigationInjectedProps> {
    render() {
        return <AppText>Purchase artwork {this.props.artwork!.id}</AppText>
    }
}
