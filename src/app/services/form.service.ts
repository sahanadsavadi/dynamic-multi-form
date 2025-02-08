import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { MultiFormResponse } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  accountUrl: string = 'https://accounts.mail.ir/app/sign-up';
  constructor(@Inject(HttpClient) private http: HttpClient) {}

  getFormConfig() {
    return this.http.get<MultiFormResponse>(this.accountUrl);
  }
}
