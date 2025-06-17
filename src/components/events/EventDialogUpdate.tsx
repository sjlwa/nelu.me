import Dialog from "./Dialog";
import useEvent from "../../hooks/useEvent";
import EventForm from "./EventForm";
import useUpdateEvent from "../../hooks/useUpdateEvent";

import { dialogs, editableEvent } from "./../../globals/eventGlobals";
import { useEffect, useRef } from "preact/hooks";

export default function EventDialogUpdate() {

    const onUpdate = () => {
        dialogs.update.peek()?.close();
        console.log(editableEvent.value);
    }

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogs.update.value = dialogRef.current;
    }, [dialogRef]);

    const { onChangeDatetime, onChangeLocation, datetimeISO } = useEvent(editableEvent);
    const { updateEvent, updating } = useUpdateEvent({ currentEvent: editableEvent, onUpdate });

    return (
        <Dialog htmlRef={dialogRef}>
            <EventForm
                title="Modificar evento"
                btnText="Guardar cambios"
                datetimeISO={datetimeISO} onChangeDatetime={onChangeDatetime}
                location={editableEvent.value.location} onChangeLocation={onChangeLocation}
                processEvent={updateEvent}
                processing={updating}
            />
        </Dialog>
    );
}
