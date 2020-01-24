import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  public async getAllComments(): Promise<Comment[]> {
    return this.http.get('/api/comment/all').toPromise() as Promise<Comment[]>;
  }

  public async getComment(id: string): Promise<Comment> {
    return this.http.get('/api/comment/', {
      params: { id }
    }).toPromise() as Promise<Comment>;
  }

  public postComment(com: NoCommitedComment): Promise<any> {
    return this.http.post('/api/comment', com).toPromise();
  }
}
