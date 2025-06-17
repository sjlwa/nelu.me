import { useRef } from "preact/hooks";
import EventsList from "./EventsList";
import useEvents from "./../../hooks/useEvents";
import EventDialogCreate from "./EventDialogCreate";
import EventDialogUpdate from "./EventDialogUpdate";

export default function EventsSection() {
    const { events, loading, loadEvents } = useEvents();
    const eventDialogCreation = useRef<HTMLDialogElement>(null);
    const eventDialogUpdate = useRef<HTMLDialogElement>(null);

    const openEventDialogCreation = () => {
        eventDialogCreation.current?.showModal();
    }

    return (
        <>
            <EventsList events={events} loading={loading} dialogUpdateRef={eventDialogUpdate}/>
            <button
                onClick={openEventDialogCreation}
                class="button bg-primary text-dark hover:bg-light mt-4">
                Agrega un nuevo evento
            </button>
            <EventDialogCreate
                htmlRef={eventDialogCreation}
                onCreate={loadEvents} />
            <EventDialogUpdate
                htmlRef={eventDialogUpdate}
                onUpdate={() => {}} />
        </>
    );
}
