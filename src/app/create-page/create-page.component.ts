import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Film, FilmService } from '../film.service';
import { NoCommitedComment, CommentsService } from '../comments.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  filmList: Film[];
  selectedFilmItem: Film;
  timer: any;

  filmTitle: string;
  filmStars: string;
  filmComment: string;
  user: string;

  isValid = false;

  commentsForm: FormGroup;

  constructor(
    private filmService: FilmService,
    private commentsService: CommentsService,
    private router: Router) {
    this.filmTitle = '';
    this.filmComment = '';
    this.filmStars = '5';
    this.user = 'anonymous';
    this.commentsForm = new FormGroup({
      filmUser: new FormControl(this.user),
      filmTitle: new FormControl(this.filmTitle),
      filmComment: new FormControl(this.filmComment),
      filmStars: new FormControl(this.filmStars)
    });
  }

  ngOnInit(): void {
    this.commentsForm.valueChanges.subscribe((value) => this.checkValidity);
    this.commentsForm.controls.filmTitle.valueChanges
      .subscribe((value: string) => {
        if (value !== undefined && value.length >= 3) {
          this.filmTitle = value;
          if (this.filmList) {
            const filmSelected = this.filmList.filter((f) => f.Title === this.filmTitle);
            this.selectedFilmItem = (filmSelected.length === 1) ? filmSelected[0] : undefined;
          }
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.filmService.getFilmList(value)
              .then((films: Film[]) => this.filmList = films);
          }, 1200);
        }
      });

    this.commentsForm.controls.filmComment.valueChanges
      .subscribe((value: string) => this.filmComment = value);
    this.commentsForm.controls.filmStars.valueChanges
      .subscribe((value: string) => this.filmStars = value);
    this.commentsForm.controls.filmUser.valueChanges
      .subscribe((value: string) => this.user = value);
  }

  send(): void {
    if (this.checkValidity()) {
      const id = (this.selectedFilmItem) ? this.selectedFilmItem.imdbID : '';
      const datas: NoCommitedComment = {
        user: this.user,
        content: this.filmComment,
        stars: Number(this.filmStars),
        filmTitle: this.filmTitle,
        idFilm: id
      };
      this.commentsService.postComment(datas).then((o) => {
        this.router.navigate(['/']);
      });
    } else {
      alert('Le formulaire n\'est pas rempli correctement');
    }

  }

  checkValidity(): boolean {
    this.isValid = (this.filmTitle !== '' &&
      this.filmComment !== '' &&
      this.filmStars !== '' &&
      this.user !== '');
    return this.isValid;
  }

}
