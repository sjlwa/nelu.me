import { signIn } from "auth-astro/client";
export default function SignInButton() {
    return (
        <button
            class="btn-sm btn-auth"
            id="signin"
            onClick={() => { signIn("google") }}>
            Acceder
        </button>
    );
}
