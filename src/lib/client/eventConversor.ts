import type { NeluEvent, NeluEventDTO, NeluEventState, NewNeluEventDTO, NewNeluEventState } from "../../types/event";
import { eventDatetimeToGTM, extractDateTime, extractLocaleOffset } from "./dateFormat";

function NewState2DTO(neluEvent: NewNeluEventState): NewNeluEventDTO {
  const localeOffset = extractLocaleOffset();
  const datetime = eventDatetimeToGTM(neluEvent, localeOffset);
  return {
    date: datetime,
    location: neluEvent.location,
  };
}

function State2DTO(neluEvent: NeluEventState): NeluEventDTO {
  const localeOffset = extractLocaleOffset();
  const datetime = eventDatetimeToGTM(neluEvent, localeOffset);
  return {
    id: neluEvent.id,
    date: datetime,
    location: neluEvent.location,
  };
}

function State2Base(neluEvent: NeluEventState): NeluEvent {
  const localeOffset = extractLocaleOffset();
  const datetime = eventDatetimeToGTM(neluEvent, localeOffset);
  return {
    id: neluEvent.id,
    date: new Date(datetime),
    location: neluEvent.location,
  };
}

function Base2State(neluEvent: NeluEvent): NeluEventState {
  const { date, time } = extractDateTime(neluEvent.date);
  return {
    id: neluEvent.id,
    date,
    time,
    location: neluEvent.location,
  };
}

const NeluEventConversor = {
  NewState2DTO,
  State2DTO,
  State2Base,
  Base2State,
};

export default NeluEventConversor;
