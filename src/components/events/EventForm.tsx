import ActionButton from "./ActionButton";
import type { Signal } from "@preact/signals";

interface Props {
    title: string;
    btnText: string;
    datetimeISO: string;
    onChangeDatetime: (event: Event) => void;
    location: string;
    onChangeLocation: (event: Event) => void;
    processEvent: () => void;
    processing: Signal<boolean>;
};

export default function EventDialog(props: Props) {
    return (
        <>
            <h3 class="text-2xl italic font-bold">{props.title}</h3>
            <div class="flex flex-col gap-3 md:flex-row">
                <div class="flex flex-col w-full">
                    <label>Fecha y hora</label>
                    <input
                        type="datetime-local" class="input"
                        value={props.datetimeISO} onChange={props.onChangeDatetime} />
                </div>
                <div class="flex flex-col w-full">
                    <label>Lugar</label>
                    <input
                        type="text" class="input"
                        placeholder="Mi casita"
                        value={props.location} onChange={props.onChangeLocation} />
                </div>
            </div>
            <div class="flex flex-row gap-3 w-[100%]">
                <ActionButton onClick={props.processEvent} spinner={props.processing} text={props.btnText}/>
                <form method="dialog" class="w-[50%]">
                    <button class="button bg-orange-300 text-dark hover:bg-light w-[100%]">
                        Cancelar
                    </button>
                </form>
            </div>
        </>
    );
}
