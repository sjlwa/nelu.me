import EventCard from "./EventCard";
import type { NeluEvent, NeluEventState } from "./../../types/event";
import type { Signal } from "@preact/signals";

interface Props {
    events: Signal<NeluEventState[]>;
    loading: Signal<boolean>;
}

export default function EventsList(props: Props) {
    const { events, loading } = props;

    if (loading.value) return (
        <div class="bg-dark p-6 flex flex-row justify-between rounded-sm text-light">
            Cargando eventos ...
        </div>
    );

    return (
        <div class="flex flex-col gap-1">
            <div class="flex flex-col gap-1 @container">
                {
                    events.value.map((event: NeluEventState, index: number) => (
                        <EventCard key={index} event={event} />
                    ))
                }
            </div>
        </div>
    );
}
