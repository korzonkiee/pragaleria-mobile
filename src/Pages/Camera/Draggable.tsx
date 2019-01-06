/**
 *    * https://github.com/tongyy/react-native-draggable
 *
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, Dimensions, Image, PanResponder, Platform, TouchableOpacity, View } from 'react-native';
import { Black, LightBlack } from '../../Resources/Colors';


export default class Draggable extends Component {
    static propTypes = {
        renderText: PropTypes.string,
        renderShape: PropTypes.string,
        renderWidth: PropTypes.number,
        renderHeight: PropTypes.number,
        imageSource: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string,
            }),
            PropTypes.number
        ]),
        offsetX: PropTypes.number,
        offsetY: PropTypes.number,
        renderColor: PropTypes.string,
        reverse: PropTypes.bool,
        pressDrag: PropTypes.func,
        onMove: PropTypes.func,
        pressDragRelease: PropTypes.func,
        longPressDrag: PropTypes.func,
        pressInDrag: PropTypes.func,
        pressOutDrag: PropTypes.func,
        z: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number

    };

    componentWillMount() {
        if (this.props.reverse == false)
            this.state.pan.addListener((c) => this.state._value = c);
    }

    componentWillUnmount() {
        this.state.pan.removeAllListeners();
    }

    constructor(props, defaultProps) {
        super(props, defaultProps);
        const { pressDragRelease, reverse, onMove } = props;
        this.state = {
            pan: new Animated.ValueXY(),
            _value: { x: 0, y: 0 }
        };

        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                if (reverse == false) {
                    this.state.pan.setOffset({ x: this.state._value.x, y: this.state._value.y });
                    this.state.pan.setValue({ x: 0, y: 0 });
                }
            },
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }], { listener: onMove }),
            onPanResponderRelease: (e, gestureState) => {
                if (pressDragRelease)
                    pressDragRelease(e, gestureState);
                if (reverse == false)
                    this.state.pan.flattenOffset();
                else
                    this.reversePosition();
            }
        });
    }

    _positionCss = () => {
        let Window = Dimensions.get('window');
        const { renderWidth, renderHeight, offsetX, offsetY, x, y, z } = this.props;
        return Platform.select({
            ios: {
                zIndex: z != null ? z : 999,
                position: 'absolute',
                top: y != null ? y : (Window.height / 2 - renderHeight + offsetY),
                left: x != null ? x : (Window.width / 2 - renderWidth + offsetX)
            },
            android: {
                position: 'absolute',
                width: Window.width,
                height: Window.height,
                top: y != null ? y : (Window.height / 2 - renderHeight + offsetY),
                left: x != null ? x : (Window.width / 2 - renderWidth + offsetX)
            },
        });
    };
    _dragItemCss = () => {
        const { renderWidth, renderHeight } = this.props;
        return {
            width: renderWidth,
            height: renderHeight,
            marginLeft: 1,
            marginTop: 1
        };
    };
    _getTextOrImage = () => {
        const { imageSource } = this.props;
        return (<Image style={this._dragItemCss()} source={imageSource} />);
    };

    reversePosition = () => {
        Animated.spring(
            this.state.pan,
            { toValue: { x: 0, y: 0 } }
        ).start();
    };

    render() {
        const touchableContent = this._getTextOrImage();
        const { pressDrag, longPressDrag, pressInDrag, pressOutDrag, renderWidth, renderHeight } = this.props;

        return (
            <View style={this._positionCss()}>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[this.state.pan.getLayout()]}>
                    <TouchableOpacity
                        style={{
                            width: renderWidth + 2,
                            height: renderHeight + 2,
                            backgroundColor: LightBlack,
                            elevation: 10,
                            shadowOffset: { width: 5, height: 15 },
                            shadowColor: Black,
                            shadowOpacity: 0.8,
                            shadowRadius: 15
                        }}
                        onPress={pressDrag}
                        onLongPress={longPressDrag}
                        onPressIn={pressInDrag}
                        onPressOut={pressOutDrag}
                    >
                        {touchableContent}
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}
