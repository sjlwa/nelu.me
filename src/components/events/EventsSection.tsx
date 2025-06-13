import { useRef } from "preact/hooks";
import EventsList from "./EventsList";
import useFetchEvents from "./useFetchEvents";
import AddEventDialog from "./AddEventDialog";

export default function EventsSection() {
    const [events, loading, fetchEvents] = useFetchEvents();
    const dialogAdd = useRef<HTMLDialogElement>(null);

    const openDialog = () => {
        dialogAdd.current?.showModal();
    }

    return (
        <>
            <EventsList events={events} loading={loading} />
            <button
                onClick={openDialog}
                class="button bg-primary text-dark hover:bg-light mt-4">
                Agrega un nuevo evento
            </button>
            <AddEventDialog htmlRef={dialogAdd} />
        </>
    );
}
