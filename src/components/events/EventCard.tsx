import type { NeluEventState } from "./../../types/event";
import { dialogs, editableEvent } from "./../.././globals/eventGlobals";
import { isAuthorized } from "./../../lib/client/authData";

interface Props {
    event: NeluEventState;
}

export default function EventCard(props: Props) {
    const event = props.event;

    const openUpdateDialog = (selectedEvent: NeluEventState) => {
        editableEvent.value = selectedEvent;
        dialogs.update.peek()?.show();
    };

    return (
        <article class="flex p-2 gap-4 border-b-1 border-light/25">
            <div class="flex flex-col @2xl:flex-row @2xl:justify-between items-c enter w-full">
                <span class="flex justify-c enter gap-1 text-primary font-semibold">
                    <span>{event.date}</span>-
                    <span>{event.time}</span>
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
