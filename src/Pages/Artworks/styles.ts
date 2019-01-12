import { StyleSheet } from 'react-native';
import { Black, DirtyWhite, GreyLight, White } from '../../Resources/Colors';

export default StyleSheet.create({
    container: {
        backgroundColor: DirtyWhite,
        width: "100%",
        height: "100%"
    },
    pillsContainer: {
        backgroundColor: White,
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        display: "flex",
        flexDirection: 'row'
    },
    pill: {
        backgroundColor: GreyLight,
        shadowColor: Black,
        shadowRadius: 5,
        elevation: 1,
        shadowOffset: { width: 0, height: 10 },
        marginVertical: 8,
        paddingVertical: 4,
        marginHorizontal: 4,
        paddingHorizontal: 8,
        borderRadius: 20
    },
    pillText: {
        color: 'black'
    }
})
