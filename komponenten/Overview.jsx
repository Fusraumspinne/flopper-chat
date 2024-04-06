"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function Overview() {
    const { data: session } = useSession()

    return (
        <div className="blur-large">
            <div className="row">
                <div className="col-8 d-flex flex-column">
                    <div className="fs-2 d-flex flex-row">{session?.user?.name}</div>
                    <div className="d-flex flex-row">{session?.user?.email}</div>
                </div>

                <div className="col-4">
                    <div className="d-flex flex-row-reverse mt-2">
                        <button className="logout-btn" onClick={() => signOut()}>Logout</button>
                    </div>
                </div>

            </div>
        </div>
    )
}