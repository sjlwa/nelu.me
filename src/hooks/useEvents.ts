import { actions } from 'astro:actions';
import type { NeluEvent } from "./../types/event";
import { Signal, useSignal, useSignalEffect } from "@preact/signals";

type Return = {
  events: Signal<NeluEvent[]>;
  loading: Signal<boolean>;
  loadEvents: () => void;
  setEventItem: (event: NeluEvent) => void;
};

export default function useEvents(): Return {
  const events = useSignal<NeluEvent[]>([]);
  const loading = useSignal<boolean>(true);

  async function loadEvents(): Promise<void> {
    const { data, error } = await actions.events.getAll(); // TODO: handle error
    events.value = data as NeluEvent[];
    loading.value = false;
  };

  const setEventItem = (event: NeluEvent) => {
    events.value = events.peek().map(e => e.id === event.id ? event : e);
  }

  useSignalEffect(() => {
    loadEvents();
  });

  return { events, loading, loadEvents, setEventItem };
}
