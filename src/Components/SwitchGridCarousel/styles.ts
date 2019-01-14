import { StyleSheet } from 'react-native';
import { LightBlack, LightGray, White } from '../../Resources/Colors';
import { responsiveFontSize } from '../../Styles/Dimensions';
import font, { DefaultFontFamily } from '../../Styles/Fonts';

export default StyleSheet.create({
    topLinksContainer: {
        backgroundColor: White,
        borderBottomColor: LightGray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    topLinksTouchable: {
        flex: 1,
        marginVertical: 8
    },
    topLinksContainerText: {
        color: LightBlack,
        textAlign: 'center',
        ...font({ family: DefaultFontFamily, weight: "Regular" }),
        fontSize: responsiveFontSize(2),
    },
    topLinksContainerTextLeft: {
        color: LightBlack,
        textAlign: 'center',
        ...font({ family: DefaultFontFamily, weight: "Regular" }),
        fontSize: responsiveFontSize(2),
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
        marginRight: 3,
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
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topContainerIcon: {
        flex: 0.3,
        marginRight: 20,
    },
    checkboxStyle: {
    },
    checkboxLabelStyle: {
        ...font({ family: DefaultFontFamily }),
        fontSize: responsiveFontSize(2)
    }
});
