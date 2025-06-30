import type { NeluEventState, NewNeluEventState } from "../../types/event";

function __extractDateTimeISO__(datetime: Date, timeZone: string) {
  const datetimeLocale = datetime
    .toLocaleString('sv-SE', { timeZone })
    .split(" ");
  const date = datetimeLocale[0];
  const time = datetimeLocale[1].substring(0, 5);
  return { date, time };
}

export function extractDateTime(datetime: Date) {
  return __extractDateTimeISO__(datetime, 'America/Mexico_City');
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

function __extractDateTimeFancy__(datetime: Date, timeZone: string) {
  const date = new Intl.DateTimeFormat(
    'es-ES', { day: 'numeric', month: 'short', year: 'numeric', timeZone }).format(datetime)
  const time = new Intl.DateTimeFormat(
    'en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone }).format(datetime)
  return { date, time };
}

export function extractDateTimeFancy(datetime: Date) {
  return __extractDateTimeFancy__(datetime, 'America/Mexico_City');
}

export function eventDatetimeToGTM(neluEventState: NewNeluEventState | NeluEventState, localeOffset: string) {
  return `${neluEventState.date}T${neluEventState.time}:00.000${localeOffset}`;
}

export function eventDatetimeIsAfterNow(event: NewNeluEventState | NeluEventState) {
  const localeOffset = extractLocaleOffset();
  const datetimeString = eventDatetimeToGTM(event, localeOffset);
  const datetime = new Date(datetimeString);
  const now = new Date();
  return datetime > now;
}
