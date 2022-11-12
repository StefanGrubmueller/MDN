import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export type MovieType = {
  id: string;
  name?: string;
  author?: string;
  watchDate?: Date;
  releaseDate?: Date;
  genre?: Array<Genre>;
  rating?: number;
  liked: boolean;
  meta: Meta;
}

export type Meta =  {
  uploadedOn: Timestamp;
  updatedOn?: Timestamp;
}

export type Genre = 'ACTION' | 'ROMANCE' | 'COMEDY';
