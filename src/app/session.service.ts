import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  readonly KW_token = 'token';
  readonly KW_url = "http://34.77.176.92/users/";
  readonly KW_url_preconnect = this.KW_url + "preconnect";
  readonly KW_url_connect = this.KW_url + "connect";
  readonly KW_url_disconnect = this.KW_url + "disconnect";
  readonly KW_url_register = this.KW_url + "add";
  readonly KW_url_delete = this.KW_url + "";
  readonly KW_url_update = this.KW_url + "";
  readonly KW_username = 'username';
  readonly KW_email = 'email';
  readonly KW_password = 'password';

  constructor(private communication : CommunicationService) { 
    
  }

  public buildAuthentificationHeader() {
    return {
      'Authorization': "bearer " + this.getToken()
    };
  }

  public preconnect() {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem(this.KW_token);
      if(token !== null) {
        const header = this.buildAuthentificationHeader();
        this.communication.post(this.KW_url_preconnect, null, header)
        .then((response) => {
          this.setUsername(response['user']['name']);
          this.setEmail(response['user']['email']);
          resolve(null);
        })
        .catch((error) => {
          reject(error);
        });
      } else {
        reject("No token stored");
      }
    });
  }

  public connect(email, password) {
    const body = {
      'email': email,
      'password': Md5.hashStr(password)
    }

    return new Promise((resolve, reject) => {
      this.communication.post(this.KW_url_connect, null, body)
      .then((response) => {
        this.setUsername(response['userName']);
        this.setEmail(response['email']);
        this.setToken(response['token']);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public register(username, email, password) {

    const body = {
      'name': username,
      'email': email,
      'password': Md5.hashStr(password)
    }

    return new Promise((resolve, reject) => {
      this.communication.post(this.KW_url_register, null, body)
      .then((response) => {
        this.setUsername(response['username']);
        this.setEmail(response['email']);
        this.setToken(response['token']);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public delete() {
    const header = this.buildAuthentificationHeader();
    return new Promise((resolve, reject) => {
      this.communication.delete(this.KW_url_delete, header)
      .then((response) => {
        this.disconnect();
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public updateName(newName) {
    return this.update('name', newName, 'name', (value) => {
      this.setUsername(value);
    });
  }
  public updateEmail(newEmail) {
    return this.update('email', newEmail, 'email', (value) => {
      this.setEmail(value);
    });
  }
  public updatePassword(newPassword) {
    return this.update('password', Md5.hashStr(newPassword), 'password', (value) => {
      // Le mot de passe n'est pas stocké en local, inutile de le changer
    });
  }

  private update(param, value, paramName, call) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem(this.KW_token);
      if(token !== null) {
        const header = this.buildAuthentificationHeader();
        let body = {};
        body[param] = value;

        this.communication.post(this.KW_url_update, header, body)
        .then((response) => {
          if(response.hasOwnProperty('userPatched') && response.hasOwnProperty('token')) {
            this.setToken(response['token']);

            call(response['userPatched'][paramName]);
            //Password is returned but it is useless
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
      } else {
        reject("No token stored");
      }
    });
  }

  public disconnect() {
    localStorage.removeItem(this.KW_token);
    localStorage.removeItem(this.KW_username);
    localStorage.removeItem(this.KW_email);
  }

  public getUsername() : string {
    let username = localStorage.getItem(this.KW_username);
    return (username !== null) ? username : null;
  }
  private setUsername(username) {
    localStorage.setItem(this.KW_username, username);
  }
  public getEmail() : string {
    let email = localStorage.getItem(this.KW_email);
    return (email !== null) ? email : null;
  }
  private setEmail(email) {
    localStorage.setItem(this.KW_email, email);
  }
  public getToken() : string {
    let token = localStorage.getItem(this.KW_token);
    return (token !== null) ? token : null;
  }
  public setToken(token) {
    localStorage.setItem(this.KW_token, token);
  }
  public isConnected() : boolean {
    return (localStorage.getItem(this.KW_token) !== null);
  }
}
