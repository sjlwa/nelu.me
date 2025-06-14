import { actions } from "astro:actions";
import { type NewEvent } from "../types/event";
import { useCallback } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";

const initialNewEvent = () => ({ date: new Date(), location: '' });

interface Props {
  onEventAdded: () => void;
}

type Return = {
  newEvent: Signal<NewEvent>;
  updateDatetime: (event: Event) => void;
  updateLocation: (event: Event) => void;
  createEvent: () => void;
  creating: Signal<boolean>;
};

export default function useNewEvent(props: Props): Return {
  const newEvent = useSignal<NewEvent>(initialNewEvent());
  const creating = useSignal<boolean>(false);

  const updateDatetime = useCallback((event: Event) => {
    const input = event.target as HTMLInputElement;
    newEvent.value = { ...newEvent.value, date: input.valueAsDate as Date };
  }, []);

  const updateLocation = useCallback((event: Event) => {
    const input = event.target as HTMLInputElement;
    newEvent.value = { ...newEvent.value, location: input.value };
  }, []);

  const createEvent = useCallback(async () => {
    creating.value = true;

    const { data, error } = await actions.events.create({
      date: newEvent.value.date.toISOString(),
      location: newEvent.value.location,
    });

    creating.value = false;

    if (error) {
      console.log(error);
      return;
    }

    newEvent.value = initialNewEvent();
    props.onEventAdded();
  }, []);

  return {
    newEvent,
    updateDatetime,
    updateLocation,
    createEvent,
    creating
  };
}
