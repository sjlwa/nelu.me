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
        <article class="bg-dark p-3 flex flex-row justify-between rounded-md">
            <span class="text-primary font-bold">
                <div>{date}</div>
                <div>{time}</div>
            </span>
            <div class="italic text-right">{event.location}</div>
        </article>
    );
}
