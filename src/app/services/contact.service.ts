import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private firebaseUrl = 'https://contact-ea6c4-default-rtdb.firebaseio.com/messages.json'; // Firebase Database URL

  constructor(private http: HttpClient) {}

  sendMessage(data: any): Observable<any> {
    return this.http.post(this.firebaseUrl, data);
  }
}