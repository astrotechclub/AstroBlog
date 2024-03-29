import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import bellIcon from "../assets/icons/bell-ring.png";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import userIcon from "../assets/icons/personne.png";
import settingsIcon from "../assets/icons/reglage.png";
import disconnectIcon from "../assets/icons/eteindre.png";


function NavBar({ profile, picturesUrl, host }) {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);

    const handleBellClick = () => {
        if (notifications.length > 0) {
            setShowNotification(prev => !prev);
            setShowDropDownMenu(false);
        }
    }

    const notify = () => {
        if (allSeen(notifications)) {
            return <></>;
        } else {
            return <div id="notifications" className="h-[10px] w-[10px] rounded-[10px] bg-light-pink absolute right-0 top-0"></div>;
        }
    }

    const handleLogout = async () => {
        const res = await fetch(`${host}/logout`, { credentials: "include" });
        if (res.status == 401 || res.status == 403) navigate("/login");
        if (res.status == 404) navigate("/E404");
        if (res.status === 200) {
            navigate("/login");
        }
    }

    useEffect(() => {
        const fetchNotifications = (async () => {
            var result = await fetch(`${host}/notification/mine`, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                result = await fetch(`${host}/refresh`, { credentials: "include" });
                if (result.status === 401 || result.status === 403) {
                    navigate("/login");
                } else {
                    result = await fetch(`${host}/notification/mine`, { credentials: "include" });
                    if (result.status !== 200) navigate("/login");
                }
            }
            if (result.status === 200) {
                result.json().then(data => {
                    setNotifications(data);
                });
            } else {
                navigate("/E404");
            }
        });
        fetchNotifications();
    }, []);

    const allSeen = (notifications) => {
        for (let i = 0; i < notifications.length; i++) {
            const element = notifications[i];
            if (!element.seen) return false;
        }
        return true;
    }

    return (
        <div className="flex flex-row items-center justify-between gap-4 py-10 px-5 lg:px-20" >
            <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => { navigate("/home") }}>
                <img src={logo} alt="logo" className="h-12 w-12 -rotate-logo" />
                <span className="logo font-semibold text-sm text-white">Astrotech</span>
            </div>
            <div className="flex items-center gap-8">
                <div className="relative cursor-pointer">
                    <img src={bellIcon} alt="bell" className="h-6 w-6" onClick={handleBellClick} />
                    {notify()}
                    {showNotification && <Notifications notifications={notifications} host={host} />}
                </div>
                <div onClick={() => { setShowDropDownMenu(p => !p); setShowNotification(false); }} className="min-w-[80px] relative">
                    <img src={profile?.img ? picturesUrl + profile.img : ""} alt="profile" className="cursor-pointer rounded-full h-[60px] w-[60px] object-cover" />
                    {
                        showDropDownMenu && <div className="absolute top-[70px] right-[20px] bg-white rounded-md px-4 py-4 z-20 w-[200px]">
                            <div onClick={() => navigate("/profile")} className="cursor-pointer p-2 flex flex-row items-center justify-between gap-4 w-full hover:bg-input-light-grey rounded-md border-b border-border-grey">
                                <span className="font-semibold text-black text-small-subtitle">My profile  </span>
                                <img src={userIcon} alt="user icon" className="h-5 w-5" />
                            </div>
                            <div onClick={() => navigate("/settings")} className="cursor-pointer p-2 flex flex-row items-center justify-between gap-4 w-full hover:bg-input-light-grey rounded-md border-b border-border-grey">
                                <span className="font-semibold text-black text-small-subtitle">Settings</span>
                                <img src={settingsIcon} alt="settings icon" className="h-5 w-5" />
                            </div>
                            <div onClick={handleLogout} className="cursor-pointer p-2 flex flex-row items-center justify-between gap-4 w-full  hover:bg-input-light-grey rounded-md border-b border-border-grey">
                                <span className="font-semibold text-black text-small-subtitle">Disconnect</span>
                                <img src={disconnectIcon} alt="disconnect icon" className="h-5 w-5" />
                            </div>
                        </div>
                    }
                </div>
            </div>

        </div>
    );

}

export default NavBar;