import { Component } from '@angular/core';
import { EventList } from '../event-list/event-list';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [EventList],
})
export class HomeComponent {}
