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
        <div class="flex flex-col gap-3" aria-busy="true" aria-live="polite">
            {[0, 1].map((i) => (
                <div key={i} class="card h-24 animate-pulse bg-surface/50" />
            ))}
            <span class="sr-only">Cargando eventos…</span>
        </div>
    );

    if (events.value.length === 0) return (
        <div class="card p-8 text-center flex flex-col items-center gap-2">
            <span class="display text-2xl text-primary">Aún no hay fechas próximas</span>
            <p class="text-muted">Sígueme en Instagram para enterarte de la siguiente.</p>
        </div>
    );

    return (
        <ol class="flex flex-col gap-3">
            {events.value.map((event: NeluEventState) => (
                <li key={event.id}><EventCard event={event} /></li>
            ))}
        </ol>
    );
}
