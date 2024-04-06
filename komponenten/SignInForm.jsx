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
        <div className="blur-big">
            <form onSubmit={handleSubmit}>
                <h1 className="mt-3">Login</h1>

                {error ? (
                    <div className="error mt-4">
                        {error}
                    </div>
                ) : (
                    <div className="error-placeholder mt-4">
                        Schere
                    </div>
                )}

                <div>
                    <input className="form-control transparent-input mt-4 mb-3" type="text" placeholder="Username" onChange={e => setName(e.target.value)} />
                    <input className="form-control transparent-input mt-4 mb-3" type="email" placeholder="E-Mail" onChange={(e) => setEmail(e.target.value)} />
                    <input className="form-control transparent-input mb-3" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn btn-light mt-4">Sign Up</button>
                </div>


                <Link href="/" className="text-decoration-none">
                    <p className="text-light mt-2">Already have an account? Login Here</p>
                </Link>
            </form>
        </div>
    )
}
