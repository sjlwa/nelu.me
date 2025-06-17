import Dialog from "./Dialog";
import useEvent from "../../hooks/useEvent";
import EventForm from "./EventForm";
import useUpdateEvent from "../../hooks/useUpdateEvent";

import { dialogs, editableEvent } from "./../../globals/eventGlobals";
import { useEffect, useRef } from "preact/hooks";
import type { NeluEvent } from "../../types/event";

interface Props {
    setEventItem: (event: NeluEvent) => void;
}

export default function EventDialogUpdate(props: Props) {

    // Runs after event was successfully updated.
    const onUpdate = () => {
        dialogs.update.peek()?.close();

        // Set the new defined values of event on events list.
        props.setEventItem(editableEvent.peek());
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
