import React from "react";
import ArticleCard from "./ArticleCard";
import article from "../assets/icons/article.png";
import feather from "../assets/icons/feather.png";
import articleImg from "../assets/images/post4.jpg";
import userProfileImg from "../assets/images/person.jpg";
import communityProfileImg from "../assets/images/community.jpg";
import loadMoreImg from "../assets/icons/reload.png";

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Articles: [
                {
                    img: articleImg,
                    date: "March 14, 2023",
                    time: "20:45",
                    title: "Put your title here, maybe this title is bigger than the size gi..",
                    description: "Nullam hendrerit sodales tristique. Etiam aliquam rutrum lacus gravida varius. Curabitur ac sapien a risus iaculis tristique a aliquam ligula....",
                    fields: ["computer", "arduino", "iot"],
                    comments: "130",
                    reviews: "400",
                    user_name: "Touahria Yacine",
                    user_profile: userProfileImg,
                    user_stats: {
                        publications: "23",
                        likes: "480"
                    },
                    community_name: "IoT community",
                    community_profile: communityProfileImg,
                },
                {
                    img: articleImg,
                    date: "March 14, 2023",
                    time: "20:45",
                    title: "Put your title here, maybe this title is bigger than the size gi..",
                    description: "Nullam hendrerit sodales tristique. Etiam aliquam rutrum lacus gravida varius. Curabitur ac sapien a risus iaculis tristique a aliquam ligula....",
                    fields: ["computer", "arduino", "iot"],
                    comments: "130",
                    reviews: "400",
                    user_name: "Touahria Yacine",
                    user_profile: userProfileImg,
                    user_stats: {
                        publications: "23",
                        likes: "480"
                    },
                    community_name: "IoT community",
                    community_profile: communityProfileImg,
                },
                {
                    img: articleImg,
                    date: "March 14, 2023",
                    time: "20:45",
                    title: "Put your title here, maybe this title is bigger than the size gi..",
                    description: "Nullam hendrerit sodales tristique. Etiam aliquam rutrum lacus gravida varius. Curabitur ac sapien a risus iaculis tristique a aliquam ligula....",
                    fields: ["computer", "arduino", "iot"],
                    comments: "130",
                    reviews: "400",
                    user_name: "Touahria Yacine",
                    user_profile: userProfileImg,
                    user_stats: {
                        publications: "23",
                        likes: "480"
                    },
                    community_name: "IoT community",
                    community_profile: communityProfileImg,
                },
                {
                    img: articleImg,
                    date: "March 14, 2023",
                    time: "20:45",
                    title: "Put your title here, maybe this title is bigger than the size gi..",
                    description: "Nullam hendrerit sodales tristique. Etiam aliquam rutrum lacus gravida varius. Curabitur ac sapien a risus iaculis tristique a aliquam ligula....",
                    fields: ["computer", "arduino", "iot"],
                    comments: "130",
                    reviews: "400",
                    user_name: "Touahria Yacine",
                    user_profile: userProfileImg,
                    user_stats: {
                        publications: "23",
                        likes: "480"
                    },
                    community_name: "IoT community",
                    community_profile: communityProfileImg,
                },
                {
                    img: articleImg,
                    date: "March 14, 2023",
                    time: "20:45",
                    title: "Put your title here, maybe this title is bigger than the size gi..",
                    description: "Nullam hendrerit sodales tristique. Etiam aliquam rutrum lacus gravida varius. Curabitur ac sapien a risus iaculis tristique a aliquam ligula....",
                    fields: ["computer", "arduino", "iot"],
                    comments: "130",
                    reviews: "400",
                    user_name: "Touahria Yacine",
                    user_profile: userProfileImg,
                    user_stats: {
                        publications: "23",
                        likes: "480"
                    },
                    community_name: "IoT community",
                    community_profile: communityProfileImg,
                },
            ],
        }
    }
    createArticleCards() {
        return this.state.Articles.map(function (article) { return <ArticleCard infos={article} /> });
    }

    render() {
        return (
            <div className="col-span-5">
                <div className="pb-4 border-b-2 border-feed-border flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center justify-start gap-4">
                        <img src={article} alt="articles" className="h-7 w-7" />
                        <h2 className="font-semibold text-big-title text-white">Articles</h2>
                    </div>
                    <button className="flex flex-row items-center justify-center gap-2 border border-white py-2 px-4 rounded-md">
                        <img src={feather} alt="write" className="h-4 w-4" />
                        <span className="text-white font-medium text-base">write</span>
                    </button>
                </div>
                <div className="flex flex-col justify-start items-center">
                    <div>
                        {this.createArticleCards()}
                    </div>
                    <button className="mt-8 flex flex-row items-center justify-center gap-4 border-2 px-4 py-2 rounded-md border-feed-border bg-load-more">
                        <img className="h-4 w-4 opacity-70" src={loadMoreImg} alt="load more" />
                        <span className="text-description font-semibold">Load more..</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default Feed;