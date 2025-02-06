import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MultiFormResponse } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
 
  constructor(private http: HttpClient) {}
  getFormConfig() {
    return this.http.get<MultiFormResponse>(
      'https://accounts.mail.ir/app/sign-up'
    );
  }
}
