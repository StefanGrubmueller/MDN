import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MovieType } from '../../movieType';
import { catchError, from, map, Observable, of, Subject } from 'rxjs';
import { Playlist } from '../../Playlist';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private dbCollection: AngularFirestoreCollection<Playlist>;
  private playlistsFromDB: Playlist[] | undefined = undefined;
  private selectedPlaylist$: Subject<Playlist> = new Subject<Playlist>();

  constructor(private db: AngularFirestore) {
    this.dbCollection = this.getCollection();
  }

  public getAllPlaylistsForUser(): Observable<Playlist[] | undefined> {
    return this.playlistsFromDB != undefined
      ? of(this.playlistsFromDB)
      : this.fetchPlaylistsFromDB();
  }

  public renamePlaylist(playlistId: string, newName: string) {
    this.selectedPlaylist$.subscribe((playlist: Playlist) => {
      playlist.name = newName;
      this.dbCollection.doc(playlistId).set(playlist);
      this.fetchPlaylistsFromDB();
    });
  }

  public createPlaylist(name: string): void {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    const playlistId = uuidv4();
    this.dbCollection.doc(playlistId).set({
      name: name,
      playlistOwnerEmail: email,
      id: playlistId,
    } as Playlist);
    this.fetchPlaylistsFromDB();
  }

  public deletePlaylist(id: string): void {
    this.dbCollection.doc(id).delete();
    this.fetchPlaylistsFromDB();
  }

  public removeMovieFromPlaylist(playlistId: string, movieId: string, playlistMovies: MovieType[]) {
   this.dbCollection.doc(playlistId).update({
      movieIds: playlistMovies.map((playlistMovie: MovieType) => playlistMovie.id).filter((id: string) => id !== movieId)
    } as Playlist);
  }

  public addMovieToPlaylist(movie: MovieType, playlist: Playlist): void {
    if (!playlist?.movieIds) {
      playlist.movieIds = [movie.id];
    } else {
      // so no movie can be added into a playlist twice
      if (!playlist.movieIds.includes(movie.id)) {
        playlist.movieIds.push(movie.id);
      }
    }
    this.dbCollection.doc(playlist.id).set(playlist);
    // so playlists are fetched again the next time they are accessed
    this.clearPlaylists();
  }

  private fetchPlaylistsFromDB(): Observable<Playlist[] | undefined> {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    return from(
      this.db
        .collection('playlists')
        .ref?.where('playlistOwnerEmail', '==', email)
        .get(),
    ).pipe(
      map((elem) => this.sortPlaylistsAlphabetically(elem)),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of(null);
      }),
      map((data) => {
        const playlistsFromDb = data?.map((d) => d.data() as Playlist);
        this.playlistsFromDB = playlistsFromDb;
        return playlistsFromDb;
      }),
    );
  }

  private sortPlaylistsAlphabetically(
    elem: firebase.firestore.QuerySnapshot<unknown>,
  ) {
    return elem.docs.sort((a, b) =>
      (a.data() as Playlist)?.name > (b.data() as Playlist)?.name
        ? 1
        : (b.data() as Playlist)?.name > (a.data() as Playlist)?.name
          ? -1
          : 0,
    );
  }

  private getCollection(): AngularFirestoreCollection<Playlist> {
    return this.db.collection('playlists');
  }

  public clearPlaylists(): void {
    this.playlistsFromDB = undefined;
  }
}
