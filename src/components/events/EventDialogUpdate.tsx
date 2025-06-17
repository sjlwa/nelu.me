import type { RefObject } from "preact";
import Dialog from "./Dialog";
import useEvent from "./../../hooks/useEvent";
import EventForm from "./EventForm";
import type { NewEvent } from "../../types/event";
import useUpdateEvent from "../../hooks/useUpdateEvent";

interface Props {
    htmlRef: RefObject<HTMLDialogElement>;
    onUpdate: () => void;
}

export default function EventDialogUpdate(props: Props) {

    const onUpdate = () => {
        props.htmlRef?.current?.close();
        props.onUpdate();
    }

    const { currentEvent, onChangeDatetime, onChangeLocation, datetimeISO } = useEvent({ date: new Date(), location: '' });
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
