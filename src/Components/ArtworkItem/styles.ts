import { StyleSheet } from 'react-native'
import * as Colors from '../../Resources/Colors';
import { responsiveHeight, responsiveFontSize } from '../../Styles/Dimensions';
import font from '../../Styles/Fonts';

export default StyleSheet.create({
    artworkContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 120,
        marginTop: 16,
        marginBottom: 16
    },
    imageFade: {
        backgroundColor: Colors.GreyLight
    },
    artworkImage: {
        flex: 1,
        alignSelf: 'stretch',
    },
    artworkTitle: {
        fontSize: responsiveFontSize(2),
        ...font({ weight: 'SemiBold'}),
    },
    artworkDescContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 8
    }
});
