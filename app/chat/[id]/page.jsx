"use client"

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import React from "react";
import { Send } from "@mui/icons-material";
import Image from "next/image"

export default function Chat({ params }) {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);

    const [send, setSend] = useState()
    const [recieve, setRecieve] = useState()
    const [message, setMessage] = useState()
    const [time, setTime] = useState()

    const [messages, setMessages] = useState([])

    const [otherEmail, setOtherEmail] = useState("")

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("/api/getUsers");
                const data = await res.json();
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        fetchUsers();

        async function fetchMessages() {
            const res = await fetch("/api/getMessages")
            const data = await res.json()
            setMessages(data.messages)
            console.log(messages)
        }

        fetchMessages()
    }, []);

    useEffect(() => {
        const currentTimeInGermany = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
        setTime(currentTimeInGermany);

        setSend(session?.user?.email)

        const { id } = params;
        const email = users.find(user => user._id === id)?.email;
        setRecieve(email);
    }, [params, send, recieve, message, time]);

    useEffect(() => {
        users.forEach(user => {
            if (user._id === params.id) {
                setOtherEmail(user.email);
                console.log(otherEmail)
            }
        });
    }, [params, users, otherEmail])

    useEffect(() => {
        const filteredMessages = messages.filter(msg =>
            (msg.send === session?.user?.email && msg.recieve === otherEmail) ||
            (msg.recieve === session?.user?.email && msg.send === otherEmail)
        );

        setFilteredMessages(filteredMessages);
    }, [messages, session, otherEmail]);

    const [filteredMessages, setFilteredMessages] = useState([]);

    const handleSubmit = async (e) => {
        if (!send || !recieve || !message || !time) {
            console.log("All Inputs are requird.")
            return
        }

        try {
            const res = await fetch("/api/sendMessage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    send,
                    recieve,
                    message,
                    time
                })
            })

            if (res.ok) {
                console.log("Message Send.")
            } else {
                console.log("Send Message failed")
            }
        } catch (error) {
            console.log("Error during sending Message: ", error)
        }

        async function fetchMessages() {
            const res = await fetch("/api/getMessages")
            const data = await res.json()
            setMessages(data.messages)
            console.log(messages)
        }

        fetchMessages()

        setMessage()
    }

    return (
        <div>
            <div className="blur-chat">
                <div className="row mb-3">
                    <div className="col-9 d-flex flex-column">
                        {users.map((user) => {
                            if (user._id === params.id) {
                                return (
                                    <div key={user._id}>
                                        <div className="fs-2 d-flex align-items-center">
                                            <Image className="img me-3" src="/Icons/icon1.png" alt="icon" width={40} height={40} />
                                            {user.name}
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>

                    <div className="col-3">

                    </div>
                </div>

                <div className="chat-area">
                    {filteredMessages === "" ? (
                        <div>No Messages</div>
                    ) : (
                        filteredMessages.map((message, index) => (
                            <div key={message.id || index}>
                                {message.send === session?.user?.email ? (
                                    <div className="row px-3">
                                        <div className="col-4">

                                        </div>
                                        <div className="outgoing-message col-8">
                                            <div className="d-flex">
                                                <p>{message.message}</p>
                                            </div>
                                            <div className="time d-flex justify-content-end">
                                                {message.time}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center custom-incoming-box">
                                        <Image className="img-small ms-3" src="/Icons/icon1.png" alt="icon" width={40} height={40} />
                                        <div className="px-3">
                                            <div className="incoming-message">
                                                <div className="d-flex">
                                                    <p>{message.message}</p>
                                                </div>
                                                <div className="time d-flex justify-content-end">
                                                    {message.time}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="text-area mt-3">
                    <React.Fragment>
                        <hr className="custom-hr" />
                    </React.Fragment>
                    <div className="d-flex">
                        <input value={message || ''} className="chat-input form-control col-6" type="text" placeholder="Enter a message..." onChange={(e) => setMessage(e.target.value)} />
                        <button onClick={handleSubmit} className="chat-btn btn btn-light col-6"><Send /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
