import { Component, OnInit } from '@angular/core';
import { MovieType } from '../movieType';
import { ManageMoviesOfDbService } from '../shared/services/manage-movies-of-db.service';
import { PlaylistService } from '../shared/services/playlist.service';
import { Playlist } from '../Playlist';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  providers: [],
})
export class PlaylistsComponent implements OnInit {
  moviesForPlaylist: MovieType[];
  selectedPlaylistId: string = '';
  openCreatePlaylistDialog = false;
  playlistName: string;
  allPlaylists: Playlist[] = [];
  playlistIsOpen = false;
  allMovies: MovieType[] = [];
  likedMovies: MovieType[];
  openPlaylistSettingsDialog = false;
  newPlayListName: string = '';
  openNewPlaylistNameDialog = false;

  constructor(
    private movieManageService: ManageMoviesOfDbService,
    private playlistService: PlaylistService,
  ) {}

  ngOnInit(): void {
    this.fetchPlaylists();

    this.movieManageService.getAllMovies().subscribe((movies) => {
      this.allMovies = movies || [];
      this.likedMovies = this.allMovies?.filter((movies) => {
        return movies.liked;
      });
    });
  }

  public openPlaylist(playlistId: string, movieIds?: string[]) {
    this.moviesForPlaylist = [];
    console.log("playlistId");
    
    if (playlistId === 'LIKED') {
      this.moviesForPlaylist = this.likedMovies;
    } else {
      this.selectedPlaylistId = playlistId;
      console.log("f", this.selectedPlaylistId, this.moviesForPlaylist, movieIds);
      
      this.movieManageService.getAllMovies().subscribe((movies) => {
        this.allMovies = movies || [];
        this.moviesForPlaylist = this.allMovies.filter(
          (movie: MovieType) => movieIds?.includes(movie.id),
        );
      });

      
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
    this.fetchPlaylists();
  }

  public deletePlaylist(playlistId: string) {
    this.playlistService.deletePlaylist(playlistId);
    this.fetchPlaylists();
  }

  public renamePlaylist(playlistId: string) {
    this.playlistService.renamePlaylist(playlistId, this.newPlayListName);
    this.playlistService
      .getAllPlaylistsForUser()
      .subscribe((playlists) => (this.allPlaylists = playlists || []));
  }

  private fetchPlaylists() {
    this.playlistService
    .getAllPlaylistsForUser()
    .subscribe((playlists) => (this.allPlaylists = playlists || []));
  }
}
