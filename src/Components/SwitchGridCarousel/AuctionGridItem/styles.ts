import { StyleSheet } from 'react-native';
import { Black, LightBlack, LightGray, White } from '../../../Resources/Colors';
import { responsiveFontSize } from '../../../Styles/Dimensions';
import font, { DefaultFontFamily } from '../../../Styles/Fonts';

export default StyleSheet.create({
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
    }
});
