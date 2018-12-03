import React from "react";
import { TouchableWithoutFeedback, View, ImageBackground } from "react-native";
import styles from "./styles";
import AppText from "../AppText";
import Modal from "react-native-modal";
import { l } from "../../Services/Language";

export interface AppModalProps {
    readonly modalVisible: boolean;
    readonly modalContent: any;
    readonly onPress?: () => void;
}

export default class AppModal extends React.PureComponent<AppModalProps> {
    render() {
        return <View style={styles.modalContainer}>
            <Modal isVisible={this.props.modalVisible} hideModalContentWhileAnimating={true}>
                <View style={styles.modalContent}>
                    {this.props.modalContent}
                    <View style= {styles.closeButtonContainer}>
                        <TouchableWithoutFeedback onPress={this.props.onPress}>
                            <AppText style={styles.closeButtonText}>
                                {l("Modal.Close")}
                            </AppText>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        </View>
    }
}
