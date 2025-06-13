interface Props {
    onClick: () => void;
    spinner: boolean;
}

export default function ActionButton(props: Props) {
    const { onClick, spinner } = props;
    return (
        <button
            class="button bg-primary text-dark hover:bg-light w-[50%]"
            onClick={onClick}>
            {
                spinner &&
                <span
                    class="w-6 h-6 flex absolute left-6 animate-spin
                           border-dark border-6 border-t-[transparent] rounded-xl">
                </span>
            }
            Guardar
        </button>
    );
}
