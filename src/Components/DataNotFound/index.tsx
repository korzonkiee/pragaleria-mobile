import * as React from "react";
import { Text, TextProps } from "react-native";
import AppText from "../AppText";
import { responsiveFontSize, responsiveWidth } from "../../Styles/Dimensions";

// import font from "../../Helpers/Fonts";

interface DataNotFoundProps extends TextProps {
    message: string
}

export default class DataNotFound extends React.Component<DataNotFoundProps> {
    render() {
        return <AppText style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
            margin: responsiveWidth(3),
            fontSize: responsiveFontSize(3.5)}}>{this.props.message}</AppText>;
    }
}
