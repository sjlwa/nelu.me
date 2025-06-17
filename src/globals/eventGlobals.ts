import { signal } from "@preact/signals";
import type { Event } from "../types/event";

export const dialogs = {
    create: signal<HTMLDialogElement | null>(null),
    update: signal<HTMLDialogElement | null>(null),
    delete: signal<HTMLDialogElement | null>(null),
};

export const editableEvent = signal<Event>({ id: 0, date: new Date(), location: '' });
