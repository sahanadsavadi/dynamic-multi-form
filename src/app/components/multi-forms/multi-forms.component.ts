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
  constructor(private service: FormService) {}

  ngOnInit(): void {
    this.service.getFormConfig().subscribe({
      next: (response) => {
        this.forms.set(this.sanitizeForms(response));
      },
      error: (err) => {
        console.error('Error fetching form data:', err);
      },
    });
  }
  sanitizeForms(response: MultiFormResponse): MultiFormResponse {
    if (response.form && Array.isArray(response.form)) {
      response.form = response.form.map((form) => {
        if (!form) return;
        form.fields = form.fields.map((field) => ({
          ...field,
          required: field.required ?? false,
          type: field.type ?? 'TEXT',
          errorMessage: field.errorMessage ?? 'This field is required',
          description: field.description ?? '',
          minLength: field.minLength ?? 0,
          maxLength: field.maxLength ?? 255,
          regex: field.regex ?? '',
          info: field.info ?? '',
          showConfirmPassword: field.showConfirmPassword ?? false,
        }));
        return form;
      });
    }
    return response;
  }
}
