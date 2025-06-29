import { Signal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import type { NeluEventState, NewNeluEventState } from "./../types/event";
import { eventDatetimeIsAfterNow } from "../lib/client/dateFormat";
import type { RefObject } from "preact";

type TEvent = NeluEventState | NewNeluEventState;

interface Props {
  currentEvent: Signal<TEvent>;
  inputRefs: {
    date: RefObject<HTMLInputElement>;
    time: RefObject<HTMLInputElement>;
    location: RefObject<HTMLInputElement>;
  };
}

export default function useEventOnChange({ currentEvent, inputRefs }: Props) {

  const toggleInvalidInputTarget = useCallback((event: TEvent) => {
    const datetimeIsValid = eventDatetimeIsAfterNow(event);
    if (datetimeIsValid) {
      inputRefs.date.current?.classList.remove('input-invalid');
      inputRefs.time.current?.classList.remove('input-invalid');
    } else if (!inputRefs.date.current?.classList.contains('input-invalid')) {
      inputRefs.date.current?.classList.add('input-invalid');
      inputRefs.time.current?.classList.add('input-invalid');
    }
  }, []);

  const onChangeDate = useCallback(() => {
    currentEvent.value = {
      ...currentEvent.value,
      date: inputRefs.date.current!.value,
    };
    toggleInvalidInputTarget(currentEvent.peek());
  }, []);

  const onChangeTime = useCallback(() => {
    currentEvent.value = {
      ...currentEvent.value,
      time: inputRefs.time.current!.value,
    };
    toggleInvalidInputTarget(currentEvent.peek());
  }, []);

  const onChangeLocation = useCallback(() => {
    currentEvent.value = {
      ...currentEvent.peek(),
      location: inputRefs.location.current!.value,
    };
    if (inputRefs.location.current?.value.length == 0) {
      inputRefs.location.current?.classList.add('input-invalid');
    } else {
      inputRefs.location.current?.classList.remove('input-invalid');
    }

  }, []);

  return { currentEvent, onChangeDate, onChangeTime, onChangeLocation };
}
