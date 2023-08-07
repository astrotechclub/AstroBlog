import React, { useState, useEffect } from "react";
import AnimatedBg from "../components/AnimatedBg";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar"
import SettingsContent from "../components/SettingsContent";
import Footer from "../components/Footer";
import "../styles/pages/settings.css";
import SmoothScroll from "../components/SmoothScroll";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

function Settings() {
    const [profile, setProfile] = useState();
    const [inputs, setInputs] = useState();
    const [errors, setErrors] = useState({});
    const [picture, setPicture] = useState();
    const navigate = new useNavigate();
    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;
    document.title = "Settings";

    useEffect(() => {
        const fetchProfile = (async () => {
            const result = await fetch(`${host}/user/mine`, { credentials: "include" });
            if (result.status == 401 || result.status == 403) navigate("/login");
            if (result.status == 404) navigate("/E404");
            result.json().then(data => {
                setProfile(data);
                setInputs({ "fullname": data.fullname })
            }).catch(e => console.log(e));
        });
        fetchProfile();
    }, []);

    const handleEditProfile = async (e) => {
        e.preventDefault();
        const url = `${host}/user/update`;
        const url2 = `${host}/user/updatePicture`;
        if (inputs) {
            axios.post(url, inputs, {
                withCredentials: true
            }).then(res => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                }
                if (res.status == 401 || res.status == 403) navigate("/login");
                if (res.status == 404) navigate("/E404");
                if (res.status === 200) {
                    console.log("success");
                }
            }).catch(err => { setErrors(err.response.data); console.log(errors); });
        }
        if (picture) {
            axios.post(url2, picture, {
                withCredentials: true,
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }).then(res => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                }
                if (res.status == 401 || res.status == 403) navigate("/login");
                if (res.status == 404) navigate("/E404");

                if (res.status === 200) {
                    navigate("/profile");
                }
            }).catch(err => { setErrors(err.response.data); console.log(errors); });
        }
    }

    return (
        <>
            {profile ? <div className="bg-gradient-to-b from-page-light-dark to-page-dark relative">
                <SmoothScroll />
                <AnimatedBg />
                <div className="relative z-10 min-h-[100vh]">
                    <NavBar profile={profile} picturesUrl={picturesUrl} />
                    <div className="grid grid-cols-4 grid-rows-1 gap-16 mb-16 px-20">
                        <SideBar />
                        <SettingsContent profile={profile} handleEditProfile={handleEditProfile} setInputs={setInputs} inputs={inputs} errors={errors} setPicture={setPicture} picturesUrl={picturesUrl} />
                        <div className="w-full h-full"></div>
                    </div>
                    <Footer />
                </div>
            </div>
                : <LoadingPage />
            }
        </>
    );
}

export default Settings;
