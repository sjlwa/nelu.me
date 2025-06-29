import { actions } from 'astro:actions';
import type { NeluEventState } from "./../types/event";
import { Signal, useSignal, useSignalEffect } from "@preact/signals";
import NeluEventConversor from '../lib/client/eventConversor';

type Return = {
  events: Signal<NeluEventState[]>;
  loading: Signal<boolean>;
  loadEvents: () => void;
  setEventItem: (event: NeluEventState) => void;
  dropEventItem: (event: NeluEventState) => void;
};

export default function useEvents(): Return {
  const events = useSignal<NeluEventState[]>([]);
  const loading = useSignal<boolean>(true);

  async function loadEvents(): Promise<void> {
    const { data, error } = await actions.events.getAll();
    if (error) {
      throw new Error(error.message);
    }
    events.value = data.map(NeluEventConversor.Base2State);
    loading.value = false;
  };

  const setEventItem = (event: NeluEventState) => {
    events.value = events
      .peek()
      .map(e => e.id === event.id ? event : e);
  }

  const dropEventItem = (event: NeluEventState) => {
    events.value = events.peek().filter(e => e.id != event.id);
  }

  useSignalEffect(() => {
    loadEvents();
  });

  return { events, loading, loadEvents, setEventItem, dropEventItem };
}
