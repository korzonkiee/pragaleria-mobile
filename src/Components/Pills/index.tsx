import * as React from "react";
import { ScrollView, StyleProp, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { Black, LightBlack, White } from "../../Resources/Colors";
import AppText from "../AppText";
import styles from "./styles";

export interface Pill {
    key: number,
    value: string
}

interface PillsProps {
    readonly pills: Pill[];
    readonly onPillPressed: (pill: Pill) => void;
    readonly selectedPill?: number;
}

interface PillsState {
    readonly selectedPill: number | undefined;
}

export class Pills extends React.PureComponent<PillsProps, PillsState> {
    constructor(props: PillsProps) {
        super(props);

        this.state = {
            selectedPill: props.selectedPill,
        };
    }

    render() {
        return (<ScrollView style={styles.pillsContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {this.props.pills.map(pill => {
                return (<TouchableWithoutFeedback key={pill.key} onPress={() => this.onPillPressed(pill)}>
                    <View style={[styles.pill, this.getSelectedPillContainerStyle(pill)]}>
                        <AppText style={[styles.pillText, this.getSelectedPillTextStyle(pill)]}>
                            {pill.value}
                        </AppText>
                    </View>
                </TouchableWithoutFeedback>)
            })}
        </ScrollView>);
    }

    private onPillPressed(pill: Pill) {
        this.setState({
            selectedPill: pill.key
        }, () => this.props.onPillPressed(pill))
    }

    private getSelectedPillContainerStyle(pill: Pill): StyleProp<ViewStyle> {
        if (this.isPillSelected(pill)) {
            return {
                backgroundColor: LightBlack,
                elevation: 0
            };
        } else {
            return {
                backgroundColor: White,
                elevation: 2
            };
        }
    }

    private getSelectedPillTextStyle(pill: Pill): StyleProp<TextStyle> {
        if (this.isPillSelected(pill)) {
            return {
                color: White
            };
        } else {
            return {
                color: Black
            };
        }
    }

    private isPillSelected(pill: Pill) {
        return this.state.selectedPill ?
            this.state.selectedPill === pill.key :
            false;
    }
}
