import { useEffect, useRef } from "preact/hooks";
import { dialogs, editableEvent } from "./../../globals/eventGlobals";
import Dialog from "./../dialog/Dialog";
import DialogActions from "./../dialog/DialogActions";
import useDeleteEvent from "../../hooks/useDeleteEvent";
import type { NeluEvent } from "../../types/event";

interface Props {
    dropEventItem: (event: NeluEvent) => void;
}

export default function EventDialogDelete(props: Props) {

    // Runs after event was successfully deleted.
    const onDelete = () => {
        dialogs.update.peek()?.close();
        dialogs.delete.peek()?.close();

        // Remove the deleted event to refresh events list.
        props.dropEventItem(editableEvent.peek());
    }

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogs.delete.value = dialogRef.current;
    }, [dialogRef]);

    const { deleteEvent, deleting } = useDeleteEvent({ currentEvent: editableEvent, onDelete });

    return (
        <Dialog htmlRef={dialogRef}>
            <div class="flex justify-between items-center">
                <h3 class="text-2xl italic font-bold">¿Eliminar evento?</h3>
            </div>
            <DialogActions
                btnText="Eliminar"
                btnClass="bg-orange-900 text-light hover:bg-light hover:text-dark"
                processEvent={deleteEvent}
                processing={deleting} />
        </Dialog>
    );
}
