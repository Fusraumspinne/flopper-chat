"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

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
                                        <div className="fs-2 d-flex flex-row">{user.name}</div>
                                    </div>
                                );
                            }
                        })}
                    </div>

                    <div className="col-3">
                        <div className="d-flex flex-row-reverse mt-2">
                            <button className="logout-btn">Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
