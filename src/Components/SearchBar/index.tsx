import * as React from "react";
import { StyleProp, TextInput, View, ViewStyle } from "react-native";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/Entypo";
import * as colors from "../../Resources/Colors";
import { l } from "../../Services/Language";
import { responsiveFontSize, responsiveWidth } from "../../Styles/Dimensions";
import styles from "./styles";



export interface SearchBarStateProps {
    readonly isLoading: boolean;
}

interface SearchBarOwnProps {
    readonly style?: StyleProp<ViewStyle>;
    readonly textInputStyle?: StyleProp<ViewStyle>;
    readonly value?: string;
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
                            value={this.props.value}
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
