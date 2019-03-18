import React from "react";
import { View } from "react-native";
import Placeholder from "rn-placeholder";
import AppHeader from "../../AppHeader";
import styles from "./styles";

export default function ArtistDetailsPlaceholder() {
    const size = 90;
    const animate = "fade";
    const lineNumber = 2;
    const lineSpacing = 8;
    const lastLineWidth = "30%"

    return (
        <>
            <AppHeader
                withBackground />
            <View style={{
                marginBottom: 16,
                marginLeft: 16,
                marginRight: 16,
                marginTop: 48
            }}>
                <View style={styles.spacing} />
                <Placeholder.ImageContent
                    size={size}
                    animate={animate}
                    lineNumber={lineNumber}
                    lineSpacing={lineSpacing}
                    lastLineWidth={lastLineWidth} />
                <View style={styles.spacing} />
                <Placeholder.ImageContent
                    size={size}
                    animate={animate}
                    lineNumber={lineNumber}
                    lineSpacing={lineSpacing}
                    lastLineWidth={lastLineWidth} />
                <View style={styles.spacing} />
                <Placeholder.ImageContent
                    size={size}
                    animate={animate}
                    lineNumber={lineNumber}
                    lineSpacing={lineSpacing}
                    lastLineWidth={lastLineWidth} />
                <View style={styles.spacing} />
                <Placeholder.ImageContent
                    size={size}
                    animate={animate}
                    lineNumber={lineNumber}
                    lineSpacing={lineSpacing}
                    lastLineWidth={lastLineWidth} />
            </View>
        </>
    )
}
