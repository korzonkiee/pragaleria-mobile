import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Image from 'react-native-scalable-image';
import images from '../../Assets/Images';
import { Black, LightGrayVisible } from '../../Resources/Colors';
import { l } from '../../Services/Language';
import { responsiveFontSize } from '../../Styles/Dimensions';
import AppSlider from '../AppSlider';
import AppText from '../AppText';

export interface CameraTutorialProps {
    readonly initialWallDistance: number;
    readonly onTutorialCompleted: (wallDistance: number) => void;
}

export interface CameraTutorialState {
    readonly wallDistance: number;
}

export default class CameraTutorial extends React.Component<CameraTutorialProps, CameraTutorialState> {
    constructor(props: CameraTutorialProps) {
        super(props);
        this.state = {
            wallDistance: this.props.initialWallDistance
        };
    }

    public render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={images.tutorialImg} width={330} />
                <AppSlider step={10} min={50} max={500}
                    initialValue={this.state.wallDistance}
                    onSlidingComplete={value => this.setState({ wallDistance: value })} />
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
                    onPress={() => this.props.onTutorialCompleted(this.state.wallDistance)}>
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
        );
    }
}
