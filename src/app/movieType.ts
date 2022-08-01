export type MovieType = {
  name: string;
  author?: string;
  watchDate?: Date;
  releaseDate?: Date;
  genre?: Array<Genre>;
  rating?: number;
}

export type Genre = 'ACTION'| 'ROMANCE' | 'COMEDY';
