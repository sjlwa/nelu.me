import type { RefObject } from "preact";
import Dialog from "./Dialog";
import useEvent from "../../hooks/useEvent";
import EventForm from "./EventForm";

import useCreateEvent from "../../hooks/useCreateEvent";
import { useSignal } from "@preact/signals";
import type { NewEvent } from "../../types/event";

interface Props {
    htmlRef: RefObject<HTMLDialogElement>;
    onCreate: () => void;
}

export default function EventDialogCreate(props: Props) {

    const onCreate = () => {
        props.htmlRef?.current?.close();
        props.onCreate();
    }
    const currentEvent = useSignal<NewEvent>({ date: new Date(), location: '' });
    const { onChangeDatetime, onChangeLocation } = useEvent(currentEvent);
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
