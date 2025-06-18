import { actions } from "astro:actions";
import type { NeluEvent } from "../types/event";
import { useCallback } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";

interface Props {
  currentEvent: Signal<NeluEvent>;
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
    currentEvent.value = { id: 0, date: new Date(), location: '' };
  }, []);

  return {
    deleteEvent,
    deleting
  };
}
