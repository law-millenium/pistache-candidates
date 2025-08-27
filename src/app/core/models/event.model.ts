/**
 * Modèles TypeScript pour les événements Pistache.
 *
 * - `PistacheEvent` : structure complète renvoyée par l’API.
 * - `CreateEventDto` : données nécessaires pour créer un événement (name, start_date, city).
 * - `UpdateEventDto` : données partielles pour mettre à jour un événement (toutes optionnelles).
 *
 * Exemple :
 *   const create: CreateEventDto = { name: 'Soirée', start_date: '2025-09-10', city: 'Paris' };
 *   const update: UpdateEventDto = { city: 'Lyon' };
 */
export interface PistacheEvent {
  id: string;
  name: string;
  start_date: string | null;
  city: string | null;
  updated_at: string;
}

export type CreateEventDto = Pick<PistacheEvent, 'name' | 'start_date' | 'city'>;
export type UpdateEventDto = Partial<Pick<PistacheEvent, 'name' | 'start_date' | 'city'>>;