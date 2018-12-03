import * as React from "react";
import * as Nav from "react-navigation";
import * as Progress from "react-native-progress";
import { StyleProp, TextStyle, ViewStyle, View, TouchableWithoutFeedback, Animated } from "react-native";

import { responsiveFontSize, responsiveWidth } from "../../Styles/Dimensions"
import { isIOS } from "../../Helpers/PhoneHelpers"
import { l } from "../../Services/Language";

import * as colors from "../../Resources/Colors";
import styles, { errorBarHeight } from "./styles";
import AppText from "../AppText";
import Icon from "react-native-vector-icons/MaterialIcons";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";
import { White, LightGray, LightBlack } from '../../Resources/Colors';
import AppModal from '../AppModal';


export interface AppHeaderStateProps {
    readonly isLoading: boolean;
    readonly errorVisible: boolean;
}

export interface AppHeaderDispatchProps {
    readonly hideError: () => void;
}

interface AppHeaderOwnProps {
    readonly title?: string;
    readonly showLogoAsTitle?: boolean;
    readonly titleStyle?: StyleProp<ViewStyle | TextStyle>;
    readonly style?: StyleProp<ViewStyle>;
    readonly withBackground?: boolean;
    readonly leftButtonDisabled?: boolean;
    readonly rightTitle?: string;
    readonly rightButtonDisabled?: boolean;
    readonly onPressLeft?: () => void;
    readonly onPressRight?: () => void;
    readonly disableBackButtonWhenLoading?: boolean;
    readonly toolbarVisible?: boolean; // Visible by default
    readonly progressBarVisible?: boolean; // Visible by default
    readonly modalContent?: any;
}

interface AppHeaderState {
    readonly modalVisible: boolean;
    readonly errorVisible: boolean;
    readonly errorAnimation: Animated.Value;
}

type AppHeaderProps = AppHeaderStateProps & AppHeaderDispatchProps & AppHeaderOwnProps & Nav.NavigationInjectedProps;

export class AppHeader extends React.PureComponent<AppHeaderProps, AppHeaderState> {
    constructor(props: AppHeaderProps) {
        super(props);

        this.state = {
            modalVisible: false,
            errorVisible: false,
            errorAnimation: new Animated.Value(0)
        };
    }

    componentDidMount() {
        if (this.props.errorVisible && !this.state.errorVisible) {
            this.showError(false);
        }
    }

    componentDidUpdate(_prevProps: AppHeaderProps, prevState: AppHeaderState) {
        if (this.props.errorVisible && !this.state.errorVisible && !prevState.errorVisible) {
            this.showError();
        }
    }

    render() {
        const onPressLeft = this.props.onPressLeft || this.goBack;
        const onPressRight = this.props.onPressRight;

        return <View style={styles.headerContainer}>
            {(this.props.modalContent !== undefined && <AppModal modalContent={this.props.modalContent} modalVisible={this.state.modalVisible} onPress={this.hideModal}/>)}
            {(this.props.toolbarVisible === undefined || this.props.toolbarVisible === true) &&
            <View style={[this.props.style, styles.header, this.props.withBackground && { backgroundColor: colors.White }]}>
                <View style={styles.leftButton}>
                    {!this.props.leftButtonDisabled && <TouchableWithoutFeedback
                        onPress={this.props.disableBackButtonWhenLoading ? (this.props.isLoading ? undefined : onPressLeft) : onPressLeft} >
                        { <Icon name={"arrow-back"} size={responsiveFontSize(3.3)} style={styles.buttonContent} />}
                    </TouchableWithoutFeedback>}
                </View>
                <View style={styles.title}>
                    {this.props.showLogoAsTitle ? <Icon name={"logo"} style={[styles.titleIcon, this.props.titleStyle]} /> :
                    <AppText style={[styles.titleText, this.props.titleStyle]}>{this.props.title}</AppText>}
                </View>
                <View style={styles.rightButton}>
                    {!this.props.rightButtonDisabled && <TouchableWithoutFeedback onPress={this.showModal}>
                        <AppText numberOfLines={1} style={[styles.buttonContent, { fontSize: responsiveFontSize(1.8) }]}>
                            <SimpleIcon name={"info"} size={responsiveFontSize(3)} style={styles.buttonContent} />
                        </AppText>
                    </TouchableWithoutFeedback>}
                </View>
            </View>}
            {this.state.errorVisible &&
                <Animated.View
                    style={[styles.errorBar, {
                        height: this.state.errorAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, errorBarHeight]})
                    }]}>
                <Animated.Text style={[styles.errorBarTitle, isIOS() && {
                    lineHeight: this.state.errorAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, errorBarHeight]})
                }]}>{l("Common.NetworkError")}</Animated.Text>
            </Animated.View>}
            <View style={{ flex: 1 }}>
                {this.props.isLoading && !this.state.errorVisible && (this.props.progressBarVisible === undefined || this.props.progressBarVisible === true) &&
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

    private showModal = () => {
        this.setState({ modalVisible: true });
    }

    private hideModal = () => {
        this.setState({ modalVisible: false });
    }

    private goBack = () => {
        this.props.navigation.goBack();
    }

    private showError = (animatedIn: boolean = true) => {
        this.setState({ errorVisible: true, errorAnimation: new Animated.Value(0) }, async () => {
            Animated.timing(
                this.state.errorAnimation,
                { toValue: 1, duration: animatedIn ? 400 : 0 }
            ).start(async _ => await this.hideError());
        });
    }

    private hideError = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                Animated.timing(
                    this.state.errorAnimation,
                    { toValue: 0, duration: 300 }
                ).start(() => {
                    this.setState({ errorVisible: false }, () => {
                        this.props.hideError();
                        resolve();
                    });
                });
            }, 4000);
        });
    }
}
