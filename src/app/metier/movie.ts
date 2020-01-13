import { Actor } from './actor';
import { Rating } from './rating';

export class Movie {
    _id: string;
    title : string;
    realeased : Date;
    genres: Array<string>;
    directors: Array<string>;
    writers: Array<string>;
    actors: Array<Actor>;
    languages: Array<string>;;
    poster: string;
    plot : string;
    ratings: Array<Rating>;
    countrires: Array<string>;;
    imdbid : string;
    views : number;
    avgRating : number; //Avg of ratings value
}
