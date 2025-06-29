import { signal } from "@preact/signals";
import type { NeluEventState } from "../types/event";
import { extractDateTime } from "../lib/client/dateFormat";

export const dialogs = {
    create: signal<HTMLDialogElement | null>(null),
    update: signal<HTMLDialogElement | null>(null),
    delete: signal<HTMLDialogElement | null>(null),
};

const { date, time } = extractDateTime(new Date);
export const editableEvent = signal<NeluEventState>({ id: 0, date, time, location: '' });
