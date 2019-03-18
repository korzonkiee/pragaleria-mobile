import { NativeModules } from "react-native";
import { isAndroid } from "../Helpers/PhoneHelpers";
import langPl from "../Resources/Languages/pl";

let keys: LanguageType = {} as any;

for (let key of Object.keys(langPl)) {
    (keys as any)[key] = `{${key}}`;
}

const languages = {
    "pl": { ...keys, ...langPl },
    "keys": keys
};

type LanguageType = typeof langPl;
type Language = keyof typeof languages;

let currentLanguage: LanguageType;
let currentLanguageName: string;

initializeLanguage();

function initializeLanguage() {
    [currentLanguage, currentLanguageName] = getPhoneLanguage();
}

function getPhoneLanguage(): [LanguageType, string] {
    let langRegionLocale;

    if (isAndroid()) {
        langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
    } else {
        langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || "";
    }

    let langLocale: string = langRegionLocale.substring(0, 2);
    return langLocale in languages ?
        [languages[langLocale as Language], langLocale] :
        [languages["pl"], "pl"];
}

export function l<K extends keyof LanguageType>(key: K) {
    return currentLanguage[key];
}

export function lp<K extends keyof LanguageType>(key: K, ...params: string[]) {
    let query = l(key);
    for (let i = 0; i < params.length; i++) {
        query = query.replace(`{${i}}`, params[i]);
    }
    return query;
}
