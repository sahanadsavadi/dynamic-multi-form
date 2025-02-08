import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiFormsComponent } from './components/multi-forms/multi-forms.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MultiFormsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dynamic-multi-form';
}
