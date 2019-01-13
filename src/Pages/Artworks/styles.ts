import { StyleSheet } from 'react-native';
import { Black, White } from '../../Resources/Colors';
import { responsiveHeight } from '../../Styles/Dimensions';

export default StyleSheet.create({
    container: {
        backgroundColor: White,
        width: "100%",
        height: "100%"
    },
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
    artworkFullResImage: {
        flex: 1,
        height: responsiveHeight(15),
        alignSelf: 'stretch'
    },
    artworkFullImage: {
        flex: 1,
        width: undefined,
        height: undefined
    },
})
