import { StyleSheet } from 'react-native'
import { responsiveFontSize } from '../../Styles/Dimensions';
import font from '../../Styles/Fonts';
import { Black } from '../../Resources/Colors';

export default StyleSheet.create({
    artworkContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 150,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 8,
        color: Black
    },
    artworkTitle: {
        fontSize: responsiveFontSize(1.8),
        ...font({ weight: 'Medium'}),
        color: Black
    },
    artworkSubTitle: {
        color: Black
    },
    artworkDescContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 8
    }
});
