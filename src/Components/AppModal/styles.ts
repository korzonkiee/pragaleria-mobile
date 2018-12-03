import { StyleSheet } from "react-native";
import { responsiveFontSize } from "../../Styles/Dimensions";
import { White, LightBlack, LightGray, DirtyWhite } from '../../Resources/Colors';


export default StyleSheet.create({
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
    closeButtonContainer: {
        backgroundColor: White,
        borderTopColor: LightGray,
        borderTopWidth: 1,
        width: "100%"
    },
    closeButtonText: {
        fontSize: responsiveFontSize(2),
        color: LightBlack,
        padding: 16,
        alignSelf: "flex-end"
    }
});
