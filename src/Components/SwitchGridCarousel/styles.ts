import { StyleSheet } from 'react-native';
import { Black, LightBlack, LightGray, White } from '../../Resources/Colors';
import { responsiveFontSize } from '../../Styles/Dimensions';
import font, { DefaultFontFamily } from '../../Styles/Fonts';

export default StyleSheet.create({
    topLinksContainer: {
        backgroundColor: White,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        borderBottomColor: LightGray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    topLinksTouchable: {
        flex: 1,
        marginVertical: 12
    },
    topLinksContainerText: {
        flex: 1,
        color: LightBlack,
        textAlign: 'center',
        ...font({ family: DefaultFontFamily, weight: "Regular" }),
        fontSize: responsiveFontSize(2.2),
    },
    topLinksContainerTextLeft: {
        color: LightBlack,
        textAlign: 'center',
        ...font({ family: DefaultFontFamily, weight: "Regular" }),
        fontSize: responsiveFontSize(2.2),
        borderRightColor: LightBlack,
        borderRightWidth: 1
    },
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
        marginVertical: 10,
        marginHorizontal: 5,
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
