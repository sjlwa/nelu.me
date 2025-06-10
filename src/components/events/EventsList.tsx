import EventCard from "./EventCard";
import { type Event } from "./../../types/event";
import useFetchEvents from "./useFetchEvents";

export default function EventsList() {
    const [events, setEvents, loading] = useFetchEvents();

    if (loading) return (
        <div class="bg-dark p-3 flex flex-row justify-between rounded-md text-light">
            Cargando eventos ...
        </div>
    );

    return (
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
                {
                    events.map((event: Event, index: number) => (
                        <EventCard key={index} event={event} />
                    ))
                }
            </div>
            <button class="bg-primary font-bold text-dark hover:bg-light hover:text-dark py-2 px-4 rounded-sm cursor-pointer">
                Agregar nuevo evento
            </button>
        </div>
    );
}
