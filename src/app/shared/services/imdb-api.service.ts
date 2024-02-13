import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImdbApiService {
  constructor(private api: ApiService) {}

  movieDetails(movieId: string): Observable<Object> {
    return this.api.get(`https://search.imdbot.workers.dev/?tt=${movieId}`);
  }

  search(searchText: string): Observable<Object> {
    return this.api.get(`https://search.imdbot.workers.dev/?q=${searchText}`);
  }
}
