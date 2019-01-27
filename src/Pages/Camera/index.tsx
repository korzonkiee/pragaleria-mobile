import React, { Component } from 'react';
import { AppState, Dimensions, Modal as RNModal, Platform, Slider, TouchableOpacity, View } from 'react-native';
import { RNCamera } from "react-native-camera";
import Orientation from 'react-native-orientation';
import RNRearCameraCharacteristicsDisplayMetrics from 'react-native-rear-camera-characteristics-display-metrics';
import Image from 'react-native-scalable-image';
import Icon from "react-native-vector-icons/Entypo";
import { default as MaterialIcon } from "react-native-vector-icons/MaterialIcons";
import * as Nav from "react-navigation";
import images from "../../Assets/Images";
import AppText from "../../Components/AppText";
import { Black, DirtyWhite, LightBlack, LightGrayVisible, White } from "../../Resources/Colors";
import { l } from "../../Services/Language";
import { responsiveFontSize } from "../../Styles/Dimensions";
import Draggable from './Draggable';
import { styles } from "./styles";

export interface CameraProps {
    imageUrl: string,
    imageDimension: [number, number]
}

interface CameraState {
    readonly image: any;
    readonly displayingCameraPreview: boolean;
    readonly appState: any;
    readonly wallDistance: number;
    readonly tutorial: boolean;
    readonly frame: boolean;
}

const PORTRAIT = 'PORTRAIT';
const LANDSCAPE = 'LANDSCAPE';

export class Camera extends Component<CameraProps & Nav.NavigationInjectedProps, CameraState> {
    private cameraInstance: RNCamera | null;
    private oppositePOV: number;
    private windowDimension = Dimensions.get('window');

    constructor(props: CameraProps & Nav.NavigationInjectedProps) {
        super(props);

        this.cameraInstance = null;
        this.oppositePOV = 0;

        this.state = {
            image: null,
            displayingCameraPreview: true,
            appState: AppState.currentState,
            wallDistance: 200,
            tutorial: true,
            frame: true
        }
    }

    componentDidMount() {
        this.oppositePOV = this.getOppositePOV();
    }

    _orientationDidChange = (orientation: string) => {
        this.setState({ displayingCameraPreview: true });
        this.setUpImage(orientation);
    };

    setUpImage(orientation: string) {
        let windowLonger = this.windowDimension.width;
        let windowShorter = this.windowDimension.height;

        let oppositePOVCm = this.oppositePOV * this.state.wallDistance;
        let imageRatio = this.props.imageDimension[0] / this.props.imageDimension[1];

        let imageWidth = windowShorter / oppositePOVCm * this.props.imageDimension[1];
        let imageHeight = imageWidth * imageRatio;

        let image = <Draggable renderWidth={imageWidth} renderHeight={imageHeight} renderShape='image' reverse={false}
            imageSource={{ uri: this.props.imageUrl }} offsetX={imageWidth / 2}
            offsetY={imageHeight / 2} frame={this.state.frame}
        />;

        this.setState({ image: image })
    }

    render() {
        let takePictureIcon = <Icon name="camera" size={30} color="#ffffff" />;
        let takePictureAgainIcon = <Icon name="ccw" size={30} color="#ffffff" />;

        let takePhotoButton = <TouchableOpacity
            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            onPress={this.takePicture.bind(this)}>
            {takePictureIcon}
        </TouchableOpacity>;
        let goBackButton = <TouchableOpacity
            onPress={() => this.goBackPreview()}>
            {takePictureAgainIcon}
        </TouchableOpacity>;

        let hideShowFrameButton = <TouchableOpacity
            style={{ padding: 16 }}
            onPress={() => this.hideShowFrame()}>
            {this.state.frame ?
                <MaterialIcon name='check-circle' style={{ marginLeft: 16 }} size={responsiveFontSize(3.3 * 9.5 / 10.3)} color={White} />
                : <MaterialIcon name='radio-button-unchecked' style={{ marginLeft: 16 }} size={responsiveFontSize(3.3 * 9.5 / 10.3)} color={White} />
            }
            <AppText style={{ color: DirtyWhite }}>{l("Camera.ShowFrame")}</AppText>

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
                        <Image source={images.tutorialImg} width={330} />
                        <Slider
                            style={{
                                width: 260, left: 40, transform: [
                                    { rotateZ: '-180deg' },
                                ]
                            }}
                            minimumTrackTintColor={DirtyWhite}
                            maximumTrackTintColor={LightBlack}
                            thumbTintColor={LightBlack}
                            step={10}
                            minimumValue={50}
                            maximumValue={500}
                            value={this.state.wallDistance}
                            onSlidingComplete={val => this.setState({ wallDistance: val })}
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
                            marginLeft: 20,
                            marginRight: 20,
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
                            onPress={() => this.setState({ tutorial: false })}>
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
                            style={{ width: 255, transform: [{ rotateZ: '-180deg' }] }}
                            minimumTrackTintColor={DirtyWhite}
                            maximumTrackTintColor={LightBlack}
                            thumbTintColor={LightBlack}
                            step={10}
                            minimumValue={50}
                            maximumValue={500}
                            value={this.state.wallDistance}
                            onSlidingComplete={val => this.sliderOnValueChange(val)}
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
                    <View style={styles.frameContainer}>
                        {!this.state.displayingCameraPreview ? hideShowFrameButton : null}
                    </View>
                    <View style={styles.captureContainer}>
                        {this.state.displayingCameraPreview ? takePhotoButton : goBackButton}
                    </View>
                </RNModal>
            )
        }
    }

    sliderOnValueChange(val: number) {
        this.setState({ wallDistance: val });
        if (!this.state.displayingCameraPreview) {
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
        this.cameraInstance!.resumePreview();
        this.setState({ displayingCameraPreview: true, image: null });
        Orientation.removeOrientationListener(this._orientationDidChange);
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    private takePicture = async () => {
        const options = {
            pauseAfterCapture: true,
            exif: true
        };
        this.setState({ displayingCameraPreview: false });
        const image = await this.cameraInstance!.takePictureAsync(options);
        // console.log(image);
        Orientation.getOrientation((_, orientation) => {
            this.setUpImage(orientation);
        });
        Orientation.addOrientationListener(this._orientationDidChange);
        AppState.addEventListener('change', this._handleAppStateChange);

    };

    hideShowFrame() {
        this.setState(prevState => ({ frame: !prevState.frame }));
        Orientation.getOrientation((_, orientation) => {
            this.setUpImage(orientation);
        });
    }

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

    _handleAppStateChange = (nextAppState: any) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.goBackPreview();
        }
        this.setState({ appState: nextAppState });
    };

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        Orientation.removeOrientationListener(this._orientationDidChange);
    }
}
