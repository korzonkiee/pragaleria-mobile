import { ActivityIndicator } from "react-native";
import styles from "./styles";
import React from "react";

export default function CenteredActivityIndicator() {
    return (
        <ActivityIndicator animating size="large" style={styles.activityIndicator} />
    )
}
