import Logger from "./Logger";
import { Artist } from "../Models/Artist";
import AxiosClient from "./AxiosClient";

const TAG: string = "API";

export async function getArtists(): Promise<Artist[] | null> {
    return await get<Artist[]>("artists");
}

export async function getExhibitions(): Promise<Artist[] | null> {
    return await get<Artist[]>("exhibitions");
}

export async function getAuctions(): Promise<Artist[] | null> {
    return await get<Artist[]>("auctions");
}

async function get<TResult>(endpoint: string): Promise<TResult | null> {
    let result = await AxiosClient.get<TResult>(endpoint);
    if (result && wasSuccessfull(result.status)) {
        return result.data;
    }
    else {
        Logger.logError(TAG, `Error while requesting ${endpoint} endpoint.`);
        return null;
    }
}

function wasSuccessfull(status: number) {
    return status == 200 ? true : false;
}
