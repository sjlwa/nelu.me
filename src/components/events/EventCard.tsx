import type { NeluEventState } from "./../../types/event";
import { dialogs, editableEvent } from "./../.././globals/eventGlobals";
import { isAuthorized } from "./../../lib/client/authData";
import { eventDatetimeToGTM, extractDateTime, extractDateTimeFancy, extractLocaleOffset } from "../../lib/client/dateFormat";

interface Props {
    event: NeluEventState;
}

export default function EventCard(props: Props) {
    const event = props.event;

    const openUpdateDialog = (selectedEvent: NeluEventState) => {
        editableEvent.value = selectedEvent;
        dialogs.update.peek()?.show();
    };

    const { date: today } = extractDateTime(new Date)
    const datetimeGTM = eventDatetimeToGTM(event, extractLocaleOffset());
    const { date, time } = extractDateTimeFancy(new Date(datetimeGTM));

    return (
        <article class="flex px-6 py-2 gap-4 border-b-1 border-light/10 last:border-b-0 last:pb-6">
            <div class="flex flex-col @2xl:flex-row @2xl:justify-between w-full">
                <span class="flex items-center text-lime-200 gap-1 font-semibold gap-3">
                    <span>{date} - {time}</span>
                    {event.date === today &&
                        <span class="rounded-xl bg-cyan-700 text-xs h-fit px-1">¡Es hoy!</span>
                    }
                </span>
                <div class="italic">{event.location}</div>
            </div>

            {
                isAuthorized.peek() && (
                    <button
                        class="btn-sm bg-light text-dark hover:bg-dark hover:text-primary my-auto h-fit"
                        onClick={() => { openUpdateDialog(event) }}>
                        Editar
                    </button>
                )
            }
        </article>
    );
}
