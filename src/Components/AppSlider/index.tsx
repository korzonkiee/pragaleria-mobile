import * as React from 'react';
import { Slider, View, ViewProps } from 'react-native';
import { Black, DirtyWhite, LightBlack } from '../../Resources/Colors';
import { responsiveFontSize } from '../../Styles/Dimensions';
import AppText from '../AppText';

export interface AppSliderProps extends ViewProps {
    readonly onSlidingComplete: (value: number) => void;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    readonly initialValue: number;
}

export interface AppSliderState {
    readonly value: number;
}

export default class AppSlider extends React.Component<AppSliderProps, AppSliderState> {
    constructor(props: AppSliderProps) {
        super(props);
        this.state = {
            value: this.props.initialValue
        };
    }

    public render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Slider
                    style={[{ width: 255, transform: [{ rotateZ: '-180deg' }] }, this.props.style]}
                    minimumTrackTintColor={DirtyWhite}
                    maximumTrackTintColor={LightBlack}
                    thumbTintColor={LightBlack}
                    step={this.props.step}
                    minimumValue={this.props.min}
                    maximumValue={this.props.max}
                    value={this.state.value}
                    onSlidingComplete={this.onSlidingComplete} />
                <AppText style={{
                    color: Black,
                    fontSize: responsiveFontSize(2),
                    marginBottom: 10
                }}>
                    {this.state.value} cm
                </AppText>
            </View>
        );
    }

    private onSlidingComplete = (value: number) => {
        this.setState({
            value: value
        });

        this.props.onSlidingComplete(value);
    }
}
