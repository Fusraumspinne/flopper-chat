"use client"

import { signOut } from "next-auth/react"
import {useSession} from "next-auth/react"

export default function Overview(){
    const {data: session} = useSession()

    return(
        <div>
            <div>
                Name: <span>{session?.user?.name}</span>
            </div>

            <div>
                Email: <span>{session?.user?.email}</span>
            </div>

            <button onClick={() => signOut()}>
                Logout
            </button>
        </div>
    )
}