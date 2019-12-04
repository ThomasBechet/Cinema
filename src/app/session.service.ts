import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';

enum HttpRequestType {
  POST,
  GET
}

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

  private buildAuthentificationHeader(token) {
    return new HttpHeaders({
      'Authorization': "bearer " + token
    });
  }

  private send(url, header, body, patch) {
    const httpHeader = new HttpHeaders(header);
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, body, {headers : httpHeader}).subscribe(
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
        const header = this.buildAuthentificationHeader(token);
        this.send(this.KW_url_preconnect, null, header, HttpRequestType.POST)
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
      this.send(this.KW_url_connect, null, body, HttpRequestType.POST)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });

    /*return new Promise((resolve, reject) => {
        this.httpClient.post(url, body).subscribe(
          (response) => {
            console.log(response);
            let token = response['token'];
            let username = response['userName'];
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            resolve(response);
          },
          (error) => {
            console.log(error);
            reject();
          }
        );
      }
    );*/
  }

  register(username, email, password) {

    const body = {
      'name': username,
      'email': email,
      'password': Md5.hashStr(password)
    }

    return new Promise((resolve, reject) => {
      this.send(this.KW_url_register, null, body, HttpRequestType.POST)
      .then((response) => {
        localStorage.setItem(this.KW_token, response['token']);
        this.setUsername(response['username']);
        this.setEmail(response['email']);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });

    /*return new Promise((resolve, reject) => {
      this.httpClient.post(url, parameters).subscribe(
        (response) => {
          let token = response['token'];
          if(token !== null) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            resolve();
          } else {
            reject();
          }
        },
        (error) => {
          reject();
        }
      );
    });*/
  }

  update(newUserName, newEmail, newPassword) {

    return new Promise((resolve, reject) => {
      let token = localStorage.getItem(this.KW_token);
      if(token !== null) {

      } else {

      }
    });

    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      if(token != null) {
        const url = "http://34.77.176.92/users/";
        const header = new HttpHeaders({
          'Authorization': "bearer " + token
        });
        const body = {
          'name': newUserName,
          'email': newEmail,
          'password': newPassword
        }
        this.httpClient.patch(url, body, {headers: header}).subscribe(
          (response) => {
            if(response.hasOwnProperty('userPatched') && response.hasOwnProperty('token')) {
              localStorage.setItem('username', response['userPatched']['name']);
              localStorage.setItem('email', response['userPatched']['email']);
              //Password is returned but it is useless

              localStorage.setItem('token', response['token']);
              
              console.log("successfully patched");
              resolve();
            } else if(response.hasOwnProperty('errorMsg')) {
              console.log("failed to patch");
              reject(response['errorMsg']);
            }
          },
          (error) => {
            console.log("failed to patch (bad request)");
            reject();
          }
        );
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
  public isConnected() : boolean {
    return (localStorage.getItem(this.KW_token) !== null);
  }
}
