import { Component, inject, Signal, signal } from '@angular/core';
import { EventList } from '../event-list/event-list';
import { EventForm } from '../event-form/event-form';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventsService } from '../../../core/services/events.service';
import { PistacheEvent } from '../../../core/models/event.model';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [EventList, EventForm],
})
export class HomeComponent {
  readonly #eventsService = inject(EventsService);

  protected events = signal<PistacheEvent[] | undefined>(undefined);

  constructor() {
    this.getEvents();
  }

  private getEvents(): void {
    this.#eventsService.getEvents().subscribe((events) => {
      this.events.set(events);
    });
  }

  public fetchNewEvents(): void {
    this.getEvents();
  }
}
