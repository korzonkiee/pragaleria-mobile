import { StyleSheet } from 'react-native'
import { responsiveFontSize, responsiveHeight } from '../../Styles/Dimensions';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16
    },
    title: {
        color: "#000000",
        fontSize: responsiveFontSize(5),
        alignSelf: "center",
        marginBottom: responsiveHeight(2)
    },
})
