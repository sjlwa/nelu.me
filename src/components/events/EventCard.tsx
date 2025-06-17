import type { NeluEvent } from "./../../types/event";
import { dialogs, editableEvent } from "./../.././globals/eventGlobals";

interface Props {
    event: NeluEvent;
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
        editableEvent.value = selectedEvent;
        dialogs.update.peek()?.show();
    };

    return (
        <article class="flex p-2 gap-4 border-b-1 border-light/25">
            <div class="flex flex-col @2xl:flex-row @2xl:justify-between items-center w-full">
                <span class="flex justify-center gap-1 text-light font-semibold">
                    <span>{date}</span>-
                    <span>{time}</span>
                </span>
                <div class="italic">{event.location}</div>
            </div>
            <div>
                <button
                    class="btn-sm bg-primary/50 text-light hover:bg-dark ml-auto"
                    onClick={() => { openUpdateDialog(event) }}>
                    Editar
                </button>
            </div>
        </article>
    );
}
