import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Film {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  API_POD_IP = '146.148.65.56';

  constructor(private http: HttpClient) { }

  public async getFilmList(search: string): Promise<Film[]> {
    return this.http.get('http://' + this.API_POD_IP  + '/api/film', {
      params: {
        f: search
      }
    }).toPromise() as Promise<Film[]>;
  }

  public async getFilmById(id: string): Promise<Film> {
    return this.http.get('http://' + this.API_POD_IP  + '/api/film/byId', {
      params: { id }
    }).toPromise() as Promise<Film>;
  }

}
