import type { Signal } from "@preact/signals";
import { memo } from "preact/compat";

interface Props {
    onClick: () => void;
    spinner: Signal<boolean>;
}

function ActionButton(props: Props) {
    const { onClick, spinner } = props;
    return (
        <button
            class="button bg-primary text-dark hover:bg-light w-[50%]"
            onClick={onClick}>
            {
                spinner.value &&
                <span
                    class="w-6 h-6 flex absolute left-6 animate-spin
                           border-dark border-6 border-t-[transparent] rounded-xl">
                </span>
            }
            Guardar
        </button>
    );
}

export default memo(ActionButton);
