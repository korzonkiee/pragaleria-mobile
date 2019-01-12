import {StyleSheet} from "react-native";
import {DefaultAppFont} from "../../Styles/Fonts";
import {Black, LightBlack} from "../../Resources/Colors";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    frameContainer: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 0,
        bottom: 40,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    captureContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 40,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        position: 'absolute',
        resizeMode: 'contain',
    },
    slider: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    distanceText: {
        position: 'absolute',
        right: 10,
        top: 500,
        color: '#000'
    },
    imageFrame: {
        backgroundColor: LightBlack,
        elevation: 10,
        shadowOffset: {width: 5, height: 15},
        shadowColor: Black,
        shadowOpacity: 0.8,
        shadowRadius: 15
    }
});
