export class Artist {
    id: number;
    name: string;
    slug: string;
    thumbnail: string;

    constructor(id: number, name: string, slug: string, thumbnail: string) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.thumbnail = thumbnail;
    }
}
