"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import React from "react";
import { Send } from "@mui/icons-material";
import Image from "next/image"


export default function Chat({ params }) {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);

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
    }, []);

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
                    
                </div>

                <div className="text-area mt-3">
                    <React.Fragment>
                        <hr className="custom-hr"/>
                    </React.Fragment>
                    <div className="d-flex">
                        <input className="chat-input form-control col-6" type="text" placeholder="Enter a message..."/>
                        <button className="chat-btn btn btn-light col-6"><Send/></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
