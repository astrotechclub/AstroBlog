import React from "react";
import FeedNavBar from "../components/FeedNavBar";
import AnimatedBg from "../components/AnimatedBg";
import TopArticles from "../components/TopArticles";
import Banners from "../components/Banners";
import Contacts from "../components/Contacts";
import Feed from "../components/Feed";
import Footer from "../components/Footer";
import "../styles/pages/feed.css";

class Home extends React.Component {
    render() {
        return (
            <div id="feed" className="bg-gradient-to-b from-page-light-dark to-page-dark relative">
                <AnimatedBg />
                <div className="relative z-10">
                    <FeedNavBar />
                    <TopArticles />
                    <div className="px-20 grid grid-cols-8 grid-rows-1 gap-8 mt-4 mb-16">
                        <Banners />
                        <Feed />
                        <div className=" col-span-2 h-full w-full relative">
                            <Contacts />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Home;
