import React, {Component} from 'react';
import {WebViewProps} from "react-native";
import { isIOS } from '../../Helpers/PhoneHelpers';
import WebViewAutoHeight from 'react-native-webview-autoheight';

export interface WebViewCustomizedProps {
    readonly backgroundColor: string;
    readonly font: string;
    readonly innerHtml: string;
}

export default class WebViewCustomized extends Component<WebViewCustomizedProps & WebViewProps>{
    constructor(props: WebViewCustomizedProps){
        super(props);
    }

    render() {
        if (isIOS()) {
            throw new Error("Missing iOS implementation.");
        }

        let fontFilePath = `file:///android_asset/fonts/${this.props.font}.ttf`;
        let html = `<html>
        <head>
            <style type="text/css">
                @font-face {
                    font-family: MyFont;
                    src: url(${fontFilePath})
                }

                body {
                    background-color: ${this.props.backgroundColor};
                    font-family: MyFont;
                    font-size: medium;
                }
            </style>
        </head>
        <body>${this.props.innerHtml}</body></html>`;

        return (
            <WebViewAutoHeight
                {...this.props}
                source={{html: html, baseUrl: ""}}
                startInLoadingState={true}
                style={this.props.style}
            />
        );
    }

}
