import { StyleSheet } from "react-native";

import { responsiveHeight, responsiveFontSize } from "../../Styles/Dimensions";
import { styleForIOS } from "../../Helpers/PhoneHelpers";
import font from "../../Styles/Fonts";

export const headerHeight = Math.min(responsiveHeight(8.5), 56); // 56
const loaderHeight = 4;
export const errorBarHeight = responsiveHeight(4.5);

export default StyleSheet.create({
    headerContainer: {
        ...styleForIOS({ zIndex: 100 })
    },
    header: {
        width: "100%",
        height: headerHeight,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    leftButton: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    rightButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    buttonContent: {
        paddingHorizontal: 16,
        color: "white",
        alignSelf: "center",
        letterSpacing: 2,
        ...styleForIOS({ lineHeight: headerHeight })
    },
    title: {
        flex: 4,
        justifyContent: "center",
        alignSelf: "stretch"
    },
    titleIcon: {
        color: "white",
        fontSize: responsiveFontSize(3.3)
    },
    titleText: {
        color: "white",
        letterSpacing: 4,
        textAlign: "center",
        fontSize: responsiveFontSize(2.3),
        ...styleForIOS({ lineHeight: headerHeight })
    },
    loadingBar: {
        height: loaderHeight,
        position: "absolute",
        bottom: -loaderHeight,
        zIndex: 100
    },
    errorBar: {
        width: "100%",
        backgroundColor: "#cc0000",
        justifyContent: "center",
        alignItems: "center"
    },
    errorBarTitle: {
        color: "white",
        fontSize: responsiveFontSize(1.8),
        ...font({ family: "Montserrat" }),
        includeFontPadding: false
    }
});
