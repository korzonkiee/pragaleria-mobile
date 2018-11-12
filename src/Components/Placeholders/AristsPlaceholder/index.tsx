import { ActivityIndicator, View, FlatList } from "react-native";
import styles from "./styles";
import React from "react";
import AppHeader from "../../AppHeader";
import Placeholder from "rn-placeholder";
import { screenWidth } from "../../../Styles/Dimensions";

export default function ArtistsPlaceholder() {
    const size = 90;
    const animate = "fade";
    const lineNumber = 2;
    const lineSpacing = 8;
    const lastLineWidth = "30%"

    return (
        <>
            <View style={[styles.spacing, {justifyContent: 'center'}]}>
               <FlatList
                    data={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
                    keyExtractor={(item, _) => item.toString()}
                    renderItem={() => <View style={{ margin: 4 }}><Placeholder.Media size={(screenWidth / 2) - 24} /></View>}
                    numColumns={2}
               />
            </View>
        </>
    )
}
