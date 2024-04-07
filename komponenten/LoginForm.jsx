"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { EmailOutlined, LockOutlined, } from "@mui/icons-material";

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

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
        <div className="blur">
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
                    <div className="d-flex align-items-center justify-content-end">
                        <input className="form-control transparent-input mt-2 mb-2" type="email" placeholder="E-Mail" onChange={(e) => setEmail(e.target.value)} />
                        <EmailOutlined className="icon"/>
                    </div>

                    <div className="d-flex align-items-center justify-content-end">
                        <input className="form-control transparent-input mt-2 mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <LockOutlined className="icon"/>
                    </div>
                    <button className="btn btn-light mt-4 btn-standart">Login</button>
                </div>


                <Link href="/signup" className="text-decoration-none">
                    <p className="text-light mt-2">Don't have an account? Sign Up Here</p>
                </Link>
            </form>
        </div>
    )
}
