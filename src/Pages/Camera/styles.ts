import {StyleSheet} from "react-native";
import {DefaultAppFont} from "../../Styles/Fonts";


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
    captureContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        position: 'absolute',
        resizeMode: 'contain',
    },
    slider: {
        // position: 'absolute',
        flex:1,
        bottom: 25,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // transform: [
        //     { rotateZ : '-90deg' },
        // ],
    },
    distanceText: {
        position: 'absolute',
        right: 10,
        top: 500,
        color: '#000'
    }
});
