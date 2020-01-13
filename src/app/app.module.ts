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
import { CustomNavbarComponent } from './utils/custom-navbar/custom-navbar.component';
import { FilmComponent } from './film/film.component';
import { FilmCardComponent } from './film-card/film-card.component';
import { FilmPageComponent } from './film-page/film-page.component';

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
	JwPaginationComponent
	

  ],
  exports: [
	  RouterModule
  ],
  imports: [
	BrowserModule,
	RouterModule.forRoot(appRoutes),
	ReactiveFormsModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
