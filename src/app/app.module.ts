import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { ButtonMat } from './utils/button/button.component';
import { MentionsLegalesComponent } from './utils/mentions-legales/mentions-legales.component'

import { AppComponent } from './app.component';
import { ReceptionComponent } from './reception/reception.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SmartFilmsComponent } from './smart-films/smart-films.component';
import { QuizzFilm } from './smart-films/smart-films.component';
import { CustomNavbarComponent } from './utils/custom-navbar/custom-navbar.component';
import { FilmComponent } from './film/film.component';
import { FilmCardComponent } from './film-card/film-card.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { FilmMatchComponent } from './film-match/film-match.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';



//import {
//    MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule
//} from '@angular/material';
//import {DemoMaterialModule} from './smart-films/material-module';





const appRoutes: Routes = [
	{ path: '', component: ReceptionComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'mentions', component: MentionsLegalesComponent },
	{ path: 'smart-films', component: SmartFilmsComponent},
	{ path: 'film', component: FilmComponent},
	{ path: 'film/:id', component: FilmPageComponent},
];

@NgModule({
  declarations: [
	AppComponent,
	ReceptionComponent,
	RegisterComponent,
	LoginComponent,
	ButtonMat,
	MentionsLegalesComponent,
	HomeComponent,
	SmartFilmsComponent,
	CustomNavbarComponent,
	FilmComponent,
	FilmCardComponent,
	FilmPageComponent,
	JwPaginationComponent,
	FilmMatchComponent,
	SmartFilmsComponent,
	QuizzFilm
	//DemoMaterialModule,
	
	
  ],
  entryComponents: [QuizzFilm, SmartFilmsComponent],
  exports: [
	  RouterModule,
	  //MatDialogModule,
	  MatTooltipModule,
		MatDialogModule, 
		//MatFormFieldModule, 
		//MatButtonModule, 
		//SMatInputModule
	
  ],
  imports: [
	BrowserModule,
	RouterModule.forRoot(appRoutes),
	ReactiveFormsModule,
	HttpClientModule,
	BrowserAnimationsModule,
	CommonModule,
	MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent/*, SmartFilmsComponent*/]
})
export class AppModule { }
