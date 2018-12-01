import * as React from "react";
import { Text, TextProps } from "react-native";
import font, { DefaultFontFamily } from "../../Styles/Fonts";
import { responsiveFontSize } from "../../Styles/Dimensions";

import { LightGray } from '../../Resources/Colors';

interface AppTextProps extends TextProps {
}

export default class AppText extends React.Component<AppTextProps> {
    render() {
        return <Text
            {...this.props}
            style={[{ ...font({ family: DefaultFontFamily}), includeFontPadding: false, color: LightGray, fontSize: responsiveFontSize(2) }, this.props.style]}>
            {this.props.children}
        </Text>;
    }
}
