import { signOut } from "auth-astro/client";
import { useEffect } from "preact/hooks";
import { isAuthorized as isAuthorizedSignal } from "./../../lib/client/authData";

interface Props {
    isAuthorized: boolean;
}

export default function SignOutButton(props: Props) {
    const { isAuthorized } = props;

    useEffect(() => {
        isAuthorizedSignal.value = isAuthorized;
    }, [])

    return (
        <button
            class="btn-sm btn-auth"
            id="signout"
            onClick={() => {
                isAuthorizedSignal.value = false;
                signOut();
            }}>
            Cerrar sesión
        </button>
    );
}
