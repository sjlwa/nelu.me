import Dialog from "./../dialog/Dialog";
import DialogActions from "./../dialog/DialogActions";
import useEventOnChange from "../../hooks/useEventOnChange";
import EventForm from "./EventForm";
import useUpdateEvent from "../../hooks/useUpdateEvent";

import { dialogs, editableEvent } from "./../../globals/eventGlobals";
import { useEffect, useRef } from "preact/hooks";
import type { NeluEventState } from "../../types/event";


interface Props {
    setEventItem: (event: NeluEventState) => void;
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
    const inputRefs = {
        date: useRef<HTMLInputElement>(null),
        time: useRef<HTMLInputElement>(null),
        location: useRef<HTMLInputElement>(null),
    }

    useEffect(() => {
        dialogs.update.value = dialogRef.current;
    }, [dialogRef]);

    const { onChangeDate, onChangeTime, onChangeLocation } = useEventOnChange({ currentEvent: editableEvent, inputRefs });
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
                neluEvent={editableEvent}
                onChangeDate={onChangeDate}
                onChangeTime={onChangeTime}
                onChangeLocation={onChangeLocation}
                inputRefs={inputRefs} />
            <DialogActions btnText="Guardar cambios" processEvent={updateEvent} processing={updating} />
        </Dialog>
    );
}
