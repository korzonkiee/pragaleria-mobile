import * as React from "react";
import { Text, TextProps, TouchableWithoutFeedback } from "react-native";
import AppText from "../AppText";
import { responsiveFontSize, responsiveWidth } from "../../Styles/Dimensions";

// import font from "../../Helpers/Fonts";
import { Black } from '../../Resources/Colors';

interface DataNotFoundProps extends TextProps {
    readonly message: string
    readonly retry: () => void;
}

export default class DataNotFound extends React.Component<DataNotFoundProps> {
    render() {
        return (<TouchableWithoutFeedback onPress={this.props.retry}>
            <AppText style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                textAlignVertical: 'center',
                color: Black,
                margin: responsiveWidth(3),
                fontSize: responsiveFontSize(3.5)}}>
                    {this.props.message}
            </AppText>
        </TouchableWithoutFeedback>);
    }
}
