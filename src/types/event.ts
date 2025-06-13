export interface Event {
  id: number;
  date: Date;
  location: string;
};

export type NewEventDTO = {
  date: string,
  location: string
};

export type NewEvent = Pick<Event, 'date' | 'location'>;
