import { StyleSheet } from 'react-native';
import { GreyLight } from '../../Resources/Colors';
import { responsiveHeight } from '../../Styles/Dimensions';

export default StyleSheet.create({
    artworkFullResImage: {
        flex: 1,
        width: '100%',
        height: responsiveHeight(50),
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: GreyLight
    },
    artworkFullImage: {
        flex: 1,
        width: undefined,
        height: undefined
    },
});
