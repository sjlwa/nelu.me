import type { RefObject } from "preact";
import Dialog from "./Dialog";
import { type NewEvent } from "../../types/event";
import { useCallback, useState } from "preact/hooks";
import { actions } from "astro:actions";

type Props = {
    htmlRef: RefObject<HTMLDialogElement>,
    onEventAdded: () => void,
};

const initialNewEvent = () => ({ date: new Date, location: '' });

export default function AddEventDialog(props: Props) {
    const [newEvent, setNewEvent] = useState<NewEvent>(initialNewEvent());
    const [creating, setCreating] = useState<boolean>(false);

    const inputDateTime = newEvent.date.toLocaleString('sv-SE', { timeZone: 'America/Mexico_City', });

    const updateDatetime = useCallback((event: Event) => {
        const input = event.target as HTMLInputElement;
        setNewEvent({ ...newEvent, date: input.valueAsDate as Date });
    }, []);

    const updateLocation = useCallback((event: Event) => {
        const input = event.target as HTMLInputElement;
        setNewEvent({ ...newEvent, location: input.value });
    }, []);

    const createEvent = async () => {
        setCreating(true);
        const { data, error } = await actions.events.create({
            date: newEvent.date.toISOString(),
            location: newEvent.location,
        });
        setCreating(false);
        if (error) {
            console.log(error)
            return;
        }
        setNewEvent(initialNewEvent);
        props.htmlRef?.current?.close();
        props.onEventAdded();
    }

    return (
        <Dialog htmlRef={props.htmlRef}>
            <h3 class="text-2xl italic font-bold">Nuevo evento</h3>
            <div class="flex flex-col gap-3 md:flex-row">
                <div class="flex flex-col w-full">
                    <label>Fecha y hora</label>
                    <input
                        type="datetime-local" class="input"
                        value={inputDateTime} onChange={updateDatetime} />
                </div>
                <div class="flex flex-col w-full">
                    <label>Lugar</label>
                    <input
                        type="text" class="input"
                        placeholder="Mi casita"
                        value={newEvent.location} onChange={updateLocation} />
                </div>
            </div>
            <div class="flex flex-row gap-3 w-[100%]">
                <button
                    class="button bg-primary text-dark hover:bg-light w-[50%]"
                    onClick={createEvent}>
                    Guardar
                </button>
                <form method="dialog" class="w-[50%]">
                    <button class="button bg-orange-300 text-dark hover:bg-light w-[100%]">
                        Cancelar
                    </button>
                </form>
            </div>
        </Dialog>
    );
}
