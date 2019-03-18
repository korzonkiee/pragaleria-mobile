import React from "react";
import * as Nav from "react-navigation";
import { createAppContainer, createMaterialTopTabNavigator, TabNavigatorConfig } from "react-navigation";
import { Black, White } from "../../Resources/Colors";
import { l } from "../../Services/Language";
import font from "../../Styles/Fonts";
import { ExihibitionsList } from '../ExhibitionsList';

interface ExhibitionsTabBarProps {
    readonly incomingExhibitions: Array<Exhibition>;
    readonly closedExhibitions: Array<Exhibition>;
}

const incomingTab = l("Exhibitions.Incoming");
const closedTab = l("Exhibitions.Closed");

export class ExhibitionsTabBar extends React.PureComponent<ExhibitionsTabBarProps & Nav.NavigationInjectedProps> {
    render() {
        const tabBarStyle: TabNavigatorConfig = {
            backBehavior: 'none',
            initialRouteName: this.getInitialTab(),
            tabBarOptions: {
                upperCaseLabel: false,
                labelStyle: {
                    ...font(),
                    color: Black
                },
                style: {
                    backgroundColor: White
                },
                indicatorStyle: {
                    backgroundColor: 'black'
                }
            }
        };

        const pages = {
            [incomingTab]: () => <ExihibitionsList navigation={this.props.navigation}
                exhibitions={this.props.incomingExhibitions}
                artworksNotFoundMessage={l("Exhibitions.NoIncomingExhibitions")} />,
            [closedTab]: () => <ExihibitionsList navigation={this.props.navigation}
                exhibitions={this.props.closedExhibitions}
                artworksNotFoundMessage={l("Exhibitions.NoClosedExhibitions")} />,
        };

        const Tab = createAppContainer(createMaterialTopTabNavigator(pages, tabBarStyle));
        return <Tab />
    }

    private getInitialTab() {
        if (this.props.incomingExhibitions.length === 0) {
            return closedTab;
        } else {
            return incomingTab;
        }
    }
}
