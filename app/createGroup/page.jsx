"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ImageOutlined, Group, ArrowBack, PersonOutline } from "@mui/icons-material";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

export default function Einstellungen() {
    const { data: session } = useSession();

    const [groupName, setGroupName] = useState("")
    const [members, setMembers] = useState([])
    const [admin, setAdmin] = useState("")
    const [icon, setIcon] = useState("DefaultGroup")

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

    const back = () => {
        router.push("/dashboard")
    }

    useEffect(() => {
        setAdmin(session?.user?.email)
    }, [groupName, members, admin, icon])

    const handleUserClick = (clickedUser) => {
        const updatedUsers = users.map(user => {
            if (user._id === clickedUser._id) {
                return { ...user, selected: !user.selected };
            }
            return user;
        });
        setUsers(updatedUsers);
    
        const selectedEmails = updatedUsers
            .filter(user => user.selected)
            .map(user => user.email); 
    
        setMembers(selectedEmails);
    };

    const createGroup = async () => {
        if (!groupName || !icon || !admin || !members) {
            console.log("All Inputs are requird.")
            return
        }

        try {
            const res = await fetch("/api/createGroup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    groupName,
                    icon,
                    admin,
                    members
                })
            })

            if (res.ok) {
                console.log("Group created.")
            } else {
                console.log("Group creating failed")
            }
        } catch (error) {
            console.log("Error during creating Group: ", error)
        }

        router.push("/groups")
    }

    return (
        <div className="blur-big">
            <div className="row d-flex align-items-center">
                <div className="col-2">
                    <button onClick={back} className="logout-btn me-3 mt-1"><ArrowBack className="fs-2" /></button>
                </div>
                <div className="col-10">
                    <h1 className="fs-5 fw-bold mt-3 title me-5">Create a new Group</h1>
                </div>
            </div>

            <div>
                <div className="input-container d-flex align-items-center justify-content-end">
                    <input className="form-control transparent-input" type="text" placeholder="Group Name" onChange={(e) => setGroupName(e.target.value)} />
                    <Group className="icon" />
                </div>

                <React.Fragment>
                    <div className="d-flex justify-content-between">
                        <div className="ms-2">Members</div>
                        <div className="me-2"><PersonOutline /></div>
                    </div>
                    <hr className="custom-hr m-0" />
                </React.Fragment>

                <div className="click-user-area mt-3">
                    {users.map((user, index) => {
                        if (user.email === session?.user?.email) {
                            return null;
                        }
                        return (
                            <div key={user._id} className="user-link" onClick={() => handleUserClick(user)}>
                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <p className="mb-0 ms-2">{user.name}</p>
                                    {user.selected && <p className="mb-0 me-2">Hinzugefügt</p>}
                                </div>
                                <hr className="custom-hr" />
                            </div>
                        );
                    })}
                </div>

                <button className="btn btn-light mt-4 btn-standart" onClick={createGroup}>Create Group</button>
            </div>
        </div>
    )
}
