import { actions } from 'astro:actions';
import { type Event } from "./../types/event";
import { Signal, useSignal, useSignalEffect } from "@preact/signals";

type Return = {
  events: Signal<Event[]>;
  loading: Signal<boolean>;
  loadEvents: () => void;
};

export default function useEvents(): Return {
  const events = useSignal<Event[]>([]);
  const loading = useSignal<boolean>(true);

  async function loadEvents(): Promise<void> {
    const { data, error } = await actions.events.getAll(); // TODO: handle error
    events.value = data as Event[];
    loading.value = false;
  };

  useSignalEffect(() => {
    loadEvents();
  });

  return { events, loading, loadEvents };
}
