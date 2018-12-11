import * as React from "react";
import * as Nav from "react-navigation";
import * as Progress from "react-native-progress";
import { StyleProp, TextStyle, ViewStyle, View, TouchableWithoutFeedback, Animated, TextInput } from "react-native";

import { responsiveFontSize, responsiveWidth } from "../../Styles/Dimensions"
import { isIOS } from "../../Helpers/PhoneHelpers"
import { l } from "../../Services/Language";

import * as colors from "../../Resources/Colors";
import styles from "./styles";
import AppText from "../AppText";
import Icon from "react-native-vector-icons/Entypo";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";
import { White, LightGray, LightBlack } from '../../Resources/Colors';
import AppModal from '../AppModal';

export interface SearchBarStateProps {
    readonly isLoading: boolean;
}

interface SearchBarOwnProps {
    readonly style?: StyleProp<ViewStyle>;
    readonly textInputStyle?: StyleProp<ViewStyle>;
    readonly withBackground?: boolean;
    readonly rightButtonDisabled?: boolean;
    readonly onTextChanged: (text: string) => void;
    readonly onPressRight?: () => void;
    readonly toolbarVisible?: boolean; // Visible by default
    readonly progressBarVisible?: boolean; // Visible by default
}

export class SearchBar extends React.PureComponent<SearchBarOwnProps & SearchBarStateProps> {
    render() {
        const onPressRight = this.props.onPressRight;

        return <View style={styles.headerContainer}>
            {(this.props.toolbarVisible === undefined || this.props.toolbarVisible === true) &&
                <View style={[this.props.style, styles.header, this.props.withBackground && { backgroundColor: colors.White }]}>
                    <View style={styles.leftButton}>
                        <Icon name={"magnifying-glass"} size={responsiveFontSize(3.3)} style={styles.buttonContent} />
                    </View>
                    <View style={styles.title}>
                        <TextInput style={[styles.titleText]}
                            onChangeText={this.props.onTextChanged}
                            placeholder={l("Artists.Search.Placeholder")} />
                    </View>
                </View>}
            <View style={{ flex: 1 }}>
                {this.props.isLoading && (this.props.progressBarVisible === undefined || this.props.progressBarVisible === true) &&
                    <Progress.Bar
                        width={responsiveWidth(100)}
                        useNativeDriver
                        indeterminate
                        color={colors.Main}
                        unfilledColor={"white"}
                        borderRadius={0}
                        borderWidth={0}
                        style={styles.loadingBar} />}
            </View>
        </View>;
    }
}
