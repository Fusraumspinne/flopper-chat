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

    const [messages, setMessages] = useState([])

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

    const fetchMessages = async () => {
        try {
            const response = await fetch("/api/getMessages", {
                method: "POST",
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data.messages);
            } else {
                console.error("Fehler beim Abrufen der Benutzer:", response.statusText);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Benutzer:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchMessages()
    }, []);

    const allChat = () => {
        router.replace("allChat")
    }

    const settings = () => {
        router.replace("settings")
    }

    const getLastMessage = (email) => {
        let lastMessage = "No Messages";

        for (const message of messages) {
            if ((message.send === email || message.recieve === email) && (message.send === session?.user?.email || message.recieve === session?.user?.email)) {
                if(message.send === session?.user?.email){
                    lastMessage = "You: " + message.message
                }else{
                    lastMessage = message.message; 
                }
            }
        }

        if (lastMessage.length > 30) {
            lastMessage = lastMessage.slice(0, 27) + "..."; 
        }

        return lastMessage;
    };
    

    return (
        <div>
            <div className="overview-small">
                <div className="blur-large">
                    <div className="row mb-3">
                        <div className="col-4 d-flex flex-column">
                            <div className="fs-5 d-flex flex-row">{session?.user?.name}</div>
                            <div className="d-flex flex-row email">{session?.user?.email}</div>
                        </div>

                        <div className="col-8">
                            <div className="d-flex flex-row-reverse">
                                <button className="logout-btn" onClick={() => signOut()}><Logout className="fs-5" /></button>
                                <button className="logout-btn me-2" onClick={settings}><Settings className="fs-5" /></button>
                            </div>

                            <div className="d-flex justify-content-end mt-2">
                                <button onClick={allChat} className="toggle-btn">All Chat</button>
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
                                                <Image className="img ms-3" src={`/Icons/${user.icon}.png`} alt="icon" width={40} height={40} />
                                                <p className="mb-0 ms-2">{user.name}</p>
                                            </div>
                                            <div className="d-flex mt-1 last-message">
                                                <p className="time">{getLastMessage(user.email)}</p>
                                            </div>
                                        </a>
                                    </Link>
                                    <hr className="custom-hr" />
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="overview">
                <div className="blur-large">
                    <div className="row mb-3">
                        <div className="col-6 d-flex flex-column">
                            <div className="fs-5 d-flex flex-row">{session?.user?.name}</div>
                            <div className="d-flex flex-row">{session?.user?.email}</div>
                        </div>

                        <div className="col-6">
                            <div className="d-flex flex-row-reverse mt-2">
                                <button className="logout-btn" onClick={() => signOut()}><Logout className="fs-5" /></button>
                                <button className="logout-btn me-2" onClick={settings}><Settings className="fs-5" /></button>
                                <button onClick={allChat} className="toggle-btn me-2">All Chat</button>
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
                                                <Image className="img ms-3" src={`/Icons/${user.icon}.png`} alt="icon" width={40} height={40} />
                                                <p className="mb-0 ms-2">{user.name}</p>
                                            </div>
                                            <div className="d-flex mt-1 last-message">
                                                <p className="time">{getLastMessage(user.email)}</p>
                                            </div>
                                        </a>
                                    </Link>
                                    <hr className="custom-hr m-0" />
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}
