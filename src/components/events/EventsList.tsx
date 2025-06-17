import EventCard from "./EventCard";
import type { Event as NeluEvent } from "./../../types/event";
import type { Signal } from "@preact/signals";
import type { RefObject } from "preact";

interface Props {
    events: Signal<NeluEvent[]>;
    loading: Signal<boolean>;
    dialogUpdateRef: RefObject<HTMLDialogElement>;
    editableEvent: Signal<NeluEvent>;
}

export default function EventsList(props: Props) {
    const { events, loading, editableEvent } = props;

    if (loading.value) return (
        <div class="bg-dark p-2 flex flex-row justify-between rounded-sm text-light">
            Cargando eventos ...
        </div>
    );

    return (
        <div class="flex flex-col gap-1">
            <div class="flex flex-col gap-1 @container">
                {
                    events.value.map((event: NeluEvent, index: number) => (
                        <EventCard key={index} event={event} dialogUpdateRef={props.dialogUpdateRef} editableEvent={editableEvent} />
                    ))
                }
            </div>
        </div>
    );
}
