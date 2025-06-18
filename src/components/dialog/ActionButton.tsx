import type { Signal } from "@preact/signals";
import { memo } from "preact/compat";

interface Props {
    class?: string;
    onClick: () => void;
    spinner: Signal<boolean>;
    text: string;
}

function ActionButton(props: Props) {
    const { onClick, spinner, class: classList } = props;
    return (
        <button
            class={`button w-[50%] ${classList ? classList : 'bg-primary text-dark hover:bg-light'}`}
            onClick={onClick}>
            {
                spinner.value &&
                <span
                    class="w-6 h-6 flex absolute left-6 animate-spin
                           border-dark border-6 border-t-[transparent] rounded-xl">
                </span>
            }
            {props.text}
        </button>
    );
}

export default memo(ActionButton);
