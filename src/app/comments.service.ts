import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Comment {
    user: string;
    content: string;
    stars: number;
    filmTitle: string;
    idFilm: string;
    _id: string;
}

export interface NoCommitedComment {
  user: string;
  content: string;
  stars: number;
  filmTitle: string;
  idFilm: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  API_POD_IP = '35.223.178.138';

  constructor(private http: HttpClient) { }

  public async getAllComments(): Promise<Comment[]> {
    return this.http.get('http://' + this.API_POD_IP + '/api/comment/all').toPromise() as Promise<Comment[]>;
  }

  public async getComment(id: string): Promise<Comment> {
    return this.http.get('http://' + this.API_POD_IP + '/api/comment/', {
      params: { id }
    }).toPromise() as Promise<Comment>;
  }

  public postComment(com: NoCommitedComment): Promise<any> {
    return this.http.post('http://' + this.API_POD_IP + '/api/comment', com).toPromise();
  }
}
