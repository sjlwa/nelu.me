import { actions } from "astro:actions";
import type { NeluEvent } from "../types/event";
import { useCallback } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";

interface Props {
  currentEvent: Signal<NeluEvent>;
  onUpdate: () => void;
}

type Return = {
  updateEvent: () => void;
  updating: Signal<boolean>;
};

export default function useupdateevent(props: Props): Return {
  const { currentEvent } = props;

  const updating = useSignal<boolean>(false);

  const updateEvent = useCallback(async () => {
    updating.value = true;

    const { data, error } = await actions.events.update({
      id: currentEvent.value.id,
      date: currentEvent.value.date.toISOString(),
      location: currentEvent.value.location,
    });

    updating.value = false;

    if (error) {
      console.log(error);
      return;
    }

    props.onUpdate();
    currentEvent.value = { id: 0, date: new Date(), location: '' };
  }, []);

  return {
    updateEvent,
    updating
  };
}
