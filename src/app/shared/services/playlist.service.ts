import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {MovieType} from "../../movieType";
import {Observable, Subject} from "rxjs";
import {Playlist} from "../../Playlist";
import {v4 as uuidv4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private _dbCollection: AngularFirestoreCollection<Playlist>;
  private _playlistsFromDB: Playlist[] = [];
  private $playlistsFromDB: Subject<Playlist[]> = new Subject<Playlist[]>();

  constructor(private db: AngularFirestore) {
    console.log("bla")
    this._dbCollection = this.getCollection();
    this.downloadAllPlaylistsForUser();
  }

  public getAllPlaylistsForUser(): Observable<Playlist[]> {
    return this.$playlistsFromDB;
  }

  public createPlaylist(name: string): void {
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    const playlistId = uuidv4();
    this._dbCollection.doc(playlistId).set({name: name, playlistOwnerEmail: email, id: playlistId} as Playlist);
    this.downloadAllPlaylistsForUser();
  }

  public deletePlaylist(id: string): void {
    this._dbCollection.doc(id).delete();
    this.downloadAllPlaylistsForUser();
  }

 public addMovieToPlaylist(movie: MovieType, playlist: Playlist): void {
    if (!playlist?.movieIds) {
      playlist.movieIds = [movie.id];
    } else {
      playlist.movieIds.push(movie.id);
    }
    this._dbCollection.doc(playlist.id).set(playlist);
  }

  private downloadAllPlaylistsForUser(): void {
    console.log("2")
    const email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    this.db
      .collection('playlists')
      .ref?.where('playlistOwnerEmail', "==", email)
      .get()
      .then((playlists) => {
        this._playlistsFromDB = [];
        this.$playlistsFromDB.next({} as Playlist[]);
        playlists.docs.map((playlist) => {

          if(playlist.exists) {
            this._playlistsFromDB.push(<Playlist>playlist.data());
          }
        });
        console.log("here", this._playlistsFromDB)
        this.$playlistsFromDB.next(this._playlistsFromDB)
      });
  }

  private getCollection(): AngularFirestoreCollection<Playlist> {
    return this.db.collection('playlists');
  }
}
