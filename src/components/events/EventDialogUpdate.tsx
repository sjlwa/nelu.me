import Dialog from "./../dialog/Dialog";
import DialogActions from "./../dialog/DialogActions";
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

        // Set the new defined values of event to refresh events list.
        props.setEventItem(editableEvent.peek());
    }

    // dialogs refs used to asign global variables on change.
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogs.update.value = dialogRef.current;
    }, [dialogRef]);

    const { onChangeDatetime, onChangeLocation, datetimeISO } = useEvent(editableEvent);
    const { updateEvent, updating } = useUpdateEvent({ currentEvent: editableEvent, onUpdate });

    const openDeleteDialog = () => {
        dialogs.delete.peek()?.showModal();
    }

    return (
        <Dialog htmlRef={dialogRef}>
            <div class="flex justify-between items-center">
                <h3 class="text-2xl italic font-bold">Modificar evento</h3>
                <button onClick={openDeleteDialog} class="btn-sm bg-orange-900 hover:bg-orange-800">
                    Eliminar
                </button>
            </div>
            <EventForm
                datetimeISO={datetimeISO}
                location={editableEvent.value.location}
                onChangeDatetime={onChangeDatetime}
                onChangeLocation={onChangeLocation} />
            <DialogActions btnText="Guardar cambios" processEvent={updateEvent} processing={updating} />
        </Dialog>
    );
}
