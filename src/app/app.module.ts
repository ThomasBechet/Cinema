import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
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
import { AllFilmsComponent } from './all-films/all-films.component';
import { FilmService } from './services/films.service';
import { FilmPageComponent } from './film-page/film-page.component'

const appRoutes: Routes = [
	{ path: '', component: ReceptionComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'mentions', component: MentionsLegalesComponent },
	{ path: 'all-films', component: AllFilmsComponent},
	{ path: 'smart-films', component: SmartFilmsComponent},
	{ path: 'film-page', component: FilmPageComponent}
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
	AllFilmsComponent,
	FilmPageComponent

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
  providers: [FilmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
