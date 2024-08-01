import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, convertToParamMap } from '@angular/router'
import { of } from 'rxjs'
import { MovieInfoComponent } from './movie-info.component'
import { ManageMoviesOfDbService } from '../../shared/services/manage-movies-of-db.service'
import { ImdbService } from '../../shared/services/imdb.service'
import { PlaylistService } from '../../shared/services/playlist.service'
import { MessageService } from 'primeng/api'
import { type Playlist } from '../../shared/types/Playlist'
import { type MovieType } from 'src/app/shared/types/movieType'

describe('MovieInfoComponent', () => {
  let component: MovieInfoComponent
  let fixture: ComponentFixture<MovieInfoComponent>
  let manageMovieServiceSpy: jasmine.SpyObj<ManageMoviesOfDbService>
  let imdbServiceSpy: jasmine.SpyObj<ImdbService>
  let playlistServiceSpy: jasmine.SpyObj<PlaylistService>

  beforeEach(async () => {
    const manageMovieSpy = jasmine.createSpyObj('ManageMoviesOfDbService', [
      'getAllMovies$',
      'downloadMovieInformation',
      'updateMovie',
      'uploadMovie'
    ])
    const imdbSpy = jasmine.createSpyObj('ImdbService', [
      'getImdbMovieDetails'
    ])
    const playlistSpy = jasmine.createSpyObj('PlaylistService', [
      'getAllPlaylistsForUser',
      'addMovieToPlaylist',
      'createPlaylist',
      'clearPlaylists'
    ])

    await TestBed.configureTestingModule({
      declarations: [MovieInfoComponent],
      providers: [
        { provide: ManageMoviesOfDbService, useValue: manageMovieSpy },
        { provide: ImdbService, useValue: imdbSpy },
        { provide: PlaylistService, useValue: playlistSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ movieId: '123' })),
            queryParams: of({ movieId: '123', isSearch: true })
          }
        },
        MessageService
      ]
    }).compileComponents()

    manageMovieServiceSpy = TestBed.inject(
      ManageMoviesOfDbService
    ) as jasmine.SpyObj<ManageMoviesOfDbService>
    imdbServiceSpy = TestBed.inject(ImdbService) as jasmine.SpyObj<ImdbService>
    playlistServiceSpy = TestBed.inject(
      PlaylistService
    ) as jasmine.SpyObj<PlaylistService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy()})

  it('should fetch playlists on component initialization', () => {
    const playlists: Playlist[] = [{ id: '1', name: 'Playlist 1', movieIds: [], playlistOwnerEmail: '' }]
    manageMovieServiceSpy.getAllMovies$.and.returnValue(of([]))
    manageMovieServiceSpy.downloadMovieInformation.and.returnValue(of({} as MovieType))
    playlistServiceSpy.getAllPlaylistsForUser.and.returnValue(of(playlists))

    component.ngOnInit()

    expect(component.allPlaylists).toEqual(playlists)
  })

  it('should load IMDB movie details when queried', () => {
    const movieDetails = { title: 'Movie', year: 2023 }
    imdbServiceSpy.getImdbMovieDetails.and.returnValue(of(movieDetails))

    component.loadImdbMovieDetails('123')

    expect(component.movie).toEqual(movieDetails)
    expect(component.loading).toBeFalse()
  })

  it('should load local movie information when queried', () => {
    const localMovie = { title: 'Local Movie', watched: false }
    manageMovieServiceSpy.downloadMovieInformation.and.returnValue(
      of(localMovie)
    )

    component.loadLocalMovieInformation('123')

    expect(component.movie).toEqual(localMovie)
    expect(component.loading).toBeFalse()
  })

  // Add more test cases for other methods as needed
})
