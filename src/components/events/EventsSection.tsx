import EventsList from "./EventsList";
import useEvents from "./../../hooks/useEvents";
import EventDialogCreate from "./EventDialogCreate";
import EventDialogUpdate from "./EventDialogUpdate";
import EventDialogDelete from "./EventDialogDelete";
import { dialogs } from "./../../globals/eventGlobals";

export default function EventsSection() {
    const { events, loading, loadEvents, setEventItem, dropEventItem } = useEvents();

    const openEventDialogCreation = () => {
        dialogs.create.peek()?.showModal();
    }

    return (
        <>
            <EventsList events={events} loading={loading} />
            <button
                onClick={openEventDialogCreation}
                class="button bg-primary/50 text-light hover:bg-dark mt-4">
                Agrega un nuevo evento
            </button>
            <EventDialogCreate onCreate={loadEvents} />
            <EventDialogUpdate setEventItem={setEventItem} />
            <EventDialogDelete dropEventItem={dropEventItem} />
        </>
    );
}
