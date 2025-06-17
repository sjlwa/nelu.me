import EventCard from "./EventCard";
import { type Event } from "./../../types/event";
import type { Signal } from "@preact/signals";
import type { RefObject } from "preact";

interface Props {
    events: Signal<Event[]>;
    loading: Signal<boolean>;
    dialogUpdateRef: RefObject<HTMLDialogElement>;
}

export default function EventsList(props: Props) {
    const { events, loading } = props;

    if (loading.value) return (
        <div class="bg-dark p-2 flex flex-row justify-between rounded-sm text-light">
            Cargando eventos ...
        </div>
    );

    return (
        <div class="flex flex-col gap-1">
            <div class="flex flex-col gap-1 @container">
                {
                    events.value.map((event: Event, index: number) => (
                        <EventCard key={index} event={event} dialogUpdateRef={props.dialogUpdateRef} />
                    ))
                }
            </div>
        </div>
    );
}
