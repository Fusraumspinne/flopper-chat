import Link from "next/link"

export default function Form({ type }) {
    return (
        <div>
            <div>
                {type === "signup" && <input type="text" placeholder="Username" />}
            </div>

            <div>
                <input type="email" placeholder="E-Mail" />

                <input type="password" placeholder="Password" />
            </div>

            {type === "signup" ? (
                <button>
                    <p>Sign Up</p>
                </button>
            ) : (
                <button>
                    <p>Login</p>
                </button>
            )}

            <div>
                Error message
            </div>

            {type === "signup" ? (
                <Link href="/">
                    <p>Already have an account? Sign Up Here</p>
                </Link>
            ) : (
                <Link href="/signup">
                    <p>Don't have an account? Login Here</p>
                </Link>
            )}
        </div>
    )
}
