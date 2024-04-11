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
    const router = useRouter()

    const back = () => {
        router.push("/dashboard")
    }

    const createGroup = () => {
        router.push("/createGroup")
    }

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
                                        <p className="time">Marvin: Letzte Nachricht</p>
                                    </div>
                                </a>
                            </Link>
                            <hr className="custom-hr m-0" />
                        </React.Fragment>
                    </div>

                    <button className="btn btn-light mt-4 btn-standart" onClick={createGroup}>Create new Group <AddCircleOutlineOutlined/></button>
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
                                        <p className="time">Marvin: Letzte Nachricht</p>
                                    </div>
                                </a>
                            </Link>
                            <hr className="custom-hr m-0" />
                        </React.Fragment>
                    </div>

                    <button className="btn btn-light mt-4 btn-standart" onClick={createGroup}>Create new Group <AddCircleOutlineOutlined/></button>
                </div>
            </div>
        </div>
    )
}
