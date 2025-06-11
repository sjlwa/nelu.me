import type { Ref } from "preact";
import Dialog from "./Dialog";

type Props = {
    htmlRef: Ref<HTMLDialogElement>,
};

export default function AddEventDialog(props: Props) {
    return (
        <Dialog htmlRef={props.htmlRef}>
            <h3 class="text-2xl italic font-bold">Nuevo evento</h3>

            <div class="flex flex-col gap-3 md:flex-row">
                <div class="flex flex-col w-full">
                    <label>Fecha</label>
                    <input type="date" class="input" />
                </div>
                <div class="flex flex-col w-full">
                    <label>Hora</label>
                    <input type="time" class="input" />
                </div>
            </div>
            <div class="flex flex-row gap-3 w-[100%]">
                <button class="button bg-primary text-dark hover:bg-light w-[50%]">
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
