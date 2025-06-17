import { type Event } from "./../../types/event";

interface Props {
    event: Event;
}

export default function EventCard(props: Props) {
    const event = props.event;

    const date = new Intl.DateTimeFormat(
        'es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(event.date)
    const time = new Intl.DateTimeFormat(
        'en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(event.date)

    return (
        <article class="flex rounded-sm bg-dark p-2 gap-4">
            <div class="flex flex-col @2xl:flex-row @2xl:justify-between items-center w-full">
                <span class="flex justify-center gap-1 text-primary">
                    <span>{date}</span>-
                    <span>{time}</span>
                </span>
                <div class="italic">{event.location}</div>
            </div>
        </article>
    );
}
