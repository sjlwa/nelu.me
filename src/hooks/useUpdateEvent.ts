import { actions } from "astro:actions";
import type { NeluEventState } from "../types/event";
import { useCallback } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";
import NeluEventConversor from "../lib/client/eventConversor";
import { extractDateTime } from "../lib/client/dateFormat";

interface Props {
  currentEvent: Signal<NeluEventState>;
  onUpdate: () => void;
}

type Return = {
  updateEvent: () => void;
  updating: Signal<boolean>;
};

export default function useUpdateEvent(props: Props): Return {
  const { currentEvent } = props;

  const updating = useSignal<boolean>(false);

  const updateEvent = useCallback(async () => {
    const eventDTO = NeluEventConversor.State2DTO(currentEvent.peek());

    updating.value = true;
    const { data, error } = await actions.events.update(eventDTO);
    updating.value = false;

    if (error) {
      console.log(error);
      return;
    }

    props.onUpdate();
    // Reset the form event values
    const { date, time } = extractDateTime(new Date);
    currentEvent.value = { id: 0, date, time, location: '' };
  }, []);

  return {
    updateEvent,
    updating
  };
}
