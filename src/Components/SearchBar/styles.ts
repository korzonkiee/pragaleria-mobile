import { StyleSheet } from "react-native";
import { styleForIOS } from "../../Helpers/PhoneHelpers";
import { Black, LightGray } from '../../Resources/Colors';
import { responsiveFontSize, responsiveHeight } from "../../Styles/Dimensions";
import font from "../../Styles/Fonts";


export const headerHeight = Math.min(responsiveHeight(8), 48); // 48
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
        justifyContent: "flex-start",
        alignSelf: "flex-start"
    },
    titleText: {
        color: Black,
        textAlign: "left",
        fontSize: responsiveFontSize(1.8),
        marginTop: 2,
        ...font(),
        ...styleForIOS({ lineHeight: headerHeight })
    },
    loadingBar: {
        height: loaderHeight,
        position: "absolute",
        bottom: -loaderHeight,
        zIndex: 100
    }
});
