import React, {Component} from 'react';
import * as Nav from "react-navigation";
import {WebView, View, Text, WebViewProps, NavState, WebViewHtmlSource} from "react-native";
import { isIOS } from '../../Helpers/PhoneHelpers';

export interface WebViewCustomizedProps {
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
                    font-family: MyFont;
                    font-size: medium;
                }
            </style>
        </head>

        <body>` + this.props.innerHtml + `</body>

        </html>`
        return (
            <WebView
                source={{html: html, baseUrl: ""}}
                style={this.props.style}
            />
        );
    }

}
