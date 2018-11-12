import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const maxScreenDiagonal = 750;

export const screenWidth = width;

export const responsiveHeight = (h: number) => {
    return height * (h / 100);
};

export const responsiveWidth = (w: number) => {
    return width * (w / 100);
};

export const responsiveFontSize = (f: number) => {
    return Math.min(maxScreenDiagonal, Math.sqrt((height * height) + (width * width))) * (f / 100);
};
