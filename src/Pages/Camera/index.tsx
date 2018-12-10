import React, {Component} from 'react'
import {AppState, Dimensions, Modal as RNModal, Slider, TouchableOpacity, View, Platform} from 'react-native'
import {RNCamera} from "react-native-camera";
import * as Nav from "react-navigation";
import Icon from "react-native-vector-icons/Entypo";
import {styles} from "./styles";
import RNRearCameraCharacteristicsDisplayMetrics from 'react-native-rear-camera-characteristics-display-metrics';
import Orientation from 'react-native-orientation';
import Draggable from './Draggable'
import {l} from "../../Services/Language";
import Image from 'react-native-scalable-image';
import {responsiveFontSize} from "../../Styles/Dimensions";
import AppText from "../../Components/AppText";
import {Black, DirtyWhite, LightBlack, LightGrayVisible, Yellow} from "../../Resources/Colors";

export interface CameraProps {
    imageUrl: string,
    imageDimension: [number, number]
}

const PORTRAIT = 'PORTRAIT';
const LANDSCAPE = 'LANDSCAPE';

export class Camera extends Component<CameraProps & Nav.NavigationInjectedProps> {
    private cameraInstance: RNCamera | null;
    private windowDimension = Dimensions.get('window');

    constructor(CameraProps) {
        super(CameraProps);
        this.state = {
            image: null,
            displayingCameraPreview: true,
            appState: AppState.currentState,
            wallDistance: 200,
            tutorial: true
        }
    }

    componentDidMount() {
        this.oppositePOV = this.getOppositePOV();
    }

    _orientationDidChange = (orientation: string) => {
        this.setState({displayingCameraPreview: true});
        this.setUpImage(orientation);
    };

    setUpImage(orientation: string) {
        let windowLonger = this.windowDimension.width;
        let windowShorter = this.windowDimension.height;

        let oppositePOVCm = this.oppositePOV * this.state.wallDistance;
        let imageRatio = this.props.imageDimension[0] / this.props.imageDimension[1];

        let imageWidth = windowShorter / oppositePOVCm * this.props.imageDimension[1];
        let imageHeight = imageWidth * imageRatio;


        console.log("Orientation: ", orientation);
        console.log("Image org px: ", this.props.imageDimension);
        console.log("oppositePOV: ", oppositePOVCm);
        console.log("Image height:", imageHeight, "/", windowLonger);
        console.log("Image width:", imageWidth, "/", windowShorter);
        console.log("Window width: ", windowShorter);
        console.log("Window height: ", windowLonger);
        console.log("Area: ", imageWidth * imageHeight);

        let image = <Draggable renderWidth={imageWidth} renderHeight={imageHeight} renderShape='image' reverse={false}
                               imageSource={{uri: this.props.imageUrl}}
                               offsetX={imageWidth / 2} offsetY={imageHeight / 2}
        />;

        this.setState({image: image})
    }

    render() {
        let takePictureIcon = <Icon name="camera" size={30} color="#ffffff"/>;
        let takePictureAgainIcon = <Icon name="chevron-with-circle-left" size={30} color="#ffffff"/>;
        let takePhotoButton = <TouchableOpacity
            onPress={this.takePicture.bind(this)}
        >
            {takePictureIcon}
        </TouchableOpacity>;
        let goBackButton = <TouchableOpacity
            onPress={() => this.goBackPreview()}>
            {takePictureAgainIcon}
        </TouchableOpacity>;
        if (this.state.tutorial) {
            return (
                <RNModal
                    animationType="fade"
                    transparent={false}
                    visible={true}
                    onRequestClose={() => this.props.navigation.goBack()}>
                    {<View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={{uri: 'https://i.imgur.com/iRyJhfE.png'}} width={330}/>
                        <Slider
                            style={{
                                width: 255, left: 40, transform: [
                                    {rotateZ: '-180deg'},
                                ]
                            }}
                            minimumTrackTintColor={DirtyWhite}
                            maximumTrackTintColor={Yellow}
                            thumbTintColor={LightBlack}
                            step={10}
                            minimumValue={50}
                            maximumValue={500}
                            value={this.state.wallDistance}
                            onValueChange={val => this.setState({wallDistance: val})}
                        />
                        <AppText style={{
                            color: Black,
                            fontSize: responsiveFontSize(2),
                            textAlign: 'auto',
                            marginBottom: 10
                        }}>
                            {this.state.wallDistance}cm
                        </AppText>
                        <AppText style={{
                            color: Black,
                            fontSize: responsiveFontSize(2),
                            textAlign: 'center',
                        }}>
                            {l("Camera.SelectDistance")}
                        </AppText>
                        <TouchableOpacity
                            style={{
                                backgroundColor: LightGrayVisible,
                                alignSelf: 'center',
                                margin: 8,
                                paddingVertical: 8,
                                paddingHorizontal: 24,
                                borderRadius: 10,
                                marginTop: 30,
                            }}
                            onPress={() => this.setState({tutorial: false})}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <AppText style={{
                                    color: Black,
                                    fontSize: responsiveFontSize(2),
                                    textAlign: 'center',
                                    width: 80,
                                }}>
                                    Ok
                                </AppText>
                            </View>
                        </TouchableOpacity>
                    </View>
                    }
                </RNModal>
            )
        }
        else {
            return (
                <RNModal
                    animationType="fade"
                    transparent={false}
                    visible={true}
                    onRequestClose={() => this.props.navigation.goBack()}>
                    {<RNCamera
                        ref={ref => {
                            this.cameraInstance = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    />
                    }
                    <View style={styles.slider}>
                        <Slider
                            style={{width: 255, transform: [{rotateZ: '-180deg'}]}}
                            minimumTrackTintColor={DirtyWhite}
                            maximumTrackTintColor={Yellow}
                            thumbTintColor={LightBlack}
                            step={10}
                            minimumValue={50}
                            maximumValue={500}
                            value={this.state.wallDistance}
                            onValueChange={val => this.sliderOnValueChange(val)}
                        />
                        <AppText style={{
                            color: Black,
                            fontSize: responsiveFontSize(2),
                            textAlign: 'auto',
                            marginBottom: 10
                        }}>
                            {this.state.wallDistance}cm
                        </AppText>
                    </View>
                    {!this.state.displayingCameraPreview && this.state.image}
                    <View style={styles.captureContainer}>
                        {this.state.displayingCameraPreview ? takePhotoButton : goBackButton}
                    </View>
                </RNModal>
            )
        }
    }

    sliderOnValueChange(val: number) {
        this.setState({wallDistance: val});
        if (!this.displayingCameraPreview) {
            Orientation.getOrientation((_, orientation) => {
                this.setUpImage(orientation);
            });
        }
    }

    getOppositePOV(): number {
        let horizontalAngle = 1.0122909661567112;
        if (Platform.OS === 'android') {
            let focal = RNRearCameraCharacteristicsDisplayMetrics.FOCAL_LENGTH; // 4.260000228881836
            let sensorWidth = RNRearCameraCharacteristicsDisplayMetrics.SENSOR_WIDTH; // 5.232640266418457
            horizontalAngle = (2 * Math.atan(sensorWidth / (focal * 2)));
        }
        let oppositvePOV = 2 * Math.tan(horizontalAngle / 2);
        return oppositvePOV
    }

    goBackPreview() {
        this.cameraInstance.resumePreview();
        this.setState({displayingCameraPreview: true, image: null});
        Orientation.removeOrientationListener(this._orientationDidChange);
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    takePicture = async function () {
        const options = {
            pauseAfterCapture: true,
            exif: true
        };
        this.setState({displayingCameraPreview: false});
        const image = await this.cameraInstance.takePictureAsync(options);
        console.log(image);
        Orientation.getOrientation((_, orientation) => {
            this.setUpImage(orientation);
        });
        Orientation.addOrientationListener(this._orientationDidChange);
        AppState.addEventListener('change', this._handleAppStateChange);

    };

    getWindowSize(orientation: string) {
        let windowWidth: number;
        let windowHeight: number;
        if (orientation === PORTRAIT) {
            windowWidth = Math.min(this.windowDimension.height, this.windowDimension.width)
            windowHeight = Math.max(this.windowDimension.height, this.windowDimension.width)
        } else {
            windowWidth = Math.max(this.windowDimension.height, this.windowDimension.width)
            windowHeight = Math.min(this.windowDimension.height, this.windowDimension.width)
        }
        return [windowHeight, windowWidth]
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.goBackPreview();
        }
        this.setState({appState: nextAppState});
    };

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        Orientation.removeOrientationListener(this._orientationDidChange);
    }
}
