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
        justifyContent: 'center',
    },
    artistName: {
        textAlign: 'center'
    },
    artistNameBackground: {
        backgroundColor: "#FFFFFF80",
        width: "100%"
    }
});
