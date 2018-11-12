import { StyleSheet } from 'react-native'
import { responsiveHeight } from '../../Styles/Dimensions';

export default StyleSheet.create({
    artistContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        height: responsiveHeight(25)
    },
    artistImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    artistName: {
        textAlign: 'center',
        color: "#FFFFFF"
    },
    artistNameBackground: {
        backgroundColor: "#000000",
        width: "100%"
    }
});
