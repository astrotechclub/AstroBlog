import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AnimatedBg from "../components/AnimatedBg";
import filterIcon from "../assets/icons/filter.png";
import Contacts from "../components/Contacts";
import Feed from "../components/Feed";
import Footer from "../components/Footer";
import "../styles/pages/feed.css";
import { useNavigate, useParams } from "react-router-dom";
import SmoothScroll from "../components/SmoothScroll";
import SearchBar from "../components/SearchBar";
import LoadingPage from "../components/LoadingPage";



function Profile() {
    const [articles, setArticles] = useState([]);
    const [profile, setProfile] = useState();
    const [userProfile, setUserProfile] = useState();
    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;
    const maxArticlesPerPage = 3;
    const navigate = useNavigate();
    const user_id = useParams().id;
    if (isNaN(user_id)) navigate("/E404");


    useEffect(() => {
        const fetchArticles = async () => {
            var result = await fetch(`${host}/articles/${user_id}/-${maxArticlesPerPage}`, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                const data = await fetch(`${host}/refresh`, { credentials: "include" });
                if (data.status === 401 || data.status === 403) {
                    navigate("/login");
                } else {
                    navigate("/home");
                }
            } else {
                if (result.status === 200) {
                    result.json().then(json => {
                        setArticles(json);
                    });
                } else {
                    navigate("/E404");
                }
            }
        };

        fetchArticles();

    }, []);

    useEffect(() => {
        const fetchProfile = (async () => {
            const result = await fetch(`${host}/user/mine`, { credentials: "include" });
            if (result.status == 401 || result.status == 403) navigate("/login");
            if (result.status == 404) navigate("/E404");
            result.json().then(data => {
                setProfile(data);
            });
        });
        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchProfile = (async () => {
            const result = await fetch(`${host}/user/${user_id}`, { credentials: "include" });
            if (result.status == 401 || result.status == 403) navigate("/login");
            if (result.status == 404) navigate("/E404");
            result.json().then(data => {
                setUserProfile(data);
                document.title = userProfile?.fullname ? userProfile.fullname : "Astroblog";
            });
        });
        fetchProfile();
    }, []);

    return (
        <>
            {articles && userProfile?.fullname && profile?.fullname ?
                <div id="feed" className="bg-gradient-to-b from-page-light-dark to-page-dark relative">
                    <AnimatedBg />
                    <div className="relative z-10 min-h-[100vh]">
                        <NavBar profile={profile} picturesUrl={picturesUrl} host={host} />
                        <SmoothScroll />
                        <div className="px-16 xl:px-40 flex flex-col lg:flex-row gap-4 items-center justify-start mt-4 mb-24">
                            <img src={picturesUrl + userProfile.img} alt="profile" className="rounded-full h-[150px] w-[150px] object-cover p-0 m-0" />
                            <div className="flex flex-col items-start justify-end">
                                <span className="text-big-title text-white font-bold">{userProfile.fullname}</span>
                                <span className="text-subtitle text-sm">{userProfile.email}</span>
                                <span className="text-subtitle text-sm font-semibold mt-2">bio</span>
                                <span className="text-white text-sm w-full mb-2 max-w-[300px]">{userProfile.bio}</span>
                                <span className="text-small-subtitle text-description font-semibold text-center w-full">{userProfile.likes} likes, {userProfile.publications} publications</span>
                            </div>
                        </div>
                        <div className="px-8 md:px-16 lg:px-20 grid grid-cols-8 grid-rows-1 gap-8 mt-4 mb-8">
                            <div className="hidden md:col-span-1 md:block"></div>
                            <div className="col-span-8 md:col-span-5">
                                <SearchBar />
                            </div>
                            <div className="hidden md:col-span-2 md:block"></div>
                        </div>
                        <div className="px-8 md:px-20 flex flex-col lg:grid lg:grid-cols-8 lg:grid-rows-1 gap-8 mt-4 mb-16">
                            <div className="hidden lg:block"></div>
                            <Feed articles={articles} maxArticlesPerPage={maxArticlesPerPage} setArticles={setArticles} isProfile={true} picturesUrl={picturesUrl} host={host} />
                            <div></div>
                        </div>
                        <Footer profile={profile} />
                    </div>
                </div > : <LoadingPage />
            }
        </>

    );
}

export default Profile