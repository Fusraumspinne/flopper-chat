"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignInForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !email || !password) {
            setError("All fields are required")
            return
        }

        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError("User already exists.");
                return;
            }

            const res = await fetch("api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })

            if (res.ok) {
                const form = e.target
                form.reset()
                router.push("/")
            } else {
                console.log("User registration failed")
            }
        } catch (error) {
            console.log("Error during registration: ", error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={e => setName(e.target.value)} />
                <input type="email" placeholder="E-Mail" onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <button>
                    <p>Sign Up</p>
                </button>

                {error && (
                    <div>
                        {error}
                    </div>
                )}


                <Link href="/">
                    <p>Already have an account? Login Here</p>
                </Link>
            </form>
        </div>
    )
}
