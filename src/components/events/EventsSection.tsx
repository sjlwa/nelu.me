import { useRef } from "preact/hooks";
import EventsList from "./EventsList";
import useEvents from "./useEvents";
import AddEventDialog from "./AddEventDialog";

export default function EventsSection() {
    const { events, loading, loadEvents } = useEvents();
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
            <AddEventDialog
                htmlRef={dialogAdd}
                onEventAdded={loadEvents} />
        </>
    );
}
