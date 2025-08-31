import { Component, inject, output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CreateEventDto } from '../../../core/models/event.model';
import { EventsService } from '../../../core/services/events.service';

@Component({
  selector: 'app-event-form',
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.html',
  styleUrl: './event-form.scss',
})
export class EventForm {
  readonly #formBuilder = inject(FormBuilder);
  readonly #eventsService = inject(EventsService);

  public readonly eventCreatedNotification = output<void>();

  protected readonly eventForm = this.#formBuilder.group({
    name: [
      '',
      {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(32)],
      },
    ],
    start_date: [
      '',
      {
        validators: [this.dateValidator],
      },
    ],
    city: [
      '',
      {
        validators: [Validators.maxLength(32), this.noDigitsValidator],
      },
    ],
  });

  // A mask (such as like Ngx's ones) would be a more complete option instead of these two validators.

  private dateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const regex = /^\d{2}\/\d{2}\/\d{4}$/; // format must be dd/MM/yyyy
    if (!regex.test(value)) return { invalidDateFormat: true };

    // Check if date creation is possible
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return { invalidDate: true };
    }

    return null;
  }

  private noDigitsValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return /\d/.test(value) ? { containsDigits: true } : null;
  }

  onSubmit(): void {
    if (!this.eventForm.valid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const dto: CreateEventDto = {
      name: this.eventForm.value.name ?? '',
      start_date: this.eventForm.value.start_date ?? '',
      city: this.eventForm.value.city ?? '',
    };

    // Here, a more complete response management would be a better option (success, business error, technical error)
    this.#eventsService.createEvent(dto).subscribe(() => {
      debugger;
      this.eventCreatedNotification.emit();
    });
  }
}
