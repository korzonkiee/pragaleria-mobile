import {backend_api_url} from "../Configuration";
import {Artist} from "../Modules/Artists";

const axios = require('axios');
export const api_instance = axios.create({
    baseURL: `${backend_api_url}/mocks/`
});

export const auctions = "auctions";
export const exhibitions = "exhibitions";
export const artists = "artists";
export const api_endpoints = {
    auctions: `${auctions}`,
    exhibitions: `${exhibitions}`,
    artists: `${artists}`
};

type ApiReponseArtists = {
    config: any;
    data: Artist[];
    header: any;
    request: any;
}

export async function api_call_get_artists(): Promise<Artist[]> {
    return api_instance.get(api_endpoints[artists])
        .then(function (response: ApiReponseArtists) {
            console.log("Received:", response);
            return response.data.map(d => new Artist(d.author, d.thumbnail));
        })
        .catch(function (error: any) {
            console.log(error);
        })
}
