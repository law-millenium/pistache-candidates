import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PistacheEvent, CreateEventDto, UpdateEventDto } from '../models/event.model';
import { delay } from 'rxjs';

/**
 * Service Angular pour interagir avec les événements via l’API factice (/api/events).
 *
 * - `getEvents()` : récupère la liste complète
 * - `getEvent(id)` : récupère un événement par son id
 * - `createEvent(dto)` : crée un nouvel événement (POST)
 * - `updateEvent(id, patch)` : met à jour un événement (PATCH partiel)
 * - `deleteEvent(id)` : supprime un événement
 *
 * Pour la démo : un `delay()` est appliqué à chaque requête pour simuler un vrai backend.
 */

@Injectable({ providedIn: 'root' })
export class EventsService {
  // Grâce au proxy, /api/events → http://localhost:4300/events
  private readonly baseUrl = '/api/events';

  constructor(private http: HttpClient) {}

  /** GET /events -> lit dans db.json */
  getEvents() {
    return this.http.get<PistacheEvent[]>(this.baseUrl).pipe(delay(300));
  }

  /** GET /events/:id -> lit un événement précis */
  getEvent(id: string) {
    return this.http.get<PistacheEvent>(`${this.baseUrl}/${encodeURIComponent(id)}`).pipe(delay(150));
  }

  /** POST /events -> crée un événement */
  createEvent(body: CreateEventDto) {
    const id = 'evt-' + Math.random().toString(36).slice(2, 8);
    const payload: PistacheEvent = {
      id,
      name: body.name.trim(),
      start_date: body.start_date ?? null, // input[type="date"] fournit déjà 'YYYY-MM-DD'
      city: body.city?.trim() || null,
      updated_at: new Date().toISOString()
    };
    return this.http.post<PistacheEvent>(this.baseUrl, payload, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(delay(200));
  }

  /** PATCH /events/:id -> mise à jour partielle */
  updateEvent(id: string, patch: UpdateEventDto) {
    const payload: Partial<PistacheEvent> = {
      ...patch,
      updated_at: new Date().toISOString()
    };
    return this.http.patch<PistacheEvent>(`${this.baseUrl}/${encodeURIComponent(id)}`, payload, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(delay(200));
  }

  /** DELETE /events/:id -> supprime un événement */
  deleteEvent(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(id)}`).pipe(delay(200));
  }
}
