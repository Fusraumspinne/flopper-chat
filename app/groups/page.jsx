"use client"

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Logout, Settings, ArrowBack, AddCircleOutlineOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Groups() {
    const { data: session } = useSession();
    const router = useRouter()
    const [messages, setMessages] = useState([])
    const [allMessages, setAllMessages] = useState([])
    const [filteredGroups, setFilteredGroups] = useState([])

    const [groups, setGroups] = useState([])

    const fetchGroups = async () => {
        try {
            const response = await fetch("/api/getGroups", {
                method: "POST",
            });
            if (response.ok) {
                const data = await response.json();
                setGroups(data.groups);
            } else {
                console.error("Fehler beim Abrufen der Gruppen:", response.statusText);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Gruppen:", error);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch("/api/getGroupMessages", {
                method: "POST",
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data.groupMessages);
            } else {
                console.error("Fehler beim Abrufen der Messages:", response.statusText);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Messages:", error);
        }
    };

    const fetchAllMessages = async () => {
        try {
            const response = await fetch("/api/getAllMessages", {
                method: "POST",
            });
            if (response.ok) {
                const data = await response.json();
                setAllMessages(data.allMessages);
            } else {
                console.error("Fehler beim Abrufen der Messages:", response.statusText);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Messages:", error);
        }
    };

    useEffect(() => {
        fetchAllMessages()
        fetchMessages()
        fetchGroups()
    }, [])

    useEffect(() => {
        filterGroups()
    }, [groups])
    
    const filterGroups = () => {
        if (session) {
            const filteredGroups = groups.filter(group => {
                const isAdmin = group.admin === session.user.email;
                const isMember = group.members.includes(session.user.email);
                return isAdmin || isMember;
            });
            setFilteredGroups(filteredGroups);
        }
    };

    const back = () => {
        router.push("/dashboard")
    }

    const createGroup = () => {
        router.push("/createGroup")
    }

    const getLastMessage = (id, allMessagesBool) => {
        let lastMessage = "No Messages";

        if (!allMessagesBool) {
            for (const message of messages) {
                if (message.groupId === id) {
                    if (message.send === session?.user?.email) {
                        lastMessage = "You: " + message.message
                    } else {
                        lastMessage = message.name + ": " + message.message;
                    }
                }
            }
        } else {
            for (const allMessage of allMessages) {
                if (allMessage.send === session?.user?.email) {
                    lastMessage = "You: " + allMessage.message
                } else {
                    lastMessage = allMessage.name + ": " + allMessage.message;
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
                            <div className="fs-3 d-flex flex-row">Groups</div>
                        </div>

                        <div className="col-8">
                            <div className="d-flex flex-row-reverse">
                                <button onClick={back} className="logout-btn me-3"><ArrowBack className="fs-2" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="groups-area">
                        <React.Fragment>
                            <Link href={`/allChat/`} legacyBehavior>
                                <a className="user-link">
                                    <div className="d-flex align-items-center mt-3">
                                        <Image className="img ms-3" src="/Icons/DefaultGroup.png" alt="icon" width={40} height={40} />
                                        <p className="mb-0 ms-2">All Chat</p>
                                    </div>
                                    <div className="d-flex mt-1 last-message">
                                        <p className="time">{getLastMessage(0,true)}</p>
                                    </div>
                                </a>
                            </Link>
                            <hr className="custom-hr m-0" />
                        </React.Fragment>

                        {filteredGroups.map((group) => (
                            <React.Fragment key={group._id}>
                                <Link href={`/groupChat/${group._id}`} legacyBehavior>
                                    <a className="user-link">
                                        <div className="d-flex align-items-center mt-3">
                                            <Image className="img ms-3" src={`/Icons/${group.icon}.png`} alt="icon" width={40} height={40} />
                                            <p className="mb-0 ms-2">{group.groupName}</p>
                                        </div>
                                        <div className="d-flex mt-1 last-message">
                                            <p className="time">{getLastMessage(group._id, false)}</p>
                                        </div>
                                    </a>
                                </Link>
                                <hr className="custom-hr m-0" />
                            </React.Fragment>
                        ))}
                    </div>

                    <button className="btn btn-light mt-4 btn-standart" onClick={createGroup}>Create new Group <AddCircleOutlineOutlined /></button>
                </div>
            </div>

            <div className="overview">
                <div className="blur-large">
                    <div className="row mb-3">
                        <div className="col-6 d-flex flex-column">
                            <div className="fs-2 d-flex flex-row">Groups</div>
                        </div>

                        <div className="col-6">
                            <div className="d-flex flex-row-reverse mt-2">
                                <button onClick={back} className="logout-btn me-3"><ArrowBack className="fs-2" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="groups-area">
                        <React.Fragment>
                            <Link href={`/allChat/`} legacyBehavior>
                                <a className="user-link">
                                    <div className="d-flex align-items-center mt-3">
                                        <Image className="img ms-3" src="/Icons/DefaultGroup.png" alt="icon" width={40} height={40} />
                                        <p className="mb-0 ms-2">All Chat</p>
                                    </div>
                                    <div className="d-flex mt-1 last-message">
                                        <p className="time">{getLastMessage(0 ,true)}</p>
                                    </div>
                                </a>
                            </Link>
                            <hr className="custom-hr m-0" />
                        </React.Fragment>

                        {filteredGroups.map((group) => (
                            <React.Fragment key={group._id}>
                                <Link href={`/groupChat/${group._id}`} legacyBehavior>
                                    <a className="user-link">
                                        <div className="d-flex align-items-center mt-3">
                                            <Image className="img ms-3" src={`/Icons/${group.icon}.png`} alt="icon" width={40} height={40} />
                                            <p className="mb-0 ms-2">{group.groupName}</p>
                                        </div>
                                        <div className="d-flex mt-1 last-message">
                                            <p className="time">{getLastMessage(group._id, false)}</p>
                                        </div>
                                    </a>
                                </Link>
                                <hr className="custom-hr m-0" />
                            </React.Fragment>
                        ))}
                    </div>

                    <button className="btn btn-light mt-4 btn-standart" onClick={createGroup}>Create new Group <AddCircleOutlineOutlined /></button>
                </div>
            </div>
        </div>
    )
}
