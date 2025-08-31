import { DatePipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PistacheEvent } from '../../../core/models/event.model';
import { EventCard } from './event-card';

describe('EventCard', () => {
  let fixture: ComponentFixture<EventCard>;

  const baseEvent: PistacheEvent = {
    id: '1',
    name: 'Test Event',
    start_date: '2025-09-15',
    city: 'Paris',
    updated_at: '2025-08-31T14:30:00',
  };

  const initTestBed = () => {
    TestBed.configureTestingModule({
      imports: [EventCard, DatePipe],
      providers: [provideZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(EventCard);
  };

  describe('Start date display', () => {
    const dateTestCases = [
      {
        description: 'should format valid date correctly',
        input: '2025-09-15',
        expectedOutput: '15/09/2025',
      },
      {
        description: 'should display fallback text when start_date is falsy',
        input: undefined,
        expectedOutput: 'Date à venir',
      },
    ];

    beforeEach(() => {
      initTestBed();
    });

    dateTestCases.forEach((testCase) => {
      it(testCase.description, () => {
        const testEvent = {
          ...baseEvent,
          start_date: testCase.input,
        };

        fixture.componentRef.setInput('event', testEvent);
        fixture.detectChanges();

        const dateEl = fixture.debugElement.query(By.css('.date'));
        expect(dateEl.nativeElement.textContent.trim()).toBe(testCase.expectedOutput);
      });
    });
  });

  describe('City Display', () => {
    const cityTestCases = [
      {
        description: 'should display city with location icon when city is provided',
        input: 'Lyon',
        expectedOutput: '📍 Lyon',
      },
      {
        description: 'should display fallback text when city is falsy',
        input: null,
        expectedOutput: '📍 Ville non renseignée',
      },
    ];

    beforeEach(() => {
      initTestBed();
    });

    cityTestCases.forEach((testCase) => {
      it(testCase.description, () => {
        fixture.componentRef.setInput('event', { ...baseEvent, city: testCase.input });
        fixture.detectChanges();

        const cityEl = fixture.debugElement.query(By.css('.city'));
        expect(cityEl.nativeElement.textContent.trim()).toBe(testCase.expectedOutput);
      });
    });
  });

  it('Updated Date Display', () => {
    fixture.componentRef.setInput('event', baseEvent);
    fixture.detectChanges();

    const updateDateEl = fixture.debugElement.query(By.css('.update-date'));
    const fullText = updateDateEl.nativeElement.textContent.trim();

    expect(fullText).toBe('Dernière mise à jour : 31/08/2025 14:30');
  });
});
