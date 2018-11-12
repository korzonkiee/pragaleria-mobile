import { ActivityIndicator, View } from "react-native";
import styles from "./styles";
import React from "react";
import AppHeader from "../../AppHeader";
import Placeholder from "rn-placeholder";

export default function ArtistDetailsPlaceholder() {
    const size = 90;
    const animate = "fade";
    const lineNumber = 2;
    const lineSpacing = 8;
    const lastLineWidth = "30%"

    return (
        <>
            <AppHeader
                withBackground/>
            <View style={styles.spacing}>
                <Placeholder.Paragraph
                    size={150}
                    animate={animate}
                    lineNumber={4}
                    lineSpacing={5}
                    lastLineWidth="30%"/>
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
