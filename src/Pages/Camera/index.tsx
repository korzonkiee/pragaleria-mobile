import React, {Component} from 'react'
import {Dimensions, Modal as RNModal, Text, TouchableOpacity, View} from 'react-native'
import {RNCamera} from "react-native-camera";
import * as Nav from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import {styles} from "./styles";
import RNRearCameraCharacteristicsDisplayMetrics from 'react-native-rear-camera-characteristics-display-metrics';
import Orientation from 'react-native-orientation';
import Draggable from './Draggable'
import {l} from "../../Services/Language";

export interface CameraProps {
    imageUrl: string,
    imageDimension: [number, number]
}

const PORTRAIT = 'PORTRAIT';
const LANDSCAPE = 'LANDSCAPE';

export class Camera extends Component<CameraProps & Nav.NavigationInjectedProps> {
    private cameraInstance: RNCamera | null;
    private wallDistance = 200; // 200cm before wall
    private viewWidth: number;
    private viewHeight: number;
    private windowDimension = Dimensions.get('window');


    constructor(CameraProps) {
        super(CameraProps);
        this.state = {
            image: null,
            displayingCameraPreview: true
        }
    }

    componentDidMount() {
        let ratios = this.getRatios();
        this.viewHeight = ratios[0];
        this.viewWidth = ratios[1];
    }

    _orientationDidChange = (orientation: string) => {
        this.setState({displayingCameraPreview: true});
        this.setUpImage(orientation);
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

    setUpImage(orientation: string) {
        console.log(orientation);
        let windowDimension = this.getWindowSize(orientation);
        let windowHeight = windowDimension[0];
        let windowWidth = windowDimension[1];

        let viewWidth = this.viewWidth;
        let viewHeight = this.viewHeight;
        if (orientation === PORTRAIT) {
            viewWidth = this.viewHeight;
            viewHeight = this.viewWidth;
        }
        let pixelCmAvg = (viewHeight / windowHeight + viewWidth / windowWidth) / 2;
        let imageHeight = this.props.imageDimension[0] / pixelCmAvg;
        let imageWidth = this.props.imageDimension[1] / pixelCmAvg;

        console.log("View height:", viewHeight);
        console.log("View width:", viewWidth);
        console.log("Height:", imageHeight, "/", windowHeight);
        console.log("Width:", imageWidth, "/", windowWidth);
        console.log("Height/Width ratio: ", imageHeight / imageWidth);
        console.log("Orginial ratio: ", this.props.imageDimension[0] / this.props.imageDimension[1]);
        console.log("Window width: ", windowWidth);
        console.log("Window height: ", windowHeight);
        console.log("Area: ", imageWidth * imageHeight);

        let image = <Draggable renderWidth={imageWidth} renderHeight={imageHeight} renderShape='image' reverse={false}
                               imageSource={{uri: this.props.imageUrl}}
                               offsetX={imageWidth / 2} offsetY={imageHeight / 2}
        />;

        this.setState({image: image})
    }

    render() {
        let takePictureIcon = <Icon name="camera" size={30} color="#ffffff"/>;
        let takePictureAgainIcon = <Icon name="undo" size={30} color="#ffffff"/>;
        let takePhotoButton = <TouchableOpacity
            onPress={this.takePicture.bind(this)}
        >
            {takePictureIcon}
            <Text style={{color: 'white'}}>{l("Camera.Hang")}</Text>
        </TouchableOpacity>;
        let goBackButton = <TouchableOpacity
            onPress={() => this.goBackPreview()}>
            {takePictureAgainIcon}
            <Text style={{color: 'white'}}>{l("Camera.TakeAgain")}</Text>
        </TouchableOpacity>;

        return (
            <RNModal
                animationType="fade"
                transparent={false}
                visible={true}
                onRequestClose={() => this.props.navigation.goBack()}>
                <RNCamera
                    ref={ref => {
                        this.cameraInstance = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                </RNCamera>
                {!this.state.displayingCameraPreview && this.state.image}
                <View style={styles.captureContainer}>
                    {this.state.displayingCameraPreview ? takePhotoButton : goBackButton}
                </View>
            </RNModal>
        )
    }

    getRatios(): [number, number] {
        let focal = RNRearCameraCharacteristicsDisplayMetrics.FOCAL_LENGTH; // 4.260000228881836
        let sensorWidth = RNRearCameraCharacteristicsDisplayMetrics.SENSOR_WIDTH; // 5.232640266418457
        let sensorHeight = RNRearCameraCharacteristicsDisplayMetrics.SENSOR_HEIGHT; // 3.9334399700164795
        let horizonalAngle = (2 * Math.atan(sensorWidth / (focal * 2)));
        let verticalAngle = (2 * Math.atan(sensorHeight / (focal * 2)));
        let viewWidth = 2 * Math.tan(horizonalAngle / 2) * this.wallDistance;
        let viewHeight = 2 * Math.tan(verticalAngle / 2) * this.wallDistance;
        return [viewHeight, viewWidth]
    }

    goBackPreview() {
        this.cameraInstance.resumePreview();
        this.setState({displayingCameraPreview: true, image: null});
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    takePicture = async function () {
        const options = {
            pauseAfterCapture: true,
            base64: true
        };
        this.setState({displayingCameraPreview: false});
        const image = await this.cameraInstance.takePictureAsync(options);
        console.log(image);
        Orientation.getOrientation((_, orientation) => {
            this.setUpImage(orientation);
        });
        Orientation.addOrientationListener(this._orientationDidChange);

    };

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange);
    }
}
