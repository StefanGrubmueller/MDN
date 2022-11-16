import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export type MovieType = {
  id: string;
  name: string;
  author?: string;
  watchDate?: Date;
  releaseDate?: Date;
  genre?: Array<string>;
  rating?: number;
  liked: boolean;
  meta?: Meta;
}

export type Meta = {
  uploadedOn: Timestamp;
  updatedOn?: Timestamp;
}
