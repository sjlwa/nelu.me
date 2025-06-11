import EventsList from "./EventsList";
import useFetchEvents from "./useFetchEvents";

export default function EventsSection() {
    const [events, setEvents, loading] = useFetchEvents();

    return (
        <>
            <EventsList events={events} loading={loading} />
            <button
                onClick={openDialog}
                class="button bg-primary text-dark hover:bg-light mt-4">
                Agrega un nuevo evento
            </button>
        </>
    );
}
