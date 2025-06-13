import { useEffect, useState, type Dispatch } from "preact/hooks";
import { actions } from 'astro:actions';
import { type Event } from "./../../types/event";

type Return = [Event[], boolean, () => void];

export default function useFetchEvents(): Return {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);

  async function fetchEvents() : Promise<void> {
    const { data, error } = await actions.events.getAll(); // TODO: handle error
    setEvents(data as Event[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return [events, loading, fetchEvents];
}
