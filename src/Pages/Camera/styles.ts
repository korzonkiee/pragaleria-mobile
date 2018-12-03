import {StyleSheet} from "react-native";


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
    slider:{
        position: 'absolute',
        top:300, //todo for every screen
        right: -200,
        width:500,
        transform: [
            { rotateZ : '-90deg' },
        ],
    }
});
