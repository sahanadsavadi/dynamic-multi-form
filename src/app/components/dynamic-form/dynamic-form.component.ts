import { Component, Input, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormField } from '../../models/form.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formStructure!: any;
  hide = signal(true);
  form = signal(new FormGroup({}));
  private fb = new FormBuilder();
  

  ngOnInit(): void {
    if (this.formStructure) {
      this.createForm();
    }
  }

  createForm(): void {
    const formControls: any = {};
    this.formStructure.fields.forEach((field: FormField) => {
      let validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.minLength)
        validators.push(Validators.minLength(field.minLength));
      if (field.maxLength)
        validators.push(Validators.maxLength(field.maxLength));
      if (field.regex) validators.push(Validators.pattern(field.regex));
      formControls[field.name] = ['', validators];
    });
    this.configureConfirmPasswordField(formControls);
    this.form.set(
      this.fb.group(formControls, { validators: this.passwordMatchValidator })
    );
  }

  private configureConfirmPasswordField(formControls: any) {
    if (
      this.formStructure.fields.some(
        (field: FormField) => field.name === 'newPassword'
      )
    ) {
      formControls['confirmPassword'] = ['', Validators.required];
    } else {
      formControls['confirmPassword'] = [{ value: '', disabled: true }];
    }
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (confirmPassword && password !== confirmPassword) {
      return { notMatching: true };
    }
    return null;
  }

  submitForm(): void {
    if (this.form().valid) {
      console.log('Form Submitted:', this.form().value);
    } else {
      console.log('Form Invalid');
    }
  }

  showHidePassType(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation()
  }
}
