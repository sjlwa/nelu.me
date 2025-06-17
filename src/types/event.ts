export interface NeluEvent {
  id: number;
  date: Date;
  location: string;
};

export type NewNeluEvent = Omit<NeluEvent, 'id'>;

export interface NeluEventDTO {
  id: number;
  date: string;
  location: string;
};

export type NewNeluEventDTO = Omit<NeluEventDTO, 'id'>;
