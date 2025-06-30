import EventCard from "./EventCard";
import type { NeluEventState } from "./../../types/event";
import type { Signal } from "@preact/signals";

interface Props {
    events: Signal<NeluEventState[]>;
    loading: Signal<boolean>;
}

export default function EventsList(props: Props) {
    const { events, loading } = props;

    if (loading.value) return (
        <div class="font-semibold text-light/60 rounded-3xl text-center p-2 mx-6 italic">
            Cargando eventos ...
        </div>
    );

    return (
        <div class="flex flex-col gap-1">
            <div class="flex flex-col gap-1 @container">
                {
                    events.value.length === 0 ?
                        <div class="font-semibold rounde text-center text-pink-200 p-2 mx-6">
                            Aún no hay eventos disponibles.
                        </div>
                        : events.value.map((event: NeluEventState, index: number) => (
                            <EventCard key={index} event={event} />
                        ))
                }
            </div>
        </div>
    );
}
