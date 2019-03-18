import * as React from "react";
import { View, SafeAreaView, ViewStyle, StyleProp } from "react-native";

import * as colors from "../../Resources/Colors";
import StatusBarBackground from "../StatusBar";

interface AppContainerProps {
    statusBarHidden?: boolean;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

function AppContent(props: AppContainerProps) {
    return <View style={{ height: "100%" }}>
        <StatusBarBackground hidden={props.statusBarHidden || false} backgroundColor={colors.Main} />
        <SafeAreaView style={[{ backgroundColor: "white" }, props.style]}>
            {props.children}
        </SafeAreaView>
    </View>;
}

export default function AppContainer(props: AppContainerProps) {
    return <AppContent {...props} />
}
