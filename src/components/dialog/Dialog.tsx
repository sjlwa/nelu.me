import type { Ref, VNode } from "preact";

interface Props {
    htmlRef: Ref<HTMLDialogElement>;
    children: VNode | VNode[];
}

export default function Dialog(props: Props) {
    return (
        <dialog
            ref={props.htmlRef}
            class="fixed inset-0 min-w-full h-full min-h-[100vh] z-1 bg-dark/75 text-left">
            <div class="flex flex-col h-full text-light justify-between">
                <form method="dialog" class="h-[40%]">
                    <button class="w-full h-full"></button>
                </form>
                <div
                  id="dialog-content"
                  class="bg-dark flex flex-col gap-3 h-[60%] border-t-light/40 border-t-[1px] p-4">
                    {props.children}
                </div>
            </div>
        </dialog >
    );
}
