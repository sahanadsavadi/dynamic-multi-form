import { CommonModule } from '@angular/common';
import { Component, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerComponent, NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@Component({
  selector: "app-date-time-picker",
  templateUrl: "./date-time-picker.component.html",
  styleUrls: ["./date-time-picker.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    }
  ]
})
export class DateTimePickerComponent implements ControlValueAccessor {
  @ViewChild('timePicker') timePicker!: NgxMatTimepickerComponent;

  selectedDate: Date | null = null;
  selectedTime: string = ''; // به‌صورت HH:mm
  combinedDateTime: Date | null = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.combinedDateTime = new Date(value);
      this.selectedDate = new Date(value);
      this.selectedTime = this.formatTime(this.combinedDateTime);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.updateCombinedDateTime();
  }

  onTimeChange(event: string) {
    this.selectedTime = event;
    this.updateCombinedDateTime();
  }

  updateCombinedDateTime() {
    if (this.selectedDate) {
      const date = new Date(this.selectedDate);
      if (this.selectedTime) {
        const [hours, minutes] = this.selectedTime.split(':').map(Number);
        date.setHours(hours, minutes, 0);
      }
      this.combinedDateTime = date;
      this.onChange(this.combinedDateTime);
    }
  }

  openTimePicker() {
    this.timePicker.open();
  }

  displayDateTime(): string {
    if (!this.combinedDateTime) return '---';
    return `${this.combinedDateTime.toLocaleDateString()} ${this.formatTime(this.combinedDateTime)}`;
  }

  private formatTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
}