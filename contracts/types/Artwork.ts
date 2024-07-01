export type Artwork = {
    artworkId: number;
    name: string;
    description: string;
    image: string;
    price: number;
    artistID: number;
    isPublic: boolean;
    isBuyAvailable: boolean;
    artworkRating: number;
    artworkDate: Date;
    genreId: number;
    genreName: string;
    membersRated: number[];
}
