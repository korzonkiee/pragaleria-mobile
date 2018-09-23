import React, {Component} from 'react'
import {Text} from 'react-native'
import AppContainer from '../../Components/AppContainer';
import {api_endpoints, api_instance, artists} from "../../Helpers/RestHelpers";


export interface ArtistsProps {
}

export class Artists extends Component<ArtistsProps> {
    componentDidMount() {
        api_instance.get(api_endpoints[artists])
            .then(function (response: object) {
                console.log(response);
            })
            .catch(function (error: any) {
                console.log(error);
            })
    }

    render() {
        return <AppContainer>
            <Text>Artists</Text>
        </AppContainer>
    }
}
