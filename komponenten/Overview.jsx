"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import Image from "next/image"
import React from "react"
import Link from "next/link"
import { Logout } from "@mui/icons-material";

export default function Overview() {
    const { data: session } = useSession()

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch("/api/getUsers")
            const data = await res.json()
            setUsers(data.users)
        }
        fetchUsers()
    }, [])

    const test = async () => {
        async function fetchUsers() {
            const res = await fetch("/api/getUsers")
            const data = await res.json()
            setUsers(data.users)
        }
        fetchUsers()
    }

    return (
        <div className="blur-large">
            <div className="row mb-3">
                <div className="col-8 d-flex flex-column">
                    <div className="fs-2 d-flex flex-row">{session?.user?.name}</div>
                    <div className="d-flex flex-row">{session?.user?.email}</div>
                </div>

                <div className="col-4">
                    <div className="d-flex flex-row-reverse mt-2">
                        <button className="logout-btn" onClick={() => signOut()}><Logout className="fs-2"/></button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-7">
                    {users.map((user, index) => {
                        if (user.email === session?.user?.email) {
                            return null;
                        }
                        return (
                            <React.Fragment key={user._id}>
                                <Link href={`/chat/${user._id}`} legacyBehavior>
                                    <a className="user-link">
                                        <div className="d-flex align-items-center mt-3">
                                            <Image className="img ms-3" src="/Icons/icon1.png" alt="icon" width={40} height={40} />
                                            <p className="mb-0 ms-2">{user.name}</p>
                                        </div>
                                    </a>
                                </Link>
                                <hr className="custom-hr" />
                            </React.Fragment>
                        );
                    })}
                </div>

                <div className="col-5">
                    
                </div>
            </div>
        </div>
    )
}
