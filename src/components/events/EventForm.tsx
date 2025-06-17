interface Props {
    datetimeISO: string;
    onChangeDatetime: (event: Event) => void;
    location: string;
    onChangeLocation: (event: Event) => void;
};

export default function EventDialog(props: Props) {
    return (
        <>
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
        </>
    );
}
