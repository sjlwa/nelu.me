import type { RefObject } from "preact";
import Dialog from "./Dialog";
import ActionButton from "./ActionButton";
import useNewEvent from "./../../hooks/useNewEvent";

type Props = {
    htmlRef: RefObject<HTMLDialogElement>,
    onEventAdded: () => void,
};

export default function AddEventDialog(props: Props) {

    const onEventAdded = () => {
        props.htmlRef?.current?.close();
        props.onEventAdded();
    }

    const { newEvent, updateDatetime, updateLocation, createEvent, creating } = useNewEvent({ onEventAdded });

    const datetime = newEvent.value.date.toLocaleString('sv-SE', { timeZone: 'America/Mexico_City' });

    return (
        <Dialog htmlRef={props.htmlRef}>
            <h3 class="text-2xl italic font-bold">Nuevo evento</h3>
            <div class="flex flex-col gap-3 md:flex-row">
                <div class="flex flex-col w-full">
                    <label>Fecha y hora</label>
                    <input
                        type="datetime-local" class="input"
                        value={datetime} onChange={updateDatetime} />
                </div>
                <div class="flex flex-col w-full">
                    <label>Lugar</label>
                    <input
                        type="text" class="input"
                        placeholder="Mi casita"
                        value={newEvent.value.location} onChange={updateLocation} />
                </div>
            </div>
            <div class="flex flex-row gap-3 w-[100%]">
                <ActionButton onClick={createEvent} spinner={creating} />
                <form method="dialog" class="w-[50%]">
                    <button class="button bg-orange-300 text-dark hover:bg-light w-[100%]">
                        Cancelar
                    </button>
                </form>
            </div>
        </Dialog>
    );
}
