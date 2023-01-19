import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserUtilityService {
  constructor(private httpClient: HttpClient) {}

  fetchUsers() {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

  addUser(userData: any) {
    return this.httpClient.post(
      'https://jsonplaceholder.typicode.com/users',
      userData
    );
  }

  deleteUser(id: number) {
    return this.httpClient.delete(
      'https://jsonplaceholder.typicode.com/users/' + id
    );
  }

  updateUser(payload: any, id: number) {
    return this.httpClient.put(
      'https://jsonplaceholder.typicode.com/users' + id,
      payload
    );
  }
}
