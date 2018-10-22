import Logger from "./Logger";
import { Artist } from "../Models/Artist";
import AxiosClient from "./AxiosClient";
import AxiosMockAdapter from "axios-mock-adapter";
import { ArtistDetails } from "../Pages/Artists/ArtistsDetails";

const TAG: string = "API";

export async function getArtists(page?: number): Promise<Artist[] | null> {
    return await get<Artist[]>(`authors?page=${page ? page : 0}`);

export function getArtistDetails(id: number): Promise<ArtistDetails | null> {
    return get<ArtistDetails>(`authors/${id}`);
}

export async function getExhibitions(): Promise<Artist[] | null> {
    return await get<Artist[]>("exhibitions");
}

export async function getAuctions(): Promise<Artist[] | null> {
    return await get<Artist[]>("auctions");
}

function mock() {
    let mock = new AxiosMockAdapter(AxiosClient);
    mock.onGet('/artists').replyOnce(200, [{"id": 52, "name": "Dominika Hofman", "slug": "dominika-hofman", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/552d6af44f399.jpg"}, {"id": 53, "name": "Marcin Painta", "slug": "marcin-painta", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1467806639.jpg"}, {"id": 54, "name": "Renata Magda", "slug": "renata-magda", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1467807963.jpg"}, {"id": 55, "name": "Agata Biernacka", "slug": "agata-biernacka", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1447689966.jpg"}, {"id": 56, "name": "Joanna Półkośnik", "slug": "joanna-polkosnik", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1466348613.jpg"}, {"id": 57, "name": "Lenka Kubica", "slug": "lenka-kubica", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1464886742.jpg"}, {"id": 58, "name": "Bartek Górny", "slug": "bartek-gorny", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1467724860.jpg"}, {"id": 59, "name": "Marcelina Rydelek", "slug": "marcelina-rydelek", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1464887651.jpg"}, {"id": 60, "name": "Magdalena Szyszkowska", "slug": "magdalena-szyszkowska", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/552d6b0eb7502.jpg"}, {"id": 61, "name": "Magdalena Szilke", "slug": "magdalena-szilke", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1440768621.jpg"}, {"id": 62, "name": "Edyta Hul", "slug": "edyta-hul", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1453211721.jpg"}, {"id": 63, "name": "Wojciech Brewka", "slug": "wojciech-brewka", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1447689405.jpg"}, {"id": 64, "name": "Agnieszka Kirzanowska-Osińska", "slug": "agnieszka-kirzanowska-osinska", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1466349299.jpg"}, {"id": 65, "name": "Monika Misztal", "slug": "monika-misztal", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1471086752.jpg"}, {"id": 66, "name": "Ziemowit Fincek", "slug": "ziemowit-fincek", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1467714732.jpg"}, {"id": 67, "name": "Agata Bajszczak", "slug": "agata-bajszczak", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/552d74b528212.jpg"}, {"id": 68, "name": "Agnieszka Butkowska", "slug": "agnieszka-butkowska", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1458051576.jpg"}, {"id": 69, "name": "Agnieszka Łapka", "slug": "agnieszka-lapka", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/552d74b8bdf42.jpg"}, {"id": 70, "name": "Dominik Smolik", "slug": "dominik-smolik", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1464885418.jpg"}, {"id": 71, "name": "Kuba Janyst", "slug": "kuba-janyst", "thumbnail": "http://pragaleria.pl/wp-content/uploads/2017/03/1442747479.jpg"}]);
}

async function get<TResult>(endpoint: string): Promise<TResult | null> {
    console.log(endpoint);
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
