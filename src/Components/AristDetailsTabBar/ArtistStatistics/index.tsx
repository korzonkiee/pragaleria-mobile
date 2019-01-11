import React from "react";
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text } from 'react-native-svg';
import * as Nav from "react-navigation";
import { DirtyWhite, LightBlack } from '../../../Resources/Colors';
import { DefaultAppFont } from '../../../Styles/Fonts';
import AppText from "../../AppText";



class CustomChart extends LineChart {
    renderVerticalLabels = config => {
        const { labels = [], width, height, paddingRight, paddingTop, horizontalOffset = 0 } = config
        const fontSize = 12
        return labels.map((label, i) => {
            let x = ((width - paddingRight) / labels.length * (i)) + paddingRight + horizontalOffset
            let y = (height * 3 / 4) + paddingTop + (fontSize * 2) + 10;
            return (
                <Text
                    x={x}
                    y={y}
                    key={Math.random()}
                    textAnchor="middle"
                    fontSize={fontSize}
                    fill={this.props.chartConfig.color(0.5)}
                    transform={`rotate(-45, ${x}, ${y})`}
                    fontFamily={DefaultAppFont}
                >{label}
                </Text>
            )
        })
    }
}

interface ArtistStatisticsProps {
    readonly artworks: Artwork[];
}

export class ArtistStatistics extends React.PureComponent<ArtistStatisticsProps & Nav.NavigationInjectedProps> {
    render() {
        if (!this.props.artworks || this.props.artworks.length < 1) {
            return <></>;
        }

        let statisticsData = this.props.artworks.reduce(
            (aggregatedData, currentArtwork) => {
                if (currentArtwork.sold && currentArtwork.sold_price && currentArtwork.sold_price != "0,00") {
                    const label = currentArtwork.title.slice(0, 10) + '.';
                    const item = Number(currentArtwork.sold_price.replace(',', '.'));
                    aggregatedData['labels'].push(label);
                    aggregatedData['items'].push(item);
                }
                return aggregatedData;
            }, {
                'labels': [],
                'items': []
            }
        );

        return <View style={{
            flex: 1,
            backgroundColor: DirtyWhite
        }}>
            <CustomChart
                data={{
                    labels: statisticsData.labels,
                    datasets: [{ data: statisticsData.items }]
                }}
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').height / 2}
                chartConfig={{
                    backgroundColor: DirtyWhite,
                    backgroundGradientFrom: DirtyWhite,
                    backgroundGradientTo: DirtyWhite,
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    }
                }}
                style={{
                    marginVertical: 16
                }}
            />
            <AppText style={{ color: LightBlack, flex: 1, textAlign: 'center' }}>
                Wykres cen sprzedaży kolejnych dzieł.
            </AppText>
        </View>
    }
}
