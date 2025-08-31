import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PistacheEvent } from '../../../core/models/event.model';
import { EventsService } from '../../../core/services/events.service';
import { EventCard } from '../event-card/event-card';
import { EventList } from './event-list';

describe('EventList', () => {
  let component: EventList;
  let fixture: ComponentFixture<EventList>;

  const sampleEvents: PistacheEvent[] = [
    { id: '2', name: 'Event B', start_date: '2025-09-01', city: 'Paris', updated_at: '2025-08-01' },
    { id: '1', name: 'Event A', start_date: '2025-08-15', city: 'Lyon', updated_at: '2025-08-01' },
    { id: '3', name: 'Event C', start_date: null, city: 'Marseille', updated_at: '2025-08-01' },
  ];

  let mockedEvents$: BehaviorSubject<PistacheEvent[] | undefined>;

  beforeEach(() => {
    mockedEvents$ = new BehaviorSubject<PistacheEvent[] | undefined>(undefined);

    TestBed.configureTestingModule({
      imports: [EventList],
      providers: [
        {
          provide: EventsService,
          useValue: {
            getEvents: jasmine.createSpy('getEvents').and.returnValue(mockedEvents$.asObservable()),
          },
        },
        provideZonelessChangeDetection(),
      ],
    });

    fixture = TestBed.createComponent(EventList);
    component = fixture.componentInstance;
  });

  it('should display loading message when events are undefined', () => {
    fixture.detectChanges();

    const loadingEl = fixture.debugElement.query(By.css('.loading'));
    expect(loadingEl.nativeElement.textContent.trim()).toBe('Chargement des événements...');
  });

  it('should display empty message when events list is empty', () => {
    mockedEvents$.next([]);

    fixture.detectChanges();

    const emptyEl = fixture.debugElement.query(By.css('.empty'));
    expect(emptyEl.nativeElement.textContent.trim()).toContain('Aucun événement disponible');
  });

  it('should display events in sorted order by starting date', () => {
    mockedEvents$.next(sampleEvents);

    fixture.detectChanges();

    const cardsEl = fixture.debugElement.queryAll(By.directive(EventCard));
    expect(cardsEl.length).toBe(3);

    const displayedNames = cardsEl.map((c) => c.componentInstance.event().name);
    expect(displayedNames).toEqual(['Event A', 'Event B', 'Event C']);
  });
});
