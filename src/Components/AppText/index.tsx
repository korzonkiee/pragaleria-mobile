import * as React from "react";
import { Text, TextProps } from "react-native";
import font from "../../Styles/Fonts";

// import font from "../../Helpers/Fonts";

interface AppTextProps extends TextProps {
}

export default class AppText extends React.Component<AppTextProps> {
    render() {
        return <Text
            {...this.props}
            style={[{ ...font({ family: "Poppins" }), includeFontPadding: false }, this.props.style]}>
            {this.props.children}
        </Text>;
    }
}
