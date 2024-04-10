"use client"

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { Send, ArrowBack } from "@mui/icons-material";
import Image from "next/image"
import { useRouter } from "next/navigation";

export default function Chat({ params }) {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);

    const [send, setSend] = useState()
    const [recieve, setRecieve] = useState()
    const [message, setMessage] = useState()
    const [time, setTime] = useState()

    const [messages, setMessages] = useState([])

    const [otherEmail, setOtherEmail] = useState("")

    const router = useRouter()
    const chatEndRef = useRef(null);

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

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, 5000); 
    
        return () => clearInterval(interval);
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

        fetchMessages()
        setMessage()
    }

    const back = () => {
        router.push("/dashboard")
    }

    useEffect(() => {
        scrollToBottom(); 
    }, [messages]);

    const scrollToBottom = () => {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className="blur-chat">
                <div className="row mb-3">
                    <div className="col-2">
                        <button onClick={back} className="logout-btn me-3"><ArrowBack className="fs-2" /></button>
                    </div>
                    <div className="col-10 d-flex flex-column">
                        {users.map((user) => {
                            if (user._id === params.id) {
                                return (
                                    <div key={user._id}>
                                        <div className="fs-3 d-flex align-items-center">
                                            <Image className="img me-2 ms-1" src="/Icons/icon1.png" alt="icon" width={35} height={35} />
                                            {user.name}
                                        </div>
                                    </div>
                                );
                            }
                        })}
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
                                            <div className="d-flex justify-content-start">
                                                {message.message}
                                            </div>
                                            <div className="time d-flex justify-content-end">
                                                {message.time}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center custom-incoming-box">
                                        <Image className="img-small ms-3" src="/Icons/icon1.png" alt="icon" width={30} height={30} />
                                        <div className="px-3">
                                            <div className="incoming-message">
                                                <div className="d-flex justify-content-start">
                                                    {message.message}
                                                </div>
                                                <div className="time d-flex justify-content-end">
                                                    {message.time}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            </div>
                        ))
                    )}
                   <div ref={chatEndRef} />
                </div>

                <div className="text-area mt-2">
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
