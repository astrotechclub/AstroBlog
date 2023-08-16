import AnimatedBg from "../components/AnimatedBg";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import feather from "../assets/icons/feather.png";
import WriteArticleForm from "../components/WriteArticleForm";
import { useState, useEffect } from "react";
import SmoothScroll from "../components/SmoothScroll";
import LoadingPage from "../components/LoadingPage";
import { useNavigate, useParams } from "react-router-dom";

function WriteArticle() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState();
    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;
    const community = useParams().id;

    useEffect(() => {
        const fetchProfile = (async () => {
            const result = await fetch(`${host}/user/mine`, { credentials: "include" });
            if (result.status == 401 || result.status == 403) navigate("/login");
            if (result.status == 404) navigate("/E404");
            result.json().then(data => {
                setProfile(data); document.title = "New article ✨";
                ;
            });
        });
        fetchProfile();
    }, []);

    return (
        <>
            {profile?.fullname ? <div id="feed" className="bg-gradient-to-b from-page-light-dark to-page-dark relative">
                < AnimatedBg />
                <div className="relative z-10 min-h-[100vh]">
                    <NavBar profile={profile} picturesUrl={picturesUrl} host={host} />
                    <SmoothScroll />
                    <div className="px-8 md:px-14 lg:px-20 py-8">
                        <div className="mb-8 pb-4 border-b-2 border-feed-border flex flex-row justify-start items-center gap-4">
                            <img src={feather} alt="top articles" className="h-5 w-5" />
                            <h2 className="font-semibold text-big-title text-white">New Article</h2>
                        </div>
                        <WriteArticleForm host={host} community={community} />
                    </div>
                    <Footer profile={profile} />
                </div>
            </div > : <LoadingPage />
            }
        </>
    );
}

export default WriteArticle;