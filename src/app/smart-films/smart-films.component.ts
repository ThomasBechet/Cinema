import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

export interface DialogData {
  film: string ;
}


@Component({
  selector: 'app-smart-films',
  templateUrl: './smart-films.component.html',
  styleUrls: ['./smart-films.component.scss']
})

export class SmartFilmsComponent implements OnInit {
  parentSubject: Subject<string> = new Subject();
  film: string;

  constructor(public dialog: MatDialog, ) {
    this.film = "Star Wars";
  }

  ngOnInit() {
  }


  onClick(status) {
    this.parentSubject.next(status);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(QuizzFilm, {
      width: '250px',
      data: {film: this.film}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.film = result;
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
  public dialogRef: MatDialogRef<QuizzFilm>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(status) {
    this.parentSubject.next(status);
  }
}
