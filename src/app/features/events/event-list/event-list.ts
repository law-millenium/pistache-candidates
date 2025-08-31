import { Component, computed, input } from '@angular/core';
import { PistacheEvent } from '../../../core/models/event.model';
import { EventCard } from '../event-card/event-card';

@Component({
  selector: 'app-event-list',
  imports: [EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
})
export class EventList {
  public readonly events = input<PistacheEvent[]>();

  protected readonly sortedByStartDateEvents = computed<PistacheEvent[] | undefined>(() => {
    const events = this.events();
    if (!events || events.length === 0) return events;

    return [...events].sort((a, b) => {
      const dateA = a.start_date ? new Date(a.start_date).getTime() : Infinity;
      const dateB = b.start_date ? new Date(b.start_date).getTime() : Infinity;
      return dateA - dateB;
    });
  });
}
