import * as React from "react";
import { StyleProp, TextInput, View, ViewStyle } from "react-native";
import * as Progress from "react-native-progress";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as colors from "../../Resources/Colors";
import { responsiveFontSize, responsiveWidth } from "../../Styles/Dimensions";
import styles from "./styles";



export interface SearchBarStateProps {
    readonly isLoading: boolean;
}

interface SearchBarState {
    readonly textChangedTimeoutMs: number | null;
}

interface SearchBarOwnProps {
    readonly style?: StyleProp<ViewStyle>;
    readonly textInputStyle?: StyleProp<ViewStyle>;
    readonly value?: string;
    readonly placeholder?: string;
    readonly withBackground?: boolean;
    readonly rightButtonDisabled?: boolean;
    readonly onTextChanged: (text: string) => void;
    readonly onSearchingStarted?: (text: string) => void;
    readonly onPressRight?: () => void;
    readonly toolbarVisible?: boolean; // Visible by default
    readonly progressBarVisible?: boolean; // Visible by default
}

export class SearchBar extends React.PureComponent<SearchBarOwnProps & SearchBarStateProps, SearchBarState> {
    constructor(props: SearchBarOwnProps & SearchBarStateProps) {
        super(props);

        this.state = {
            textChangedTimeoutMs: null
        };
    }

    render() {
        const onPressRight = this.props.onPressRight;

        return <View style={styles.headerContainer}>
            {(this.props.toolbarVisible === undefined || this.props.toolbarVisible === true) &&
                <View style={[this.props.style, styles.header, this.props.withBackground && { backgroundColor: colors.White }]}>
                    <View style={styles.leftButton}>
                        <Icon name={"magnifier"} size={responsiveFontSize(2.2)} style={styles.buttonContent} />
                    </View>
                    <View style={styles.title}>
                        <TextInput style={[styles.titleText]}
                            onChangeText={(text: string) => { this.onTextChangeWrapper(text) }}
                            value={this.props.value}
                            placeholder={this.props.placeholder} />
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

    private onTextChangeWrapper(text: string) {
        if (this.props.onSearchingStarted)
            this.props.onSearchingStarted(text);

        if (this.state.textChangedTimeoutMs)
            clearTimeout(this.state.textChangedTimeoutMs);

        this.setState({
            textChangedTimeoutMs: setTimeout(
                () => {
                    this.props.onTextChanged(text);
                }, 500
            )
        });
    }
}
