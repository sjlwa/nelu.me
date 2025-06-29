import type { Signal } from "@preact/signals";
import type { NeluEventState, NewNeluEventState } from "../../types/event";

interface Props {
    neluEvent: Signal<NewNeluEventState | NeluEventState>;
    onChangeDate: (event: Event) => void;
    onChangeTime: (event: Event) => void;
    onChangeLocation: (event: Event) => void;
};

export default function EventForm(props: Props) {
    return (
        <>
            <div class="flex flex-col gap-3 md:flex-row">
                <div class="flex flex-row w-full gap-3">
                    <div class="flex flex-col w-full">
                        <label>Fecha</label>
                        <input
                            type="date" class="input"
                            value={props.neluEvent.value.date} onChange={props.onChangeDate} />
                    </div>
                    <div class="flex flex-col w-full">
                        <label>Hora</label>
                        <input
                            type="time" class="input"
                            value={props.neluEvent.value.time} onChange={props.onChangeTime} />
                    </div>
                </div>
                <div class="flex flex-col w-full">
                    <label>Lugar</label>
                    <input
                        type="text" class="input"
                        placeholder="Mi casita"
                        value={props.neluEvent.value.location} onChange={props.onChangeLocation} />
                </div>
            </div>
        </>
    );
}
