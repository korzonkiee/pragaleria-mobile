import React, {Component} from 'react';
import * as Nav from "react-navigation";
import {WebView, View, Text, WebViewProps, NavState, WebViewHtmlSource} from "react-native";
import { Dimensions } from "react-native";
// import {colors, measures} from '../settings';

const deviceWidth = Dimensions.get('window').width;
const BODY_TAG_PATTERN = /\<\/ *body\>/;

var script = `
;(function() {
    var wrapper = document.createElement("div");
    wrapper.id = "height-wrapper";
    while (document.body.firstChild) {
        wrapper.appendChild(document.body.firstChild);
    }
    document.body.appendChild(wrapper);
    var i = 0;
    function updateHeight() {
        document.title = wrapper.clientHeight;
        window.location.hash = ++i;
    }
    updateHeight();
    window.addEventListener("load", function() {
        updateHeight();
        setTimeout(updateHeight, 1000);
    });
    window.addEventListener("resize", updateHeight);
}());
`;


const style = `
<script>
${script}
</script>
`;

export interface WebViewAutoHeightProps {
    readonly minHeight: number;
}

interface WebViewAutoHeightState {
    readonly realContentHeight: number;
}

const codeInject = (html: string) => html.replace(BODY_TAG_PATTERN, style + "</body>");

export default class WebViewAutoHeight extends Component<WebViewAutoHeightProps & WebViewProps, WebViewAutoHeightState>{
    constructor(props: WebViewAutoHeightProps){
        super(props);

        this.state = {
            realContentHeight: this.props.minHeight
        }
    }

    handleNavigationChange(navState: NavState) {
        if (navState && navState.title) {
            const realContentHeight = parseInt(navState.title, 10) || 0;
            console.log(realContentHeight);
            this.setState({realContentHeight});
        }
        if (typeof this.props.onNavigationStateChange === "function") {
            this.props.onNavigationStateChange(navState);
        }
    }

    render() {
        const {source, style, minHeight, ...otherProps} = this.props;
        const realContentHeight = this.state.realContentHeight;
        const htmlSource = this.props.source as WebViewHtmlSource
        const html = htmlSource.html;

        if (!html) {
            throw new Error("WebViewAutoHeight supports only source.html");
        }

        if (!BODY_TAG_PATTERN.test(html)) {
            throw new Error("Cannot find </body> from: " + html);
        }

        return (
            <View style={{height: Math.max(realContentHeight, minHeight)}}>
                <WebView
                    {...otherProps}
                    source={{html: codeInject(html)}}
                    scrollEnabled={false}
                    style={[{height: Math.max(realContentHeight, minHeight)},style]}
                    javaScriptEnabled
                    onNavigationStateChange={(data) => {
                        this.handleNavigationChange(data);
                    }}
                />
            </View>
        );
    }

}
