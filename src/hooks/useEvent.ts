import { Signal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import type { NeluEventState, NewNeluEventState } from "./../types/event";

type TEvent = NeluEventState | NewNeluEventState;

export default function useEvent(currentEvent: Signal<TEvent>) {

  const onChangeDate = useCallback((event: Event) => {
    const input = event.target as HTMLInputElement;
    currentEvent.value = {
      ...currentEvent.value,
      date: input.value,
    };
  }, []);

  const onChangeTime = useCallback((event: Event) => {
    const input = event.target as HTMLInputElement;
    currentEvent.value = {
      ...currentEvent.value,
      time: input.value,
    };
  }, []);

  const onChangeLocation = useCallback((event: Event) => {
    const input = event.target as HTMLInputElement;
    currentEvent.value = {
      ...currentEvent.peek(),
      location: input.value,
    };
  }, []);

  return { currentEvent, onChangeDate, onChangeTime, onChangeLocation };
}
