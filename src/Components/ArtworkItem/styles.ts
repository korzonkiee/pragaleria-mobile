import { StyleSheet } from 'react-native'
import { responsiveHeight } from '../../Styles/Dimensions';

export default StyleSheet.create({
    artworkContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        height: responsiveHeight(35)
    },
    artworkImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    artworkName: {
        textAlign: 'center'
    },
    artworkNameBackground: {
        backgroundColor: "#FFFFFF80",
        width: "100%"
    }
});
