import { StyleSheet } from 'react-native'
import { responsiveHeight } from '../../Styles/Dimensions';
import { Black, LightGray } from '../../Resources/Colors';

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
        color: LightGray
    },
    artistNameBackground: {
        backgroundColor: Black,
        width: "100%"
    }
});
