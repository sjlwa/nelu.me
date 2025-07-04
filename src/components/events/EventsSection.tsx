import EventsList from "./EventsList";
import useEvents from "./../../hooks/useEvents";
import EventDialogCreate from "./EventDialogCreate";
import EventDialogUpdate from "./EventDialogUpdate";
import EventDialogDelete from "./EventDialogDelete";
import { dialogs } from "./../../globals/eventGlobals";
import { isAuthorized } from "./../../lib/client/authData";

export default function EventsSection() {
    const { events, loading, loadEvents, setEventItem, dropEventItem } = useEvents();

    const openEventDialogCreation = () => {
        dialogs.create.peek()?.showModal();
    }

    return (
        <>
            <EventsList events={events} loading={loading} />
            {
                isAuthorized.value &&
                (
                    <>

                        <button
                            onClick={openEventDialogCreation}
                            class="button bg-primary text-dark hover:bg-light w-fit self-end m-6">
                            Agrega un nuevo evento
                        </button>

                        <EventDialogCreate onCreate={loadEvents} />
                        <EventDialogUpdate setEventItem={setEventItem} />
                        <EventDialogDelete dropEventItem={dropEventItem} />
                    </>
                )
            }
        </>
    );
}
