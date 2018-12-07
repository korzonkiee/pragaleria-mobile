// import { View, TouchableOpacity } from "react-native";
// import { getStatusBarHeight } from "../../Helpers/PhoneHelpers";
// import React from "react";
// import styles from "./styles";
// import { NavigationState, Key, RouteBase, SceneRendererProps } from "react-native-tab-view";
// import { GreyLight, Black } from "../../Resources/Colors";

// function AppTabBar(props: SceneRendererProps<RouteBase>) {
//     const inputRange = props.navigationState.routes.map((_, i) => i);

//     return <View style={styles.tabBar}>
//         {props.navigationState.routes.map((route, i) => {
//             const color = props.position.interpolate({
//                 inputRange: inputRange,
//                 outputRange: inputRange.map(idx => (idx === i ? Black : GreyLight))
//             });

//             return (
//                 <TouchableOpacity
//                     style={
//                         {
//                             flex: 1,
//                             alignItems: 'center',
//                             padding: 16,
//                         }
//                     }
//                     onPress={() => this.setState({ index: i })}>
//                     <AnimatedAppText style={{ color }}>{route.title}</AnimatedAppText>
//                 </TouchableOpacity>
//             );
//         })}
//     </View>;
// }
