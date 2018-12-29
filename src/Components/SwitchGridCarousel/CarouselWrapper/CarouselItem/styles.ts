import { StyleSheet } from 'react-native'
import { responsiveHeight, responsiveFontSize, responsiveWidth } from '../../../../Styles/Dimensions';
import { White, DirtyWhite, Black, Yellow, GreyLight, LightBlack, LightGray } from '../../../../Resources/Colors';
import font, { DefaultFontFamily } from '../../../../Styles/Fonts';

export default StyleSheet.create({
    artworkFullResImage: {
        flex: 7,
        width: responsiveWidth(100),
        height: responsiveHeight(50),
        alignSelf: 'stretch'
    },
    artworkFullImage: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    imageTopLabel: {
        color: White,
        backgroundColor: Black,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    imageSubtitle: {
        backgroundColor: White,
        padding: 5,
        marginTop: 1,
        flex: 1,
        borderWidth: 1,
        borderColor: LightGray
    },
    itemTitleBox: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        flexDirection: 'row',
    },
    itemTitleTextLeft: {
        marginRight: 15,
        color: LightBlack,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        ...font({ family: DefaultFontFamily, weight: "SemiBold" }),
        fontSize: responsiveFontSize(2)
    },
    itemTitleTextRight: {
        color: LightBlack,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        textAlign: 'right',
        fontSize: responsiveFontSize(2)
    },
});
