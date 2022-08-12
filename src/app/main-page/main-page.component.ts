import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MovieType} from "../movieType";
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @Input()
  email: string = "";

  tutorials: any;

  movies: Array<MovieType> = [];


  existingMovies: Array<string> = [
    "10000BC",
    "12 YEARS ASLAVE",
    "21 BRIDGES",
    "21 JUMP STREET",
    "22 JUMP STREET",
    "300",
    "300 2",
    "7 ZWERGE",
    "ALIEN",
    "ALITA",
    "ALLES STEHT KOPF",
    "AMERICAN SNIPER",
    "AN EINEM WUNDERSCHÖNEN SONNTAG",
    "ANT MAN 1",
    "ANT MAN 2",
    "APOCALYPTO",
    "APOLLO 13",
    "AQUA MAN",
    "ARRIVAL",
    "ASSAISENCE CREED",
    "AVATAR",
    "AVENGERS 1",
    "AVENGERS 2",
    "AVENGERS 3",
    "BABY DRIVER",
    "BANANA JOE",
    "BATMAN",
    "BATMAN RETURNS",
    "BATMAN V SUPERMAN",
    "BAYWATCH",
    "BEAUTIFUL BOY",
    "BLACKKKLANSMEN",
    "BLACK PANTHER",
    "BLAIR WITCH PROJECT",
    "BLUE JAY",
    "BLUES BROTHERS",
    "BRUCE ALLMäCHTIG",
    "BULLYPARADE",
    "CAPTAIN AMERICA 1",
    "CAPTAIN AMERICA 2",
    "CAPTAIN AMERICA 3",
    "CAPTAIN MARVEL",
    "CASPER",
    "CAST AWAY",
    "CATCH ME IF YOU CAN",
    "CENTRAL INTELLIGENCE",
    "CHARLIE UND DIE SCHOKOLADENFABRIK",
    "CHINATOWN",
    "CLOCKWORK ORANGE",
    "CODENAME UNCLE",
    "CONSTANTINE",
    "CREED 1",
    "CREED 2",
    "DADDYS LITTLE GIRLS",
    "DARK KNIGHT 1",
    "DARK KNIGHT 2",
    "DARK KNIGHT 3",
    "DAS 5. ELEMENT",
    "DAS LEBEN DES BRIAN",
    "DAS VERMäCHTNISS DER TEMPELRITTER",
    "DAS VERMäCHTNISS DES GEHEIMEN BUNDES",
    "DEADPOOL 1",
    "DEADPOOL 2",
    "DER BAADER MEINHOF KOMPLEX",
    "DER DIKTATOR",
    "DER GESTIEFELTE KATER",
    "DER GLADIATOR",
    "DER GRINCH",
    "DER HOBBIT 1",
    "DER HOBBIT 2",
    "DER HOBBIT 3",
    "DER JUNGE IM GESTREIFTEN PYJAMA",
    "DER KNASTCOACH",
    "DER LEUCHTTURM",
    "DER MARSIANER",
    "DER MEDICUS",
    "DER RAUSCH",
    "DER SCHATZ IM SILBERSEE",
    "DER SCHMALE GRAT",
    "DER SCHUH DES MANITU",
    "DER SOLDAT DES JAMES RYAN",
    "DER UNGLAUBLICHE HULK",
    "DER VORLESER",
    "DER WEIßE HAI",
    "DIE ALTE DAME",
    "DIE BESTIMMUNG 1",
    "DIE BESTIMMUNG 2",
    "DIE BESTIMMUNG 3",
    "DIE CHRONIKEN VON NARNIA 1",
    "DIE CHRONIKEN VON NARNIA 2",
    "DIE CHRONIKEN VON NARNIA 3",
    "DIE DREI MUSKETIERE",
    "DIE GEHEIMNISVOLLE REISE ZUM MITTELPUNKT DER ERDE",
    "DIE LEGENDE DES ZORRO",
    "DIE LEGENDE VON AANG",
    "DIE LINKE UND DIE RECHTE HAND DES TEUFELS",
    "DIE MONSTER AG",
    "DIE MONSTER UNI",
    "DER PATE",
    "DIE UNFASSBAREN 1",
    "DIE UNFASSBAREN 2",
    "DIE UNGLAUBLICHEN 1",
    "DIE UNGLAUBLICHEN 2",
    "DIE WOLKE",
    "DJANGO UNCHAINED",
    "DOCTOR STRANGE",
    "DOCTOR STRANGE 2",
    "DUNKIRK",
    "DWK 1",
    "DWK 2",
    "DWK 3",
    "DWK 4",
    "DWK 5",
    "E.T.",
    "EAGLE EYE",
    "EDGE OF TOMORROW",
    "EINE WEIHNACHTSGESCHICHTE",
    "EIN RISKANNTER PLAN",
    "EINS UND EINS MACHT VIER",
    "ELI",
    "ER IST WIEDER DA",
    "FANTASIC FOUR",
    "FAST AND FURIOS 1",
    "FAST AND FURIOS 2",
    "FAST AND FURIOS 3",
    "FAST AND FURIOS 4",
    "FAST AND FURIOS 5",
    "FAST AND FURIOS 6",
    "FAST AND FURIOS 7",
    "FAST AND FURIOS 8",
    "FAST AND FURIOS 9",
    "FIGHT CLUB",
    "FINDET NEMO",
    "FLUCH DER KARIBIK 1",
    "FLUCH DER KARIBIK 2",
    "FLUCH DER KARIBIK 3",
    "FLUCH DER KARIBIK 4",
    "FLUCH DER KARIBIK 5",
    "FORREST GUMP",
    "FUCK YOU GÖTHE 1",
    "FUCK YOU GÖTHE 2",
    "FUCK YOU GÖTHE 3",
    "FULL METAL JACKET",
    "GAME NIGHT",
    "GEMINI MEN",
    "GET OUT",
    "GLASS",
    "GOLD",
    "GONE GIRL",
    "GOOD BYE LENIN",
    "GOODFELLAS",
    "GRAND BUDAPEST HOTEL",
    "GRAVITY",
    "GREAT GATSBY",
    "GREEN BOOK",
    "GUARDIONS OF THE GALAXY 1",
    "GUARDIONS OF THE GALAXY 2",
    "GUNS AKIMBO",
    "HAIR",
    "HALLOWEEN",
    "HANGOVER",
    "HARDCORE",
    "HARD POWDER",
    "HARRY POTTER 1",
    "HARRY POTTER 2",
    "HARRY POTTER 3",
    "HARRY POTTER 4",
    "HARRY POTTER 5",
    "HARRY POTTER 6",
    "HARRY POTTER 7",
    "HARRY POTTER 8",
    "HAWKING",
    "HEIDI",
    "HERR DER RINGE 1",
    "HERR DER RINGE 2",
    "HERR DER RINGE 3",
    "HIP HOP HOOD",
    "HITMAN",
    "HOUSE IN THE WOODS",
    "I AM LEGEND",
    "ICH EINFACH UNVERBESSERLICH 1",
    "ICH EINFACH UNVERBESSERLICH 2",
    "ICH EINFACH UNVERBESSERLICH 3",
    "ILLUMINATI",
    "IMMER AERGER MIT 40",
    "INCEPTION",
    "INCLORIOS BASTERDS",
    "INDEPENDENCE DAY 1",
    "INDEPENDENCE DAY 2",
    "INDIANA JONES 1",
    "INDIANA JONES 2",
    "INDIANA JONES 3",
    "INDIANA JONES 4",
    "INSIDE JOB",
    "INTERSTELLAR",
    "IN TIME",
    "I ROBOT",
    "IRON MAN 1",
    "IRON MAN 2",
    "IRON MAN 3",
    "ISI UND OSSI",
    "JAMES BOND 007 SKYFALL",
    "JAMES BOND 007 SPECTRE",
    "JOHN WICK 1",
    "JOHN WICK 2",
    "JOHN WICK 3",
    "JOJO RABBIT",
    "JOKER",
    "JONNY ENGLISCH 1",
    "JONNY ENGLISCH 2",
    "JONNY ENGLISCH 3",
    "JUMANJI",
    "JUMPER",
    "JUNO",
    "JURASSIC PARK",
    "JUSTICE LEAGUE",
    "KILL BILL",
    "KILL THE BOSS",
    "KINGSMEN 1",
    "KINGSMEN 2",
    "KOKOWÄH",
    "KUNG FU PANDA",
    "KÖNIG DER LöWEN",
    "LEG DICH NICHT MIT ZOHAN AN",
    "LISSI UND DER WILDE KAISER",
    "LOGAN",
    "LOGAN LUCKY",
    "LONDON HAS FALLEN",
    "LONG SHOT",
    "LUCY",
    "MADAGASKAR",
    "MAD MAX",
    "MAMMA MIA",
    "MATRIX 1",
    "MATRIX 2",
    "MATRIX 3",
    "MAZE RUNNER 1",
    "MAZE RUNNER 2",
    "MAZE RUNNER 3",
    "MEMENTO",
    "MEN IN BLACK 1",
    "MEN IN BLACK 2",
    "MEN IN BLACK 3",
    "MEN IN BLACK 4",
    "MIDNIGHT",
    "MILE",
    "MINIONS 1",
    "MINIONS 2",
    "MISSION IMPOSSIBLE 1",
    "MISSION IMPOSSIBLE 2",
    "MISSION IMPOSSIBLE 3",
    "MISSION IMPOSSIBLE 4",
    "MISSION IMPOSSIBLE 5",
    "MISSION IMPOSSIBLE 6",
    "MOONRISE KINGDOM",
    "MORTAL ENGINES",
    "MR. AND MS SMITH",
    "MR BEAN MACHT FERIEN",
    "MY FAIR LADY",
    "NERVE",
    "NIGHT IN PARADISE",
    "NIGHT SCHOOL",
    "NON STOP",
    "OLYMPUS HAS FALLEN",
    "ONCE UPON A TIME IN HOLLYWOOD",
    "OTTO",
    "OUR IDIOT BROTHER",
    "PACIFIC RIM 1",
    "PACIFIC RIM 2",
    "PAIN AND GAIN",
    "PANET DER AFFEN 1",
    "PANET DER AFFEN 2",
    "PAPILLION",
    "PERCY JACKSON",
    "PER ANHALTER DURCH DIE GALAXIS",
    "PETS",
    "PHANTASTISCHE TIERWESEN 1",
    "PHANTASTISCHE TIERWESEN 2",
    "PIPI LANGSTRUMPF",
    "PREDATOR",
    "PRESTIGE",
    "PRINCE OF PERSIA",
    "PRISON BREAK-DER FILM",
    "PROJECT X",
    "PROMETHEUS",
    "PULP FICTION",
    "PURGE 1",
    "PURGE 2",
    "PURGE 3",
    "PURGE 4",
    "PURGE 5",
    "RAIN MAN",
    "RAMBO 1",
    "RAMBO 5",
    "RATATOUI",
    "READY PLAYER ONE",
    "REC 1",
    "REC 2",
    "RED SPARROW",
    "RELICS",
    "ROBIN HOOD",
    "ROBIN HOOD",
    "ROCKY 1",
    "ROCKY 2",
    "ROCKY 4",
    "ROGUE ONE",
    "RUSH",
    "SAN ANDREAS",
    "SCARY MOVIE 1",
    "SCARY MOVIE 2",
    "SCARY MOVIE 3",
    "SCARY MOVIE 4",
    "SCARY MOVIE 5",
    "SHAZAM",
    "SHERLOCK HOLMES 1",
    "SHERLOCK HOLMES 2",
    "SHINING",
    "SHOUTER",
    "SIMPSONS",
    "SING",
    "SINISTER 1-3",
    "SISSI",
    "SKYSCRAPER",
    "SNITCH",
    "SNOWDEN",
    "SOURCE CODE",
    "SPACEWALK",
    "SPIDER-MAN 1(TOM HOLLAND)",
    "SPIDER-MAN 2(TOM HOLLAND)",
    "SPIDER-MAN 3(TOM HOLLAND)",
    "SPIDERMAN A NEW SPIDERVERSE",
    "SPIDER MAN 1(TOBEY MCQUIER)",
    "SPIDER MAN 2(TOBEY MCQUIER)",
    "SPIDER MAN 3(TOBEY MCQUIER)",
    "SPLIT",
    "STAR TREK 1",
    "STAR TREK 2",
    "STAR TREK 3",
    "STAR WARS 1",
    "STAR WARS 2",
    "STAR WARS 3",
    "STAR WARS 4",
    "STAR WARS 4",
    "STAR WARS 5",
    "STAR WARS 6",
    "STAR WARS 7",
    "STAR WARS 8",
    "STAR WARS 9",
    "STRAIGHT OUTA COMPTON",
    "SUICIDE SQUAD",
    "SUPERMAN",
    "SUPERMAN RETURNS",
    "TENET",
    "THE ACCOUNTANT",
    "THE AMAZING SPIDERMAN",
    "THE BIG SHORT",
    "THE BOSS BABY",
    "THE BOY",
    "THE BUTLER",
    "THE CIRCLE",
    "THE COMMUTER",
    "THE DEVIL ALL THE TIME",
    "THE FRENCH DISPATCH",
    "THE GREAT DICTATOR",
    "THE HATEFUL EIGHT",
    "THE HUNT FOR RED OCTOBER",
    "THE IMMITATION GAME",
    "THE INTERVIEW",
    "THE LIGHTHOUSE",
    "THE LOBSTER",
    "THE RAILWAY CHILDREN",
    "THE REVENANT",
    "THE SOCIAL NETWORK",
    "THE SHAWSHANK REDEMPTION",
    "THE SUICIDE SQUAD",
    "THE WOLF OF WALL STREET",
    "THOR 1",
    "THOR 2",
    "THOR 3",
    "TINTENHERZ",
    "TITANIC",
    "TOTAL RECALL",
    "TRANSFORMERS 1",
    "TRANSFORMERS 2",
    "TRANSFORMERS 3",
    "TRANSFORMERS 4",
    "TRANSFORMERS 5",
    "TRAUMSCHIFF SURPRISE",
    "TRIBUTE VON PANEM 1",
    "TRIBUTE VON PANEM 2",
    "TRIBUTE VON PANEM 3",
    "TROJA",
    "TWILIGHT 1",
    "TWILIGHT 2",
    "TWILIGHT 3",
    "UNBREAKABLE",
    "VALERIAN",
    "VENOM",
    "WANTED",
    "WARCRAFT",
    "WAR DOGS",
    "WATCHMEN",
    "WEST SIDE STORY",
    "WICKIE UND DIE STARKEN MäNNER",
    "WINNETOU 1",
    "WINNETOU 2",
    "WINNETOU 3",
    "WIR",
    "WONDERWOMEN",
    "WOYZEK",
    "X-MEN 1",
    "X-MEN 2",
    "X-MEN 3",
    "X-MEN 4",
    "X-MEN 5",
    "X-MEN 6",
    "X-MEN 7",
    "X-MEN 8",
    "X-MEN 9",
    "XXX",
    "YESTERDAY",
    "ZACK SNYDERS JUSTICE LEAGUE",
    "ZIMMER 1408",
    "ZURüCK IN DIE ZUKUNFT 1",
    "ZURüCK IN DIE ZUKUNFT 2",
    "ZURüCK IN DIE ZUKUNFT 3",
    "ZWEIOHRKÜCKEN",
    "DAS SCHWEIGEN DER LÄMMER",
    "GOODFELLAS"
  ];

  constructor(private db: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    this.tutorials = this.db.collection('stefan.grubmueller@icloud.com').valueChanges();

    this.tutorials.subscribe((movies: Array<MovieType>) => movies.forEach(movie => {
      this.movies.push(movie)}));
  }

  routeToMovieInfo(movie: MovieType): void {
    this.router.navigate(['movie'], {queryParams: {movieName: movie.name} });
  }

  // importExistingMovies() {
  //   const movieCollection = this.db.collection('stefan.grubmueller@icloud.com');
  //   this.existingMovies.forEach(existingMovie => {
  //     movieCollection.doc(existingMovie).set({name: existingMovie});        console.log('finished');
  //
  //   });
  // }
  //
  // deleteExistingMovies() {
  //   const movieCollection = this.db.collection('stefan.grubmueller@icloud.com');
  //     this.existingMovies.forEach(existingMovie => {
  //       movieCollection.doc(existingMovie).delete();
  //       console.log('finished');
  //     });
  // }

}
