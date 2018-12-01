declare module "react-native-fade-in-image" {
    import * as React from "react";
    import { StyleProp, ViewStyle } from "react-native";

    interface FadeInProps {
        readonly style?: StyleProp<ViewStyle>;
        readonly placeholderStyle?: StyleProp<ViewStyle>;
        readonly renderPlaceholderContent?: React.ReactElement<any>;
    }

    export default class FadeIn extends React.Component<FadeInProps> { }
}
