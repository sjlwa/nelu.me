import Dialog from "./../dialog/Dialog";
import DialogActions from "./../dialog/DialogActions";
import useEventOnChange from "../../hooks/useEventOnChange";
import EventForm from "./EventForm";

import { dialogs } from "./../../globals/eventGlobals";
import useCreateEvent from "../../hooks/useCreateEvent";
import { useSignal } from "@preact/signals";
import type { NewNeluEventState } from "../../types/event";
import { useEffect, useRef } from "preact/hooks";
import { extractDateTime } from "../../lib/client/dateFormat";

interface Props {
    onCreate: () => void;
}

export default function EventDialogCreate(props: Props) {

    const onCreate = () => {
        dialogs.create.peek()?.close();
        props.onCreate();
    }

    const dialogRef = useRef<HTMLDialogElement>(null);
    const inputRefs = {
        date: useRef<HTMLInputElement>(null),
        time: useRef<HTMLInputElement>(null),
        location: useRef<HTMLInputElement>(null),
    }

    useEffect(() => {
        dialogs.create.value = dialogRef.current;
    }, [dialogRef]);

    const { date, time } = extractDateTime(new Date);
    const currentEvent = useSignal<NewNeluEventState>({ date, time, location: '' });
    const { onChangeDate, onChangeTime, onChangeLocation, } = useEventOnChange({ currentEvent, inputRefs });
    const { createEvent, creating } = useCreateEvent({ newEventData: currentEvent, onCreate });

    return (
        <Dialog htmlRef={dialogRef}>
            <h3 class="text-2xl italic font-bold">Registro de nuevo evento</h3>
            <EventForm
                neluEvent={currentEvent}
                onChangeDate={onChangeDate}
                onChangeTime={onChangeTime}
                onChangeLocation={onChangeLocation}
                inputRefs={inputRefs}
            />
            <DialogActions btnText="Registrar" processEvent={createEvent} processing={creating} />
        </Dialog>
    );
}
