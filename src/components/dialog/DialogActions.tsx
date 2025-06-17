import type { Signal } from "@preact/signals";
import ActionButton from "./ActionButton";

interface Props {
    btnText: string;
    processEvent: () => void;
    processing: Signal<boolean>;
};

export default function ActionSection(props: Props) {
    return (
        <div class="flex flex-row gap-3 w-[100%]">
            <ActionButton onClick={props.processEvent} spinner={props.processing} text={props.btnText} />
            <form method="dialog" class="w-[50%]">
                <button class="button bg-orange-300 text-dark hover:bg-light w-[100%]">
                    Cancelar
                </button>
            </form>
        </div>
    );
}
