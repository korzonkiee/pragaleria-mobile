import * as React from "react";
import { TextField, TextFieldProps } from "react-native-material-textfield";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import * as colors from "../../Resources/Colors";
import { responsiveFontSize } from "../../Styles/Dimensions";
import { isAndroid } from "../../Helpers/PhoneHelpers";
import font from "../../Styles/Fonts";
import { Black } from "../../Resources/Colors";

export interface AppTextFieldStateProps {
    readonly isLoading: boolean;
}

interface AppTextFieldProps {
    readonly passwordField?: boolean;
    readonly darkTheme?: boolean;
}

interface AppTextFieldState {
    readonly secureTextEntry: boolean;
    readonly fieldFocused: boolean;
    readonly baseColor: string;
    readonly activeColor: string;
}

export class AppTextField extends React.PureComponent<AppTextFieldStateProps & AppTextFieldProps & TextFieldProps, AppTextFieldState> {
    private field: TextField | null = null;

    constructor(props: AppTextFieldStateProps & AppTextFieldProps & TextFieldProps) {
        super(props);

        this.state = {
            secureTextEntry: this.props.passwordField !== undefined,
            fieldFocused: false,
            baseColor: colors.BlackTransparent,
            activeColor: Black
        };
    }

    focus() {
        this.field && (this.field as any).focus();
    }

    private renderPasswordAccessory = () => {
        return (
            <MaterialIcon
                size={responsiveFontSize(3.5)}
                name={this.state.secureTextEntry ? "visibility-off" : "visibility"}
                color={this.state.fieldFocused ? this.state.activeColor : this.state.baseColor}
                onPress={this.onPasswordAccessoryPressed}
                suppressHighlighting
            />
        );
    }

    private onPasswordAccessoryPressed = () => {
        this.setState({ secureTextEntry: !this.state.secureTextEntry });
    }

    render() {
        return <TextField
            ref={a => this.field = a}
            {...this.props}
            disabled={this.props.disabled || this.props.isLoading}
            style={[this.props.style, { ...font({ family: "Montserrat" }), includeFontPadding: false }]}
            labelTextStyle={isAndroid() && { marginTop: -6 }}
            autoCapitalize="none"
            textColor={this.state.activeColor}
            baseColor={this.state.baseColor}
            tintColor={this.state.activeColor}
            secureTextEntry={this.props.passwordField ? this.state.secureTextEntry : this.props.secureTextEntry}
            fontSize={this.props.fontSize || responsiveFontSize(2.3)}
            labelFontSize={this.props.labelFontSize || responsiveFontSize(1.8)}
            onFocus={e => { this.setState({ fieldFocused: true }); this.props.onFocus && this.props.onFocus(e); }}
            onBlur={e => { this.setState({ fieldFocused: false }); this.props.onBlur && this.props.onBlur(e); }}
            renderAccessory={this.props.passwordField ? this.renderPasswordAccessory : undefined} />;
    }
}
