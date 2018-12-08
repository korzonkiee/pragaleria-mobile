import { ActivityIndicator, View, FlatList } from "react-native";
import styles from "./styles";
import React from "react";
import AppHeader from "../../AppHeader";
import Placeholder from "rn-placeholder";
import { screenWidth } from "../../../Styles/Dimensions";
import { Black, DirtyWhite } from '../../../Resources/Colors';

export default function ArtistsPlaceholder() {
    return (
        <View style={{
            justifyContent: 'space-between',
            backgroundColor: DirtyWhite,
            height: "100%",
        }}>
            <FlatList
                data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
                keyExtractor={(item, _) => item.toString()}
                renderItem={
                    () => <View style={{ margin: 2 }}>
                        <Placeholder.Media size={(screenWidth / 3)} />
                    </View>
                }
                numColumns={3}
            />
        </View>
    )
}
