import type { NeluEventState, NewNeluEventState } from "../../types/event";

function __extractDateTime__(datetime: Date, timeZone: string) {
  const datetimeLocale = datetime
    .toLocaleString('sv-SE', { timeZone })
    .split(" ");
  const date = datetimeLocale[0];
  const time = datetimeLocale[1].substring(0, 5);
  return { date, time };
}

export function extractDateTime(datetime: Date) {
  return __extractDateTime__(datetime, 'America/Mexico_City');
}

function __extractLocaleOffset__(timeZone: string): string {
  const timezoneOptions: Intl.DateTimeFormatOptions = {
    timeZone,
    timeZoneName: 'longOffset',
  };
  return (new Date())
    .toLocaleString('sv-SE', timezoneOptions)
    .split('GMT')[1]
    .replace('\u2212', '-'); // replaces Unicode minus sign with ASCII minus sign (recognizable for Date parser)
}

export function extractLocaleOffset(): string {
  return __extractLocaleOffset__('America/Mexico_City');
}

export function eventDatetimeToGTM(neluEventState: NewNeluEventState | NeluEventState, localeOffset: string) {
  return `${neluEventState.date}T${neluEventState.time}:00.000${localeOffset}`;
}
