"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            })

            if (res.error) {
                setError("Invalid Data")
                return
            }

            router.replace("dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" placeholder="E-Mail" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button>
                    <p>Login</p>
                </button>

                {error && (
                    <div>
                        {error}
                    </div>
                )}

                <Link href="/signup">
                    <p>Don't have an account? Sign Up Here</p>
                </Link>
            </form>
        </div>
    )
}
