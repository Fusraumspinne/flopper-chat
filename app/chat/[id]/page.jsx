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
        const currentTimeInGermany = new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" });
        setTime(currentTimeInGermany);

        setSend(session?.user?.email)

        const { id } = params;
        const email = users.find(user => user._id === id)?.email;
        setRecieve(email);

    }, [params, send, recieve, message, time]);

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
                    {messages === "" ? (
                        <div>No Messages</div>
                    ) : (
                        messages.map((message) => (
                            <div key={message.id}>
                                <div>
                                    <p>{message.send}</p>
                                    <p>{message.receive}</p>
                                </div>
                                <div>
                                    <p>{message.message}</p>
                                    <p>{message.time}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="text-area mt-3">
                    <React.Fragment>
                        <hr className="custom-hr" />
                    </React.Fragment>
                    <div className="d-flex">
                        <input className="chat-input form-control col-6" type="text" placeholder="Enter a message..." onChange={(e) => setMessage(e.target.value)} />
                        <button onClick={handleSubmit} className="chat-btn btn btn-light col-6"><Send /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
