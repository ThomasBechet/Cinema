import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';

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
  readonly KW_url_update = this.KW_url + "update";
  readonly KW_errorMsg = 'errorMsg';
  readonly KW_username = 'username';
  readonly KW_email = 'email';

  constructor(private httpClient : HttpClient) { 
    
  }

  private buildAuthentificationHeader() {
    return {
      'Authorization': "bearer " + this.getToken()
    };
  }

  private send(url, header, body, method) {
    const httpHeader = new HttpHeaders(header);
    return new Promise((resolve, reject) => {
      this.httpClient[method](url, body, {headers : httpHeader}).subscribe(
        (response) => {
          if(response.hasOwnProperty(this.KW_errorMsg)) {
            reject(response[this.KW_errorMsg]);
          } else {
            resolve(response);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  preconnect() {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem(this.KW_token);
      if(token !== null) {
        const header = this.buildAuthentificationHeader();
        this.send(this.KW_url_preconnect, null, header, 'post')
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

  connect(email, password) {
    const body = {
      'email': email,
      'password': Md5.hashStr(password)
    }

    return new Promise((resolve, reject) => {
      this.send(this.KW_url_connect, null, body, 'post')
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

  register(username, email, password) {

    const body = {
      'name': username,
      'email': email,
      'password': Md5.hashStr(password)
    }

    return new Promise((resolve, reject) => {
      this.send(this.KW_url_register, null, body, 'post')
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

  update(newUserName, newEmail, newPassword) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem(this.KW_token);
      if(token !== null) {
        const header = this.buildAuthentificationHeader();
        const body = {
          'name': newUserName,
          'email': newEmail,
          'password': newPassword
        }
        console.log(header);
        console.log(body);
        this.send(this.KW_url_update, header, body, 'patch')
        .then((response) => {
          if(response.hasOwnProperty('userPatched') && response.hasOwnProperty('token')) {
            this.setToken(response['token']);
            this.setUsername(response['userPatched']['name']);
            this.setEmail(response['userPatched']['email']);
            //Password is returned but it is useless
            
            console.log("successfully patched");
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

  disconnect() {
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
  private setToken(token) {
    localStorage.setItem(this.KW_token, token);
  }
  public isConnected() : boolean {
    return (localStorage.getItem(this.KW_token) !== null);
  }
}
