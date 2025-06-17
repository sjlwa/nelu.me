import type { RefObject } from "preact";
import Dialog from "./Dialog";
import useEvent from "./../../hooks/useEvent";
import EventForm from "./EventForm";

import useCreateEvent from "../../hooks/useCreateEvent";

interface Props {
    htmlRef: RefObject<HTMLDialogElement>;
    onCreate: () => void;
}

export default function EventDialogCreate(props: Props) {

    const onCreate = () => {
        props.htmlRef?.current?.close();
        props.onCreate();
    }

    const { currentEvent, onChangeDatetime, onChangeLocation } = useEvent({ date: new Date(), location: '' });
    const { createEvent, creating } = useCreateEvent({ newEvent: currentEvent, onCreate });
    const datetime = currentEvent.value.date.toLocaleString('sv-SE', { timeZone: 'America/Mexico_City' });

    return (
        <Dialog htmlRef={props.htmlRef}>
            <></>
            <EventForm
                title="Registro de nuevo evento"
                btnText="Registrar"
                datetimeISO={datetime} onChangeDatetime={onChangeDatetime}
                location={currentEvent.value.location} onChangeLocation={onChangeLocation}
                processEvent={createEvent}
                processing={creating}
            />
        </Dialog>
    );
}
