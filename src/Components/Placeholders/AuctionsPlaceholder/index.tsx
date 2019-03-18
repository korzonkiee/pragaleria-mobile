import { ActivityIndicator, View } from "react-native";
import styles from "./styles";
import React from "react";
import AppHeader from "../../AppHeader";
import Placeholder from "rn-placeholder";
import { screenWidth } from "../../../Styles/Dimensions";

export default function AuctionsPlaceholder() {
    const size = screenWidth;
    const animate = "fade";
    const lineNumber = 2;
    const lineSpacing = 8;
    const lastLineWidth = "30%"

    return (
        <>
            <View style={{
                marginBottom: 16,
                marginLeft: 16,
                marginRight: 16,
                marginTop: 48
            }}>
                <Placeholder.Media
                    size={size}
                    animate={animate} />
                <Placeholder.Paragraph
                    size={30}
                    animate={animate}
                    lineNumber={4}
                    lineSpacing={5}
                    lastLineWidth="30%" />
                <View style={styles.spacing} />
                <Placeholder.Media
                    size={size}
                    animate={animate} />
                <Placeholder.Paragraph
                    size={30}
                    animate={animate}
                    lineNumber={4}
                    lineSpacing={5}
                    lastLineWidth="30%" />
            </View>
        </>
    )
}
