import type { RefObject } from "preact";
import Dialog from "./Dialog";
import useEvent from "../../hooks/useEvent";
import EventForm from "./EventForm";
import type { Event as NeluEvent } from "../../types/event";
import useUpdateEvent from "../../hooks/useUpdateEvent";
import { Signal } from "@preact/signals";

interface Props {
    htmlRef: RefObject<HTMLDialogElement>;
    onUpdate: () => void;
    currentEvent: Signal<NeluEvent>
}

export default function EventDialogUpdate(props: Props) {
    const { currentEvent } = props;

    const onUpdate = () => {
        props.htmlRef?.current?.close();
        props.onUpdate();
    }

    const { onChangeDatetime, onChangeLocation, datetimeISO } = useEvent(currentEvent);
    const { updateEvent, updating } = useUpdateEvent({ currentEvent, onUpdate });

    return (
        <Dialog htmlRef={props.htmlRef}>
            <></>
            <EventForm
                title="Modificar evento"
                btnText="Guardar cambios"
                datetimeISO={datetimeISO} onChangeDatetime={onChangeDatetime}
                location={currentEvent.value.location} onChangeLocation={onChangeLocation}
                processEvent={updateEvent}
                processing={updating}
            />
        </Dialog>
    );
}
