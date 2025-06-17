import { Signal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import type { NeluEvent as EventRecord, NewNeluEvent as NewEventRecord } from "./../types/event";

type TEvent = EventRecord | NewEventRecord;

export default function useEvent(currentEvent: Signal<TEvent>) {

  const onChangeDatetime = useCallback((event: Event) => {
    const input = event.target as HTMLInputElement;
    currentEvent.value = { ...currentEvent.value, date: input.valueAsDate as Date };
  }, []);

  const onChangeLocation = useCallback((event: Event) => {
    const input = event.target as HTMLInputElement;
    currentEvent.value = { ...currentEvent.value, location: input.value };
  }, []);

  const datetimeISO = currentEvent.value.date.toLocaleString('sv-SE', { timeZone: 'America/Mexico_City' });

  return { currentEvent, onChangeDatetime, onChangeLocation, datetimeISO };
}
