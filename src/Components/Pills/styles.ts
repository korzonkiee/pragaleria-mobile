import { StyleSheet } from "react-native";
import { responsiveHeight, White } from "../../Styles/Dimensions";


export const headerHeight = Math.min(responsiveHeight(8), 48); // 48
const loaderHeight = 4;
export const errorBarHeight = responsiveHeight(4.5);

export default StyleSheet.create({
    pillsContainer: {
        backgroundColor: White,
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        elevation: 2,
        display: "flex",
        flexDirection: 'row',
    },
    pill: {
        backgroundColor: White,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        elevation: 2,
        marginVertical: 8,
        paddingVertical: 4,
        marginHorizontal: 4,
        paddingHorizontal: 8,
        borderRadius: 20
    },
    pillText: {
        color: 'black'
    },
});
