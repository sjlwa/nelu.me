import { actions } from "astro:actions";
import type { NeluEventState } from "../types/event";
import { useCallback } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";
import { extractDateTime } from "../lib/client/dateFormat";

interface Props {
  currentEvent: Signal<NeluEventState>;
  onDelete: () => void;
}

type Return = {
  deleteEvent: () => void;
  deleting: Signal<boolean>;
};

export default function useDeleteEvent(props: Props): Return {
  const { currentEvent } = props;

  const deleting = useSignal<boolean>(false);

  const deleteEvent = useCallback(async () => {
    deleting.value = true;

    const { data, error } = await actions.events.delete({
      id: currentEvent.value.id,
    });

    deleting.value = false;

    if (error) {
      console.log(error);
      return;
    }

    props.onDelete();
    // Reset the form event values
    const { date, time } = extractDateTime(new Date);
    currentEvent.value = { id: 0, date, time, location: '' };
  }, []);

  return {
    deleteEvent,
    deleting
  };
}
