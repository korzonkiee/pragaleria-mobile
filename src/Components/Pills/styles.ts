import { StyleSheet } from "react-native";
import { Black } from '../../Resources/Colors';
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
        flexDirection: 'row'
    },
    pill: {
        backgroundColor: White,
        shadowColor: Black,
        shadowRadius: 5,
        elevation: 2,
        shadowOffset: { width: 0, height: 10 },
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
