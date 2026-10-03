import type { NeluEventState } from "./../../types/event";
import { dialogs, editableEvent } from "./../.././globals/eventGlobals";
import { isAuthorized } from "./../../lib/client/authData";
import { eventDatetimeToGTM, extractDateTime, extractDateParts, extractLocaleOffset } from "../../lib/client/dateFormat";

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
    const { weekday, day, month, year, time } = extractDateParts(new Date(datetimeGTM));
    const isToday = event.date === today;
    const currentYear = String(new Date().getFullYear());

    return (
        <article class="card flex items-center gap-5 p-4 md:p-5 transition-colors hover:border-primary/40">
            <div class="flex flex-col items-center justify-center w-16 shrink-0 rounded-xl bg-primary text-dark py-2 leading-none">
                <span class="font-condensed uppercase text-[0.65rem] tracking-widest">{month}</span>
                <span class="display text-3xl">{day}</span>
            </div>

            <div class="flex flex-col flex-1 min-w-0 gap-1">
                <div class="flex flex-wrap items-center gap-2 text-sm text-muted capitalize">
                    <span>{weekday}{year !== currentYear ? ` ${year}` : ''}</span>
                    <span aria-hidden="true">·</span>
                    <span class="normal-case">{time}</span>
                    {isToday &&
                        <span class="rounded-full bg-clay text-light text-xs px-2 py-0.5 normal-case font-semibold">¡Es hoy!</span>
                    }
                </div>
                <div class="font-semibold text-lg leading-snug">{event.location}</div>
            </div>

            {
                isAuthorized.peek() && (
                    <button
                        class="btn-sm btn-auth"
                        onClick={() => { openUpdateDialog(event) }}>
                        Editar
                    </button>
                )
            }
        </article>
    );
}
