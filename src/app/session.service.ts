import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpClient: HttpClient) {

  }

  preconnect() {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      if (token !== null) {
        const url = "http://34.77.176.92/users/preconnect";
        const header = new HttpHeaders({
          'Authorization': "Bearer " + token
        });
        this.httpClient.post(url, null, { headers: header }).subscribe(
          (response) => {
            if (response['auth'] === true) {
              let username = response['user']['name'];
              let email = response['user']['email'];
              localStorage.setItem('username', username);
              localStorage.setItem('email', email);
              console.log("successfully preconnected");
              resolve();
            } else {
              localStorage.removeItem('token');
              reject();
            }
          },
          (error) => {
            console.log("failed to preconnect (bad request)");
            reject();
          }
        );
      } else {
        console.log("no token in localstorage");
        reject();
      }
    });
  }

  connect(email, password) {
    password = Md5.hashStr(password);

    const url = "http://34.77.176.92/users/connect";
    const body = {
      "email": email,
      "password": password
    }

    return new Promise((resolve, reject) => {
      this.httpClient.post(url, body).subscribe(
        (response) => {
          if (response['errorMsg']) {
            reject();
          } else {
            console.log(response);
            let token = response['token'];
            let username = response['userName'];
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            resolve();
          }
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    }
    );
  }

  disconnect() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  register(username, email, password) {
    var hashPassword = Md5.hashStr(password);

    const url = "http://34.77.176.92/users/add";
    const parameters = {
      "name": username,
      "email": email,
      "password": hashPassword
    }

    return new Promise((resolve, reject) => {
      this.httpClient.post(url, parameters).subscribe(
        (response) => {
          let token = response['token'];
          if (token !== null) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
          }
          resolve();
        },
        (error) => {
          reject();
        }
      );
    });
  }

  getUsername(): string {
    let username = localStorage.getItem('username');
    return (username !== null) ? username : null;
  }
  getEmail(): string {
    let email = localStorage.getItem('email');
    return (email !== null) ? email : null;
  }
  isConnected(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
