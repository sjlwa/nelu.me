import type { RefObject } from "preact";
import type { Event as NeluEvent } from "./../../types/event";
import type { Signal } from "@preact/signals";

interface Props {
    event: NeluEvent;
    dialogUpdateRef: RefObject<HTMLDialogElement>;
    editableEvent: Signal<NeluEvent>;
}

function extractDateAndTime(datetime: Date) {
    const date = new Intl.DateTimeFormat(
        'es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(datetime)
    const time = new Intl.DateTimeFormat(
        'en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(datetime)
    return { date, time };
}

export default function EventCard(props: Props) {
    const event = props.event;
    const { date, time } = extractDateAndTime(event.date);

    const openUpdateDialog = (selectedEvent: NeluEvent) => {
        props.editableEvent.value = selectedEvent;
        props.dialogUpdateRef.current?.show();
    };

    return (
        <article class="flex rounded-sm bg-dark p-2 gap-4">
            <div class="flex flex-col @2xl:flex-row @2xl:justify-between items-center w-full">
                <span class="flex justify-center gap-1 text-primary">
                    <span>{date}</span>-
                    <span>{time}</span>
                </span>
                <div class="italic">{event.location}</div>
            </div>
            <div>
                <button
                    class="btn-sm bg-brown text-light ml-auto"
                    onClick={() => { openUpdateDialog(event) }}>
                    Editar
                </button>
            </div>
        </article>
    );
}
