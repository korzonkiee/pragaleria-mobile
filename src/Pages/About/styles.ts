import { StyleSheet } from 'react-native'
import { responsiveFontSize, responsiveHeight } from '../../Styles/Dimensions';
import { Black, DirtyWhite, White } from '../../Resources/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DirtyWhite
    },
    titleContainer: {
        backgroundColor: White,
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomWidth: 1,
        borderBottomColor: Black,
        flexDirection: "row",
        alignItems: "center",
        padding: 16
    },
    title: {
        color: Black,
        fontSize: responsiveFontSize(4),
        flex: 5,
        margin: 0,
        padding: 0
    },
    link: {
        flex: 1,
        margin: 0,
        padding: 0
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
        paddingRight: 16
    },
    paragraph: {
        color: Black,
        fontSize: responsiveFontSize(2),
        textAlign: "justify"
    }
})
