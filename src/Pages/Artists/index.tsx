import React, {Component} from 'react'
import {Text} from 'react-native'
import AppContainer from '../../Components/AppContainer';
import {api_endpoints, api_instance, exhibitions} from "../../Helpers/RestHelpers";


export interface ArtistsProps {
}

export class Artists extends Component<ArtistsProps> {
    componentDidMount() {
        api_instance.get(api_endpoints[exhibitions]) // todo setup cors on localhost and/or fix aws.
            .then(function (response: object) {
                console.log(response);
            })
            .catch(function (error: any) {
                console.log("error");
                console.log(error); // todo use logger and dispatch actions to load again
            })
    }

    render() {
        return <AppContainer>
            <Text>Artists</Text>
        </AppContainer>
    }
}
