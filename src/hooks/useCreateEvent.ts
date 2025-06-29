import { actions } from "astro:actions";
import type { NewNeluEventState } from "../types/event";
import { useCallback } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";
import NeluEventConversor from "../lib/client/eventConversor";
import { extractDateTime } from "../lib/client/dateFormat";

interface Props {
  newEventData: Signal<NewNeluEventState>;
  onCreate: () => void;
}

type Return = {
  createEvent: () => void;
  creating: Signal<boolean>;
};

export default function useCreateEvent(props: Props): Return {
  const { newEventData } = props;

  const creating = useSignal<boolean>(false);

  const createEvent = useCallback(async () => {
    const newEventDTO =  NeluEventConversor.NewState2DTO(newEventData.peek());

    // Start creation
    creating.value = true;
    const { data, error } = await actions.events.create(newEventDTO);
    creating.value = false;

    if (error) {
      console.log(error);
      return;
    }

    // Reset the form event values
    const { date, time } = extractDateTime(new Date);
    newEventData.value = { date, time, location: '' };
    props.onCreate();
  }, []);

  return {
    createEvent,
    creating
  };
}
