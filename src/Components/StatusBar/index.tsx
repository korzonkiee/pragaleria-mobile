import React, { Component } from "react";
import { View, StatusBar, StatusBarStyle } from "react-native";

import { getStatusBarHeight } from "../../Helpers/PhoneHelpers"

interface StatusBarBackgroundProps {
    readonly hidden?: boolean;
    readonly backgroundColor: string;
}

export default class StatusBarBackground extends Component<StatusBarBackgroundProps> {
    render() {
        return (
            <View style={{
                backgroundColor: this.props.backgroundColor,
                height: this.props.hidden ? 0 : getStatusBarHeight(true)
            }}>
                <StatusBar
                    hidden={this.props.hidden || false}
                    backgroundColor={this.props.backgroundColor}
                    barStyle="light-content" />
            </View>
        );
    }
}
