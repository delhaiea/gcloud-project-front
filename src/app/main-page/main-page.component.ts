import { Component, OnInit } from '@angular/core';
import { CommentsService, Comment } from '../comments.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  comments: Comment[];

  constructor(private commentsService: CommentsService) {
    this.comments = [];
    commentsService.getAllComments().then((docs) => {
      this.comments = docs;
    });
  }

  ngOnInit(): void {
  }

}
