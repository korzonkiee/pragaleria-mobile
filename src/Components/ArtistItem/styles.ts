import { StyleSheet } from 'react-native'
import { responsiveHeight, responsiveFontSize } from '../../Styles/Dimensions';
import { BlackTransparent, LightGrayVisible, LightGrayHidden, White } from '../../Resources/Colors';

export default StyleSheet.create({
    artistContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        marginBottom: 2
    },
    artistImage: {
        flex:1,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        height: responsiveHeight(20),
        width: "100%",
    },
    artistNameBackground: {
        backgroundColor: BlackTransparent
    },
    artistName: {
        color: White,
        fontSize: responsiveFontSize(1.7),
        fontWeight: "400",
        marginLeft: 8
    }
});
