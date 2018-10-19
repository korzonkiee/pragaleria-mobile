import React, {Component} from 'react'
import {Text, Image, Modal as RNModal, TouchableOpacity, View, PixelRatio, Dimensions} from 'react-native'
import {RNCamera} from "react-native-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import {styles} from "./styles";
import RNRearCameraCharacteristicsDisplayMetrics from 'react-native-rear-camera-characteristics-display-metrics';
import Orientation from 'react-native-orientation';
import Draggable from './Draggable'

export interface CameraProps {

}

const PORTRAIT = 'PORTRAIT';
const LANDSCAPE = 'LANDSCAPE';
// Camera setup tutorial
// https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md
// Similar issue of not rendering camera, possibly because of navigation. this.props.navigation.isFocused is always true ?
// https://github.com/react-native-community/react-native-camera/issues/1626#issuecomment-428129885
// #TODO
// https://github.com/tongyy/react-native-draggable
// https://github.com/bokuweb/react-rnd
export class Camera extends Component<CameraProps> {
    private _cameraInstance: RNCamera | null;
    private wallDistance = 200; // 200cm before wall
    private viewWidth: number;
    private viewHeight: number;
    private windowDimension = Dimensions.get('window');

    save_icon = <Icon name="save" size={30} color="#900"/>;
    mock_image = {
        id: "29728",
        title: "Szelest skrzydeł",
        description: "akryl, płótno, 100 x 120 cm, sygn. na odwrocie",
        catalog_number: "1",
        initial_price: "500",
        sold_price: "1300",
        sold: "1",
        thumbnail: "http://pragaleria.pl/wp-content/uploads/2018/10/1539881830e8bb8-398x540.jpg",
        author: "Joanna Półkośnik",
        meta: {
            dimension: [140, 110]
        }
    };

    constructor(CameraProps) {
        super(CameraProps);
        this.state = {
            image: null
        }
    }

    componentDidMount() {
        let ratios = this.getRatios();
        this.viewHeight = ratios[0];
        this.viewWidth = ratios[1];

        Orientation.getOrientation((err, orientation) => {
            this.setUpImage(orientation);
        });
        Orientation.addOrientationListener(this._orientationDidChange);
    }

    _orientationDidChange = (orientation: string) => {
        this.setUpImage(orientation);
    };

    getWindowSize(orientation: string) {
        let windowWidth: number;
        let windowHeight: number;
        if (orientation === PORTRAIT) {
            windowWidth = Math.min(this.windowDimension.height, this.windowDimension.width)
            windowHeight = Math.max(this.windowDimension.height, this.windowDimension.width)
        }
        else {
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
        let imageHeight = this.mock_image.meta.dimension[0] / pixelCmAvg;
        let imageWidth = this.mock_image.meta.dimension[1] / pixelCmAvg;

        console.log("View height:", viewHeight);
        console.log("View width:", viewWidth);
        console.log("Height:", imageHeight, "/", windowHeight);
        console.log("Width:", imageWidth, "/", windowWidth);
        console.log("Height/Width ratio: ", imageHeight / imageWidth);
        console.log("Orginial ratio: ", this.mock_image.meta.dimension[0] / this.mock_image.meta.dimension[1])
        console.log("Window width: ", windowWidth);
        console.log("Window height: ", windowHeight);
        console.log("Area: ", imageWidth * imageHeight);

        let image = <Draggable renderWidth={imageWidth} renderHeight={imageHeight} renderShape='image' reverse={false}
                           imageSource={{uri: this.mock_image.thumbnail}}
                           offsetX={imageWidth/2} offsetY={imageHeight/2}
        />

        this.setState({image: image})
    }

    render() {
        return (
            <RNModal
                animationType="fade"
                transparent={false}
                visible={true}
                onRequestClose={() => this.props.navigation.goBack()}>
                <RNCamera
                    ref={ref => {
                        this._cameraInstance = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                </RNCamera>
                {this.state.image}
                <View style={styles.captureContainer}>
                    <TouchableOpacity
                        onPress={() => this.takePicture()}>
                        {this.save_icon}
                        <Text style={{color: 'white'}}>Save image</Text>
                    </TouchableOpacity>
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

    takePicture = async function () {
        const options = {quality: 0.5, base64: true}
        const data = await this._cameraInstance.takePictureAsync(options);
        console.log(data.uri);
    };

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange);
    }
}
