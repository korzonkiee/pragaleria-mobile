import React from "react";
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import * as Nav from "react-navigation";
import { CarouselItem } from './CarouselItem';


export interface CarouselProps {
    readonly auction: Auction;
    readonly catalogItems: CatalogItem[];
}

interface CarouselState {
    readonly currentIndex: number;
}

export class CarouselWrapper extends React.Component<CarouselProps & Nav.NavigationInjectedProps, CarouselState> {
    constructor(props: CarouselProps & Nav.NavigationInjectedProps) {
        super(props);

        this.state = {
            currentIndex: 0
        };
    }

    render() {
        const { width } = Dimensions.get('window');
        const itemWidth = width - 50;
        return (
            <View style={{ flex: 1 }}>
                <Carousel
                    style={{ justifyContent: "center", flex: 1 }}
                    data={this.props.catalogItems}
                    renderItem={({ item, index }: { item: any, index: any }) => {
                        return <CarouselItem
                            isAuctionActive={this.props.auction.is_current}
                            catalogItem={item}
                            itemIndex={index}
                            navigation={this.props.navigation} />;
                    }}
                    sliderWidth={width}
                    itemWidth={itemWidth}
                    removeClippedSubviews={true}
                    onSnapToItem={(index) => this.setState({ currentIndex: index })}
                />
            </View>
        )
    }
}
