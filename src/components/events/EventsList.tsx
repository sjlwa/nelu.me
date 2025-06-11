import EventCard from "./EventCard";
import { type Event } from "./../../types/event";

type Props = {
    events: Event[],
    loading: boolean,
};

export default function EventsList(props: Props) {
    const { events, loading } = props;

    if (loading) return (
        <div class="bg-dark p-3 flex flex-row justify-between rounded-md text-light">
            Cargando eventos ...
        </div>
    );

    return (
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
                {
                    events.map((event: Event, index: number) => (
                        <EventCard key={index} event={event} />
                    ))
                }
            </div>
        </div>
    );
}
