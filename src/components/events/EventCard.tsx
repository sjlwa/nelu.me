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
        <article class="flex bg-dark p-3 w-[100%]
                       flex-col mx-auto rounded-md
                       md:flex-row md:mx-0 md:justify-between">
            <span class="text-primary font-bold flex
                         flex-row justify-center span-2 gap-3">
                <span>{date}</span>
                <span>{time}</span>
            </span>
            <div class="italic text-center">{event.location}</div>
        </article>
    );
}
