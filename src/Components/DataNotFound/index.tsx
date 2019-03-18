import * as React from "react";
import { TextProps, TouchableWithoutFeedback } from "react-native";
// import font from "../../Helpers/Fonts";
import { Black } from '../../Resources/Colors';
import { responsiveFontSize } from "../../Styles/Dimensions";
import AppText from "../AppText";


interface DataNotFoundProps extends TextProps {
    readonly message: string
    readonly retry?: () => void;
}

export default class DataNotFound extends React.Component<DataNotFoundProps> {
    render() {
        return (<TouchableWithoutFeedback onPress={this.props.retry}>
            <AppText style={{
                margin: 16,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: Black,
                fontSize: responsiveFontSize(2)
            }}>
                {this.props.message}
            </AppText>
        </TouchableWithoutFeedback>);
    }
}
