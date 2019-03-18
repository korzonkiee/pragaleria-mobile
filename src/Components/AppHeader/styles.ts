import { StyleSheet } from "react-native";

import { responsiveHeight, responsiveFontSize } from "../../Styles/Dimensions";
import { styleForIOS } from "../../Helpers/PhoneHelpers";
import font from "../../Styles/Fonts";
import { Black, LightGray, DirtyWhite } from '../../Resources/Colors';

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
        borderBottomWidth: 1,
        borderBottomColor: LightGray
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
        color: Black,
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
        color: Black,
        fontSize: responsiveFontSize(3.3)
    },
    titleText: {
        color: Black,
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
        color: Black,
        fontSize: responsiveFontSize(1.8),
        ...font({ family: "Montserrat" }),
        includeFontPadding: false
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: DirtyWhite,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 8
    },
});
