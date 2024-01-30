import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MovieType} from "../movieType";
import {ManageMoviesOfDbService} from "../shared/services/manage-movies-of-db.service";
import {PlaylistService} from "../shared/services/playlist.service";
import {Playlist} from "../Playlist";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  providers: [PlaylistService]
})
export class PlaylistsComponent implements OnInit{
  moviesForPlaylist: MovieType[];
  selectedPlaylistId: string = '';
  openCreatePlaylistDialog = false;
  playlistName: string;
  allPlaylists: Playlist[] = [];
  playlistIsOpen = false;
  allMovies: MovieType[] = [];
  likedMovies: MovieType[];
  openPlaylistSettingsDialog = false;
  newPlaylistName: string = '';
  newPlayListName: string = '';
  openNewPlaylistNameDialog = false;

  constructor(private movieManageService: ManageMoviesOfDbService, private playlistService: PlaylistService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.playlistService.getAllPlaylistsForUser().pipe(untilDestroyed(this)).subscribe(playlists => this.allPlaylists = playlists);

    this.allMovies = this.movieManageService.getAllMovies();
    this.likedMovies = this.allMovies?.filter(movies => {
      return movies.liked;
    });
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  public openPlaylist(playlistId: string, movieIds?: string[]) {
    this.moviesForPlaylist = [];
    if (playlistId === 'LIKED') {
      this.moviesForPlaylist = this.likedMovies;
    } else {
      this.selectedPlaylistId = playlistId;
      this.moviesForPlaylist = this.allMovies.filter((movie: MovieType) => movieIds?.includes(movie.id));
    }
    this.playlistIsOpen = true;

  }

  public showCreatePlaylist() {
    this.openCreatePlaylistDialog = true;
  }

  public createPlaylist() {
    this.playlistService.createPlaylist(this.playlistName);
    this.openCreatePlaylistDialog = false;
    this.playlistName = '';
    this.playlistService.getAllPlaylistsForUser().subscribe(playlists => this.allPlaylists = playlists);
  }

  public deletePlaylist(playlistId: string) {
    this.playlistService.deletePlaylist(playlistId);
    this.playlistService.getAllPlaylistsForUser().subscribe(playlists => this.allPlaylists = playlists);
  }

  public renamePlaylist(playlistId: string) {
    this.playlistService.renamePlaylist(playlistId, this.newPlaylistName);
    this.playlistService.getAllPlaylistsForUser().subscribe(playlists => this.allPlaylists = playlists);
  }
}
