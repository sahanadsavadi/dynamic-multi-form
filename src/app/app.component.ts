import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiFormsComponent } from './components/multi-forms/multi-forms.component';

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
