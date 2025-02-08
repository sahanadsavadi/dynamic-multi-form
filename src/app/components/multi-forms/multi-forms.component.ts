import {
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormService } from '../../services/form.service';
import { MultiFormResponse } from '../../models/form.model';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component'; 
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
        this.forms.set(response);
      },
      error: (err) => {
        console.error('Error fetching form data:', err);
      },
    });
  }
 
}
