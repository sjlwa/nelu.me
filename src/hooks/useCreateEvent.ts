import { actions } from "astro:actions";
import { type NewEvent } from "../types/event";
import { useCallback } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";

interface Props {
  newEvent: Signal<NewEvent>;
  onCreate: () => void;
}

type Return = {
  createEvent: () => void;
  creating: Signal<boolean>;
};

export default function useCreateEvent(props: Props): Return {
  const { newEvent } = props;

  const creating = useSignal<boolean>(false);

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

    newEvent.value = { date: new Date(), location: '' };
    props.onCreate();
  }, []);

  return {
    createEvent,
    creating
  };
}
