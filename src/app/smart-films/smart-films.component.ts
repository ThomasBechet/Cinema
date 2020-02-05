import { Component, OnInit, HostListener  } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';


export enum KEY_CODE {
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39
}


@Component({
  selector: 'app-smart-films',
  templateUrl: './smart-films.component.html',
  styleUrls: ['./smart-films.component.scss']
})

export class SmartFilmsComponent implements OnInit {
  parentSubject: Subject<string> = new Subject();
  film: string;
  quizDialog: MatDialogRef<QuizzFilm>;

  constructor(public dialog: MatDialog) {}
  
  ngOnInit() {  }
  
  
  onClick(status) {
    this.parentSubject.next(status);
  }

  
  openDialog(): void {
    this.quizDialog = this.dialog.open(QuizzFilm,  {
       disableClose: false,
       autoFocus: true  
    });
  }
}

@Component({
  selector: 'quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./smart-films.component.scss']
  
})
export class QuizzFilm {
  parentSubject: Subject<string> = new Subject();

constructor(
  public dialogRef: MatDialogRef<QuizzFilm>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(status) {
    this.parentSubject.next(status);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.onClick("like");
    }
    
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.onClick("unseen");
    }
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.onClick("dislike");
    }
  
  }

}
