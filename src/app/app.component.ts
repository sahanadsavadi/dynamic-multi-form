import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiFormsComponent } from './components/multi-forms/multi-forms.component';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DateTimePickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dynamic-multi-form';
}
