import React from "react";
import { View } from "react-native";
import Placeholder from "rn-placeholder";
import styles from "./styles";

export default function ArtworksPlaceholder() {
    const size = 90;
    const animate = "fade";
    const lineNumber = 2;
    const lineSpacing = 8;
    const lastLineWidth = "30%"

    return (
        <>
            <View style={{
                marginBottom: 1,
                marginLeft: 1,
                marginRight: 1,
                marginTop: 1
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
