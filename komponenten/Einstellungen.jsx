"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ImageOutlined, PersonOutline, ArrowBack } from "@mui/icons-material";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { fetchData } from "next-auth/client/_utils";
import Image from "next/image";

export default function Einstellungen() {
    const { data: session } = useSession();
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    const [icon, setIcon] = useState("Default")

    const router = useRouter()

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/getUsers", {
                method: "POST",
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
                setIcon(data.icon)
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

    useEffect(() => {
        displayData();
    }, [session, users]);

    const displayData = async () => {
        for (const user of users) {
            if (user.email === session?.user?.email) {
                setName(user.name);
                setIcon(user.icon);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/updateUser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: session.user.email,
                    name: name,
                    icon: icon
                }),
            });

            if (response.ok) {
                console.log("Benutzername erfolgreich aktualisiert");
            } else {
                console.error("Fehler beim Aktualisieren des Benutzernamens:", response.statusText);
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Benutzernamens:", error);
        }

        fetchUsers()
        displayData();
    };

    const back = () => {
        router.push("/dashboard")
    }

    return (
        <div className="blur-big">
            <div className="row d-flex align-items-center">
                <div className="col-2">
                    <button onClick={back} className="logout-btn me-3 mt-1"><ArrowBack className="fs-2" /></button>
                </div>
                <div className="col-10">
                    <h1 className="mt-3 title me-5">Settings</h1>
                </div>
            </div>

            <div>
                <div className="input-container d-flex align-items-center justify-content-end">
                    <input className="form-control transparent-input" type="text" placeholder="Username" value={name} onChange={e => setName(e.target.value)} />
                    <PersonOutline className="icon" />
                </div>

                <div className="input-container d-flex align-items-center justify-content-end">
                    <input className="form-control transparent-input" type="text" placeholder="Icon" readOnly value={icon} />
                    <ImageOutlined className="icon" />
                </div>

                <div>
                    <div className="row mx-2 mt-2">
                        <div className="col-2">
                            <button onClick={() => setIcon("Default")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Default.png')" }}></button>
                        </div>
                        <div className="col-2">
                            <button onClick={() => setIcon("Dino")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Dino.png')" }}></button>
                        </div>
                        <div className="col-2">
                            <button onClick={() => setIcon("Alien")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Alien.png')" }}></button>
                        </div>
                        <div className="col-2">
                            <button onClick={() => setIcon("Geheimagent")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Geheimagent.png')" }}></button>
                        </div>
                        <div className="col-2">
                            <button onClick={() => setIcon("Kackehaufen")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Kackehaufen.png')" }}></button>
                        </div>
                        <div className="col-2">
                            <button onClick={() => setIcon("Spaghettimonster")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Spaghettimonster.png')" }}></button>
                        </div>
                    </div>
                    <div className="row mx-2 mt-2">
                        <div className="col-2">
                            <button onClick={() => setIcon("Admin")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Admin.png')" }}></button>
                        </div>
                        <div className="col-2">
                            <button onClick={() => setIcon("Affe")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Affe.png')" }}></button>
                        </div>
                        <div className="col-2">
                            <button onClick={() => setIcon("Hantel")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Hantel.png')" }}></button>
                        </div>
                        <div className="col-2">
                            <button onClick={() => setIcon("Höhere Macht")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Höhere Macht.png')" }}></button>
                        </div>
                        <div className="col-2">
                            <button onClick={() => setIcon("Nielpferd")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Nielpferd.png')" }}></button>
                        </div>
                        <div className="col-2">
                            <button onClick={() => setIcon("Programmierer")} className="icon-btn img-btn me-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/Icons/Programmierer.png')" }}></button>
                        </div>
                    </div>
                </div>

                <button className="btn btn-light mt-4 btn-standart" onClick={handleUpdate}>Aktualisieren</button>
            </div>
        </div>
    )
}
