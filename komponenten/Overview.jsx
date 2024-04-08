"use client"

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Logout, Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Overview() {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    const router = useRouter()

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/getUsers", {
                method: "POST",
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
            } else {
                console.error("Fehler beim Abrufen der Benutzer:", response.statusText);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Benutzer:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const allChat = () => {
        router.replace("allChat")
    }

    return (
        <div className="blur-large">
            <div className="row mb-3">
                <div className="col-7 d-flex flex-column">
                    <div className="fs-4 d-flex flex-row">{session?.user?.name}</div>
                    <div className="d-flex flex-row">{session?.user?.email}</div>
                </div>

                <div className="col-5">
                    <div className="d-flex flex-row-reverse mt-2">
                        <button className="logout-btn" onClick={() => signOut()}><Logout className="fs-2" /></button>
                        <button className="logout-btn me-3"><Settings className="fs-2" /></button>
                        <button onClick={allChat} className="toggle-btn me-3">All Chat</button>
                    </div>
                </div>
            </div>

            <div className="user-area">
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
        </div>
    )
}
