import {
  Component,
  OnInit,
  signal,
  WritableSignal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common'; // ✅ Import NgFor for looping
import { FormService } from '../../services/form.service';
import { MultiFormResponse } from '../../models/form.model';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component'; // ✅ Import the standalone DynamicFormComponent
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';
import { from } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-multi-forms',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './multi-forms.component.html',
  styleUrls: ['./multi-forms.component.scss'],
})
export class MultiFormsComponent implements OnInit {
  forms: WritableSignal<MultiFormResponse | null> = signal(null);
  constructor(private http: HttpClient, private service: FormService) {}

  ngOnInit(): void {
    this.service.getFormConfig().subscribe({
      next: (response) => {
        this.forms.set(response);
      },
      error: (err) => {
        console.error('Error fetching form data:', err);
      },
    });
  }
}
