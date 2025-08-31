import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PistacheEvent } from '../../../core/models/event.model';
import { EventsService } from '../../../core/services/events.service';
import { EventCard } from '../event-card/event-card';

@Component({
  selector: 'app-event-list',
  imports: [EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
})
export class EventList {
  readonly #eventsService = inject(EventsService);

  readonly #events = toSignal(this.#eventsService.getEvents());

  protected readonly sortedByStartDateEvents = computed<PistacheEvent[] | undefined>(() => {
    const events = this.#events();
    if (!events || events.length === 0) return events;

    return [...events].sort((a, b) => {
      const dateA = a.start_date ? new Date(a.start_date).getTime() : Infinity;
      const dateB = b.start_date ? new Date(b.start_date).getTime() : Infinity;
      return dateA - dateB;
    });
  });
}
