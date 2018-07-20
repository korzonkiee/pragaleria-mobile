import { Platform, Dimensions, ImageStyle, ViewStyle, TextStyle } from "react-native";

export function isIOS() {
    return Platform.OS === "ios";
}

export function isIphoneX() {
    const dimen = Dimensions.get("window");
    return (
        Platform.OS === "ios" &&
        (dimen.height === 812 || dimen.width === 812)
    );
}

export function getStatusBarHeight(safe: boolean) {
    return Platform.select({
        ios: isIphoneX() ? (safe ? 44 : 30) : 20,
        android: 0
        // android: StatusBar.currentHeight
    });
}

export function styleForIOS(styles: ViewStyle | TextStyle | ImageStyle) {
    if (Platform.OS === "ios") {
        return styles;
    }
    return {};
}

export function isAndroid() {
    return Platform.OS === "android";
}

export function styleForAndroid(styles: ViewStyle | TextStyle | ImageStyle) {
    if (Platform.OS === "android") {
        return styles;
    }
    return {};
}
