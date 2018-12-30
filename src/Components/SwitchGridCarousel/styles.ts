import { StyleSheet } from 'react-native'
import { responsiveHeight, responsiveFontSize, responsiveWidth } from '../../Styles/Dimensions';
import { White, DirtyWhite, Black, Yellow, GreyLight, LightBlack, LightGray } from '../../Resources/Colors';
import font, { DefaultFontFamily } from '../../Styles/Fonts';

export default StyleSheet.create({
    itemTitleBox: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        flexDirection: 'row'
    },
    itemTitleTextLeft: {
        marginRight: 5,
        color: LightBlack,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        ...font({ family: DefaultFontFamily, weight: "SemiBold" }),
        fontSize: responsiveFontSize(1.5)
    },
    itemTitleTextRight: {
        color: LightBlack,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        textAlign: 'right',
        fontSize: responsiveFontSize(1.5)
    },
    topContainer: {
        backgroundColor: White,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        borderBottomColor: LightGray,
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topContainerIcon: {
        flex: 0.3,
        marginHorizontal: 15,
    },
    checkboxStyle: {
    },
    checkboxLabelStyle: {
        ...font({ family: DefaultFontFamily }),
        fontSize: responsiveFontSize(2)
    },
    gridItem: {
        flex: 0.5,
        backgroundColor: White,
        borderColor: LightGray,
        borderWidth: 1,
        margin: 5
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
        flex: 1
    },
});
