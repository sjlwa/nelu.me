import Dialog from "./../dialog/Dialog";
import DialogActions from "./../dialog/DialogActions";
import useEvent from "../../hooks/useEvent";
import EventForm from "./EventForm";

import { dialogs } from "./../../globals/eventGlobals";
import useCreateEvent from "../../hooks/useCreateEvent";
import { useSignal } from "@preact/signals";
import type { NewNeluEvent } from "../../types/event";
import { useEffect, useRef } from "preact/hooks";

interface Props {
    onCreate: () => void;
}

export default function EventDialogCreate(props: Props) {

    const onCreate = () => {
        dialogs.create.peek()?.close();
        props.onCreate();
    }

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogs.create.value = dialogRef.current;
    }, [dialogRef]);

    const currentEvent = useSignal<NewNeluEvent>({ date: new Date(), location: '' });
    const { onChangeDatetime, onChangeLocation, datetimeISO } = useEvent(currentEvent);
    const { createEvent, creating } = useCreateEvent({ newEvent: currentEvent, onCreate });

    return (
        <Dialog htmlRef={dialogRef}>
            <h3 class="text-2xl italic font-bold">Registro de nuevo evento</h3>
            <EventForm
                datetimeISO={datetimeISO}
                location={currentEvent.value.location}
                onChangeDatetime={onChangeDatetime}
                onChangeLocation={onChangeLocation} />
            <DialogActions btnText="Registrar" processEvent={createEvent} processing={creating} />
        </Dialog>
    );
}
