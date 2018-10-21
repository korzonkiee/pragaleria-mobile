import { StyleSheet } from 'react-native'
import { responsiveHeight } from '../../Styles/Dimensions';

export default StyleSheet.create({
    artistContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        height: responsiveHeight(35)
    },
    artistImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    artistName: {
        textAlign: 'center'
    }

});
