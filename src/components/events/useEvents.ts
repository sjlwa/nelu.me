import { useEffect, useState } from "preact/hooks";
import { actions } from 'astro:actions';
import { type Event } from "./../../types/event";

type Return = {
  events: Event[];
  loading: boolean;
  loadEvents: () => void;
};

export default function useEvents(): Return {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);

  async function loadEvents(): Promise<void> {
    const { data, error } = await actions.events.getAll(); // TODO: handle error
    setEvents(data as Event[]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return { events, loading, loadEvents };
}
