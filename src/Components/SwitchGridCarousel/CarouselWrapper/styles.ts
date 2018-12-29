import { StyleSheet } from 'react-native'
import { responsiveHeight, responsiveFontSize, responsiveWidth } from '../../../Styles/Dimensions';
import { White, DirtyWhite, Black, Yellow, GreyLight, LightBlack } from '../../../Resources/Colors';

export default StyleSheet.create({
    artworkFullResImage: {
        flex: 1,
        width: responsiveWidth(100),
        height: responsiveHeight(50),
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: GreyLight
    },
    artworkFullImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderWidth: 1,
        borderColor: GreyLight
    },
});
