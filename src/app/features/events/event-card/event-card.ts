import { Component, input } from '@angular/core';
import { PistacheEvent } from '../../../core/models/event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
})
export class EventCard {
  public readonly event = input.required<PistacheEvent>();
}
