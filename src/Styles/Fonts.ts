import { Platform } from "react-native";
import { isIOS } from "../Helpers/PhoneHelpers";

type AppFont = "Montserrat";
export const DefaultFontFamily: AppFont = "Montserrat";
export const DefaultAppFont: string = `${DefaultFontFamily}-Regular`;

type AppFontWeight = "Thin" | "Light" | "Regular" | "Medium" | "SemiBold" | "Bold" | "Black";
type FontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

interface Font {
    readonly weights: { [name in AppFontWeight]: FontWeight };
}

type Fonts = {
    readonly [font in AppFont]: Font;
};

interface FontFamilyOptions {
    readonly family?: keyof typeof fonts;
    readonly weight?: AppFontWeight;
}

interface FontFamily {
    readonly fontFamily?: string;
    readonly fontWeight?: FontWeight;
}

const fonts: Fonts = {
    Montserrat: {
        weights: {
            Thin: "100",
            Light: "300",
            Regular: "400",
            Medium: "500",
            SemiBold: "600",
            Bold: "700",
            Black: "900"
        }
    }
};

export default function font(options: FontFamilyOptions): FontFamily {
    let family = options.family ? options.family : DefaultFontFamily;

    if (isIOS()) {
        return {
            fontFamily: family,
            fontWeight: options.weight ? fonts[family].weights[options.weight] : fonts[family].weights.Regular
        };
    }
    else {
        const suffix = options.weight || "";

        return {
            fontFamily: family + (suffix.length > 0 ? `-${suffix}` : "-Regular")
        };
    }
}
