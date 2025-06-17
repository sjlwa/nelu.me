import { actions } from "astro:actions";
import { type NewEvent } from "../types/event";
import { useCallback } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";

interface Props {
  currentEvent: Signal<NewEvent>;
  onUpdate: () => void;
}

type Return = {
  updateEvent: () => void;
  updating: Signal<boolean>;
};

export default function useCreateEvent(props: Props): Return {
  const { currentEvent } = props;

  const updating = useSignal<boolean>(false);

  const updateEvent = useCallback(async () => {
    updating.value = true;

    // const { data, error } = await actions.events.create({
    //   date: currentEvent.value.date.toISOString(),
    //   location: currentEvent.value.location,
    // });

    updating.value = false;

    if (error) {
      console.log(error);
      return;
    }

    currentEvent.value = { date: new Date(), location: '' };
    props.onUpdate();
  }, []);

  return {
    updateEvent,
    updating
  };
}
