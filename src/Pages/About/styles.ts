import { StyleSheet } from 'react-native'
import { responsiveFontSize, responsiveHeight } from '../../Styles/Dimensions';
import { Black } from '../../Resources/Colors';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomWidth: 1,
        borderBottomColor: Black,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        maxHeight: 60
    },
    title: {
        color: Black,
        fontSize: responsiveFontSize(4),
        flex: 5
    },
    link: {
        flex: 1,
    },
    subtitle: {
        fontSize: responsiveFontSize(3),
        color: Black,
    },
    subtitleContainer: {
        fontSize: responsiveFontSize(2),
        color: Black,
        marginBottom: 8,
    },
    content: {
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 16
    },
    paragraph: {
        color: Black,
        fontSize: responsiveFontSize(2),
        textAlign: "justify"
    },
    socialMedia: {
        maxHeight: 40,
        flex: 1,
        justifyContent: "space-evenly",
        flexDirection: "row"

    }
})
