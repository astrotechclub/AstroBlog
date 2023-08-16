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
import Followers from "../components/followers";
import axios from "axios";



function Community() {
    const [articles, setArticles] = useState();
    const [profile, setProfile] = useState();
    const [community, setCommunity] = useState();
    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;
    const maxArticlesPerPage = 3;
    const navigate = useNavigate();
    const community_id = useParams().id;
    if (isNaN(community_id)) navigate("/E404");
    const [screenSize, setScreenSize] = useState('');

    const handleResize = () => {
        const width = window.innerWidth;
        if (width >= 1024) {
            setScreenSize('large');
        } else if (width >= 768) {
            setScreenSize('medium');
        } else {
            setScreenSize('small');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
    }, []);

    useEffect(() => {
        const fetchArticles = async () => {
            var result = await fetch(`${host}/articles/community/${community_id}/-${maxArticlesPerPage}`, { credentials: "include" });
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
            const result = await fetch(`${host}/communities/${community_id}`, { credentials: "include" });
            if (result.status == 401 || result.status == 403) navigate("/login");
            if (result.status == 404) navigate("/E404");
            result.json().then(data => {
                setCommunity(data);
                document.title = community?.community_name ? community.community_name : "Astroblog";
            });
        });
        fetchProfile();
    }, []);

    const handleUnfollow = (id) => {
        const url = `${host}/communities/unfollow`;
        axios.post(url, { community: id }, { withCredentials: true }).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
            }
            if (res.status === 200) {
                console.log(res);
            }
        }).catch(err => { console.log(err.response.data); });

    }

    const handleFollow = (id) => {
        const url = `${host}/communities/follow`;
        axios.post(url, { community: id }, { withCredentials: true }).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
            }
            if (res.status === 200) {
                console.log(res);
            }
        }).catch(err => { console.log(err.response.data); });
    }

    const handleClick = () => {
        if (community.isFollower) {
            handleUnfollow(community_id);
        }
        if (community.isFollower == false) {
            handleFollow(community_id);
        }
    }

    return (
        <>
            {articles && community && profile?.fullname ?
                <div id="feed" className="bg-gradient-to-b from-page-light-dark to-page-dark relative">
                    <AnimatedBg />
                    <div className="relative z-10 min-h-[100vh]">
                        <NavBar profile={profile} picturesUrl={picturesUrl} host={host} />
                        <SmoothScroll />
                        <div className="px-8 md:px-14 lg:px-40 flex  flex-row items-start justify-between gap-4">
                            <div className="flex flex-row gap-4 items-center justify-center lg:justify-start mt-4 mb-24">
                                <img src={picturesUrl + community.profile_img} alt="profile" className="rounded-full h-[120px] w-[120px] md:h-[150px] md:w-[150px] object-cover p-0 m-0" />
                                <div className="flex flex-col items-start justify-end">
                                    <span className="text-xl lg:text-big-title text-white font-bold">{community.community_name}</span>
                                    <span className=" text-subtitle lg:text-sm font-semibold mt-2">description</span>
                                    <span className="text-white text-sm w-full mb-2 max-w-[300px]">{community.community_description}</span>
                                    <span className="text-small-subtitle text-description font-semibold text-center w-full">{community.nb_likes} likes, {community.nb_followers} followers</span>
                                </div>
                            </div>
                            {community.id != 1 && <button className="block border-2 rounded-md border-feed-border text-description text-md font-medium px-4 py-2" onClick={handleClick}>{community.isFollower ? "unfollow" : "follow"}</button>}
                        </div>
                        {screenSize !== "large" && <div className="px-8 md:px-16 lg:px-20 mb-10 h-full w-full relative">
                            <Followers community={community_id} host={host} picturesUrl={picturesUrl} />
                        </div>}
                        <div className="px-8 md:px-16 lg:px-20 grid grid-cols-8 grid-rows-1 gap-8 mt-4 mb-8">
                            <div></div>
                            <div className="col-span-8 md:col-span-5">
                                <SearchBar />
                            </div>
                            <div className="md:col-span-2"></div>
                        </div>
                        <div className="px-8 md:px-20 flex flex-col lg:grid lg:grid-cols-8 lg:grid-rows-1 gap-8 mt-4 mb-16">
                            <div className="hidden lg:block"></div>
                            <Feed articles={articles} maxArticlesPerPage={maxArticlesPerPage} setArticles={setArticles} isProfile={false} picturesUrl={picturesUrl} host={host} isFollower={community.isFollower} community={community_id} />
                            {screenSize === "large" && <div className=" lg:col-span-2 h-full w-full relative">
                                <Followers community={community_id} host={host} picturesUrl={picturesUrl} />
                            </div>}
                        </div>
                        <Footer profile={profile} />
                    </div>
                </div > : <LoadingPage />
            }
        </>

    );
}

export default Community