import firebase from "firebase/compat";
import { ImdbDescription } from "../../shared/types/imdb";
import Timestamp = firebase.firestore.Timestamp;

export type MovieType = {
  id: string;
  name: string;
  author?: string;
  watchDate?: Date;
  releaseDate?: Timestamp;
  genre?: Array<string>;
  rating?: number;
  liked: boolean;
  meta?: Meta;
  imdb?: ImdbDescription;
  titleImageUrl?: string;
  titleImageUrlHeight?: string;
  titleImageUrlWidth?: string;
  watched?: boolean;
  suggestions?: Suggestion;
};

export type Suggestion = {
  suggestionId: string;
  relatedMoviePosterUrl?: string;
};

export type Meta = {
  uploadedOn: Timestamp;
  updatedOn?: Timestamp;
};
