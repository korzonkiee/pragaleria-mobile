import React, { Component } from 'react'
import { l } from '../../Services/Language';
import AppText from '../../Components/AppText';
import * as Nav from "react-navigation";
import AppHeader from '../../Components/AppHeader';
import { TextField } from 'react-native-material-textfield';
import { View, Button, TouchableWithoutFeedback } from 'react-native';
import { Black, White } from '../../Resources/Colors';
import { AppTextField, AppTextFieldComponent } from '../../Components/AppTextField';

export interface PurchaseArtworkProps {
    readonly artwork: Artwork;
    readonly author: string;
}

interface PurchaseArtworkState {
    readonly firstName: string;
    readonly lastName: string;
    readonly phoneNumber: string;

    readonly firstNameEmpty: string | undefined;
    readonly lastNameEmpty: string | undefined;
    readonly phoneNumberEmpty: string | undefined;
}

export class PurchaseArtwork extends Component<PurchaseArtworkProps & Nav.NavigationInjectedProps, PurchaseArtworkState> {
    private lastNameField: AppTextFieldComponent | null = null;
    private phoneNumberField: AppTextFieldComponent | null = null;

    constructor(props: PurchaseArtworkProps & Nav.NavigationInjectedProps) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",

            firstNameEmpty: undefined,
            lastNameEmpty: undefined,
            phoneNumberEmpty: undefined,

        };
    }
    render() {
        return (
            <View style={{
                flex: 1,
            }}>

                <AppHeader title={this.props.artwork.title}
                    rightButtonDisabled={true} />
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <View style={{
                        margin: 16
                    }}>
                        <AppTextField
                            label={l("PurchaseArtwork.FirstName")}
                            textColor={Black}
                            value={this.state.firstName}
                            onChangeText={firstName => this.setState({ firstName })}
                            onBlur={() => this.validate("firstName")}
                            onSubmitEditing={() => this.validateAndMove(this.lastNameField, "firstName")}
                            returnKeyType="next"
                            error={this.state.firstNameEmpty}
                        />
                        <AppTextField
                            ref={a => this.lastNameField = a && (a as any).getWrappedInstance()}
                            label={l("PurchaseArtwork.LastName")}
                            textColor={Black}
                            value={this.state.lastName}
                            onChangeText={lastName => this.setState({ lastName })}
                            onBlur={() => this.validate("lastName")}
                            onSubmitEditing={() => this.validateAndMove(this.phoneNumberField, "lastName")}
                            returnKeyType="next"
                            error={this.state.lastNameEmpty}
                        />
                        <AppTextField
                            ref={a => this.phoneNumberField = a && (a as any).getWrappedInstance()}
                            label={l("PurchaseArtwork.PhoneNumber")}
                            textColor={Black}
                            value={this.state.phoneNumber}
                            onChangeText={phoneNumber => this.setState({ phoneNumber })}
                            onBlur={() => this.validate("phoneNumber")}
                            returnKeyType="done"
                            error={this.state.phoneNumberEmpty}
                        />
                    </View>
                    <TouchableWithoutFeedback
                        onPress={this.purchaseArtwork}>
                        <AppText style={{ alignSelf: 'stretch', textAlign: 'center', margin: 16, padding: 16, color: White, backgroundColor: Black }}>{l("PurchaseArtwork.PurchaseButton")}</AppText>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }

    private purchaseArtwork = () => {
        console.log("Purchase artwork.")
    }

    private validate = <K extends keyof PurchaseArtworkState>(...fields: K[]) => {
        fields.forEach(field => {
            if (field == "firstName") {
                if (this.state.firstName.length === 0) {
                    this.setState({ firstNameEmpty: l("PurchaseArtwork.Validation.FirstName.Empty") })
                    return;
                } else {
                    this.setState({ firstNameEmpty: undefined })
                }
            }

            if (field == "lastName") {
                if (this.state.lastName.length === 0) {
                    this.setState({ lastNameEmpty: l("PurchaseArtwork.Validation.LastName.Empty") })
                    return;
                } else {
                    this.setState({ lastNameEmpty: undefined })
                }
            }

            if (field == "phoneNumber") {
                if (this.state.phoneNumber.length === 0) {
                    this.setState({ phoneNumberEmpty: l("PurchaseArtwork.Validation.PhoneNumber.Empty") })
                    return;
                } else {
                    this.setState({ phoneNumberEmpty: undefined })
                }
            }
        });
    }

    private validateAndMove = <K extends keyof PurchaseArtworkState>(nextField: AppTextFieldComponent | null, ...fields: K[]) => {
        this.validate(...fields);
        if (nextField) {
            nextField.focus();
        }
    }
}
