import React from "react";
import * as Nav from "react-navigation";
import { createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import { Black, White } from "../../Resources/Colors";
import { l } from "../../Services/Language";
import font from "../../Styles/Fonts";
import { ExihibitionsList } from '../ExhibitionsList';

interface ExhibitionsTabBarProps {
    readonly incomingExhibitions: Array<Exhibition>;
    readonly closedExhibitions: Array<Exhibition>;
}

export class ExhibitionsTabBar extends React.PureComponent<ExhibitionsTabBarProps & Nav.NavigationInjectedProps> {
    render() {
        const tabBarStyle = {
            backBehavior: 'none',
            optimizationsEnabled: true,
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
            [l("Exhibitions.Incoming")]: () => <ExihibitionsList navigation={this.props.navigation}
                exhibitions={this.props.incomingExhibitions}
                artworksNotFoundMessage={l("Exhibitions.NoIncomingExhibitions")} />,
            [l("Exhibitions.Closed")]: () => <ExihibitionsList navigation={this.props.navigation}
                exhibitions={this.props.closedExhibitions}
                artworksNotFoundMessage={l("Exhibitions.NoClosedExhibitions")} />,
        };

        const Tab = createAppContainer(createMaterialTopTabNavigator(pages, tabBarStyle));
        return <Tab />
    }
}
