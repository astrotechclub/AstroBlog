import React from "react";
import AnimatedBg from "../components/AnimatedBg";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar"
import SettingsContent from "../components/SettingsContent";
import Footer from "../components/Footer";
import "../styles/pages/settings.css";

class Settings extends React.Component {
    render() {
        return (
            <div className="bg-gradient-to-b from-page-light-dark to-page-dark relative">
                <AnimatedBg />
                <div className="relative z-10">
                    <NavBar />
                    <div className="grid grid-cols-4 grid-rows-1 gap-16 mb-16 px-20">
                        <SideBar />
                        <SettingsContent />
                        <div className="w-full h-full"></div>
                    </div>
                    <Footer />
                </div>

            </div>
        );
    }
}

export default Settings;
