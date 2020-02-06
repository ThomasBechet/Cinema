import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; 

import { AppComponent } from './app.component';
import { ReceptionComponent } from './reception/reception.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './utils/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './utils/footer/footer.component';
import { MoviesComponent } from './movies/movies.component';
import { CineteamComponent } from './cineteam/cineteam.component';
import { LegalMentionComponent } from './legal-mention/legal-mention.component';
import { SmartFilmsComponent } from './smart-films/smart-films.component';
import { FilmMatchComponent } from './film-match/film-match.component';
import { MovieModalComponent } from './movie-modal/movie-modal.component';
import { ProfilComponent } from './profil/profil.component';
import { QuizzComponent } from './quizz/quizz.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MovieMatchComponent } from './movie-match/movie-match.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  { path: '', component: ReceptionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cineteam', component: CineteamComponent },
  { path: 'legal-mention', component: LegalMentionComponent },
  { path: 'movies/:gender', component: MoviesComponent },
  { path: 'smart-movies', component: SmartFilmsComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'quizz', component: QuizzComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ReceptionComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    MoviesComponent,
    CineteamComponent,
    LegalMentionComponent,
    SmartFilmsComponent,
    FilmMatchComponent,
    MovieModalComponent,
    ProfilComponent,
    QuizzComponent,
    MovieMatchComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  exports: [
    RouterModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  entryComponents: [QuizzComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
