import React, { Component } from 'react';
import { AppState, Dimensions, Platform, View } from 'react-native';
import { RNCamera } from "react-native-camera";
import Orientation from 'react-native-orientation';
import RNRearCameraCharacteristicsDisplayMetrics from 'react-native-rear-camera-characteristics-display-metrics';
import * as Nav from "react-navigation";
import AppSlider from '../../Components/AppSlider';
import CameraButton from '../../Components/CameraButton';
import CameraTutorial from '../../Components/CameraTutorial';
import { l } from "../../Services/Language";
import Draggable from './Draggable';

export interface CameraProps {
    imageUrl: string,
    imageDimension: [number, number]
}

interface CameraState {
    readonly image: any;
    readonly backgroundImage: string | null;
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
            backgroundImage: null,
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
        console.log("Render");
        let takePhotoButton = <CameraButton onPress={this.takePicture} title={"Zdjęcie"} icon={"camera-alt"} />;
        let goBackButton = <CameraButton onPress={this.goBackPreview} title={"Ponów"} icon={"refresh"} />;

        let hideShowFrameButton = this.state.frame ?
            <CameraButton icon={'check-circle'} title={l("Camera.ShowFrame")} onPress={this.hideShowFrame} /> :
            <CameraButton icon={'radio-button-unchecked'} title={l("Camera.ShowFrame")} onPress={this.hideShowFrame} />

        if (this.state.tutorial) {
            return (<CameraTutorial initialWallDistance={this.state.wallDistance}
                onTutorialCompleted={wallDistance => this.setState({
                    tutorial: false,
                    wallDistance: wallDistance
                })} />)
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <RNCamera
                        ref={ref => {
                            this.cameraInstance = ref;
                        }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        type={RNCamera.Constants.Type.back}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'} />
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                        <AppSlider style={{ marginTop: 32 }} step={10} min={50} max={500}
                            initialValue={this.state.wallDistance}
                            onSlidingComplete={this.sliderOnValueChange} />

                        {!this.state.displayingCameraPreview && this.state.image}
                        <View style={{ margin: 16, flexDirection: 'row', width: '100%' }}>
                            <CameraButton style={{ flex: 1 }} icon={'arrow-back'} title={'Wróć'} onPress={this.goBack} />
                            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                                {!this.state.displayingCameraPreview ? hideShowFrameButton : null}
                                {this.state.displayingCameraPreview ? takePhotoButton : goBackButton}
                            </View>
                            <View style={{ flex: 1, alignSelf: 'flex-end' }} />
                        </View>
                    </View>
                </View>

            )
        }
    }

    private sliderOnValueChange = (val: number) => {
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

    private goBack = () => {
        this.props.navigation.goBack();
    }

    private goBackPreview = () => {
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
        Orientation.getOrientation((_, orientation) => {
            this.setUpImage(orientation);
        });
        Orientation.addOrientationListener(this._orientationDidChange);
        AppState.addEventListener('change', this._handleAppStateChange);

    };

    private hideShowFrame = () => {
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
