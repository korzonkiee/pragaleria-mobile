import {backend_api_url} from "../Configuration";

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
