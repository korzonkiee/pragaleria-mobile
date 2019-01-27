import * as React from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import { default as MaterialIcon } from "react-native-vector-icons/MaterialIcons";
import { DirtyWhite, White } from '../../Resources/Colors';
import { responsiveFontSize } from '../../Styles/Dimensions';
import AppText from '../AppText';


export interface CameraButtonProps extends ViewProps {
    readonly onPress: () => void;
    readonly icon: string;
    readonly title: string;
}

export default class CameraButton extends React.PureComponent<CameraButtonProps, any> {
    constructor(props: CameraButtonProps) {
        super(props);
    }

    public render() {
        return (
            <TouchableOpacity
                style={[{ margin: 16, alignItems: 'center', alignContent: 'center' }, this.props.style]}
                onPress={this.props.onPress}>
                <MaterialIcon name={this.props.icon} size={responsiveFontSize(3.3 * 9.5 / 10.3)} color={White} />
                <AppText style={{ color: DirtyWhite, textAlign: 'center' }}>{this.props.title}</AppText>
            </TouchableOpacity>
        );
    }
}
