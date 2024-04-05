import Link from "next/link"

export default function LoginForm() {
    return (
        <div>
            <div>
                <input type="email" placeholder="E-Mail" />

                <input type="password" placeholder="Password" />
            </div>

            <button>
                <p>Login</p>
            </button>

            <div>
                Error message
            </div>

            <Link href="/signup">
                <p>Don't have an account? Sign Up Here</p>
            </Link>
        </div>
    )
}
