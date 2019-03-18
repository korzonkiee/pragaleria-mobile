import React, { Component } from 'react';
import { AsyncStorage, TouchableWithoutFeedback, View } from 'react-native';
import Mailer from 'react-native-mail';
import * as Nav from "react-navigation";
import AppHeader from '../../Components/AppHeader';
import AppText from '../../Components/AppText';
import { AppTextField, AppTextFieldComponent } from '../../Components/AppTextField';
import { Black, White } from '../../Resources/Colors';
import { l } from '../../Services/Language';

export interface PurchaseArtworkProps {
    readonly artwork: Artwork;
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

    async componentDidMount() {
        const firstName = await AsyncStorage.getItem("firstName");
        const lastName = await AsyncStorage.getItem("lastName");
        const phoneNumber = await AsyncStorage.getItem("phoneNumber");

        if (firstName && lastName && phoneNumber) {
            this.setState({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
            });
        }
    }

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
                            keyboardType="phone-pad"
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
        if (!this.validate("firstName", "lastName", "phoneNumber")) {
            return;
        }

        AsyncStorage.setItem("firstName", this.state.firstName);
        AsyncStorage.setItem("lastName", this.state.lastName);
        AsyncStorage.setItem("phoneNumber", this.state.phoneNumber);

        Mailer.mail({
            subject: `Oferta kupna obrazu "${this.props.artwork.title}" ${this.props.artwork.author}`,
            recipients: ['info@pragaleria.pl'],
            body: `<p>
                Imię: ${this.state.firstName} <br>
                Nazwisko: ${this.state.lastName} <br>
                Numer telefonu: ${this.state.phoneNumber} <br>
                <br><br>
                Dodatkowe informacje: <br>
                Identyfikator dzieła: ${this.props.artwork.id} <br>
                Tytuł dzieła: ${this.props.artwork.title} <br>
                Autor dzieła: ${this.props.artwork.author} <br>
            </p>`,
            isHTML: true
        }, () => { });

    }

    private validate = <K extends keyof PurchaseArtworkState>(...fields: K[]): boolean => {
        let successfull = true;
        fields.forEach(field => {
            if (field == "firstName") {
                if (this.state.firstName.length === 0) {
                    successfull = false;
                    this.setState({ firstNameEmpty: l("PurchaseArtwork.Validation.FirstName.Empty") })
                    return;
                } else {
                    this.setState({ firstNameEmpty: undefined })
                }
            }

            if (field == "lastName") {
                if (this.state.lastName.length === 0) {
                    successfull = false;
                    this.setState({ lastNameEmpty: l("PurchaseArtwork.Validation.LastName.Empty") })
                    return;
                } else {
                    this.setState({ lastNameEmpty: undefined })
                }
            }

            if (field == "phoneNumber") {
                if (this.state.phoneNumber.length === 0) {
                    successfull = false;
                    this.setState({ phoneNumberEmpty: l("PurchaseArtwork.Validation.PhoneNumber.Empty") })
                    return;
                } else {
                    this.setState({ phoneNumberEmpty: undefined })
                }
            }
        });

        return successfull;
    }

    private validateAndMove = <K extends keyof PurchaseArtworkState>(nextField: AppTextFieldComponent | null, ...fields: K[]) => {
        this.validate(...fields);
        if (nextField) {
            nextField.focus();
        }
    }
}
