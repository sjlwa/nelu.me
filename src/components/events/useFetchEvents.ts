import { useEffect, useState, type Dispatch } from "preact/hooks";
import { actions } from 'astro:actions';
import type { SetStateAction } from "preact/compat";
import { type Event } from "./../../types/event";

export default function useFetchEvents(): [Event[], Dispatch<SetStateAction<Event[]>>, boolean] {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getEvents() {
      const { data, error } = await actions.events.getAll();
      setEvents(data);
      setIsLoading(false);
    };
    getEvents();
  }, []);

  return [events, setEvents, loading];
}
