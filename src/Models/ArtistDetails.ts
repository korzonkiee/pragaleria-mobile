export class ArtistDetails {
    id: number;
    name: string;
    slug: string;
    artworks: Artwork[];

    constructor(id: number, name: string, slug: string, artworks: Artwork[]) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.artworks = artworks;
    }
}

export class Artwork {
    id: number;
    title: string;
    description: string;
    sold: string;
    initial_price: string;
    price: string;
    year: string;
    thumbnail: string;

    constructor(id: number, title: string, description: string,
        sold: string, initial_price: string, price: string,
        year: string, thumbnail: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.sold = sold;
        this.initial_price = initial_price;
        this.price = price;
        this.year = year;
        this.thumbnail = thumbnail;
    }
}
