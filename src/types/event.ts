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

export interface NeluEventState {
  id: number;
  date: string;
  time: string;
  location: string;
};

export type NewNeluEventState = Omit<NeluEventState, 'id'>;
