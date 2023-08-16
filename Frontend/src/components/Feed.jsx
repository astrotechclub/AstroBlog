import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import article from "../assets/icons/article.png";
import feather from "../assets/icons/feather.png";
import loadMoreImg from "../assets/icons/reload.png";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";

function createArticleCards(articles, picturesUrl) {
    return articles.map(function (article) { return <ArticleCard key={article.id + "_articleCard"} infos={article} picturesUrl={picturesUrl} /> });
}

function Feed({ articles, maxArticlesPerPage, setArticles, isProfile, picturesUrl, host, isFollower, community }) {
    const navigate = new useNavigate();
    const [max, setMax] = useState(maxArticlesPerPage);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMore = () => {
        setIsLoading(true);
        setMax(max + maxArticlesPerPage);
    }

    useEffect(() => {
        const fetchArticles = async () => {
            var result = await fetch(`${host}/articles/-${max}`, { credentials: "include" });
            setIsLoading(false);
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

        if (max > maxArticlesPerPage) fetchArticles();
    }, [max]);


    return (
        <div className="col-span-6 lg:col-span-5" >
            <div className="pb-4 border-b-2 border-feed-border flex flex-row justify-between items-center">
                <div className="flex flex-row items-center justify-start gap-4">
                    <img src={article} alt="articles" className="h-5 w-5" />
                    <h2 className="font-semibold text-big-title text-white">Articles</h2>
                </div>
                {!isProfile && isFollower && <button className="flex flex-row items-center justify-center gap-2 border border-white py-2 px-4 rounded-md" onClick={() => navigate(`/write_article/${community}`)}>
                    <img src={feather} alt="write" className="h-4 w-4" />
                    <span className="text-white font-medium text-base">write</span>
                </button>}
            </div>
            <div className="flex flex-col justify-start items-strech">
                <div>
                    {createArticleCards(articles, picturesUrl)}
                </div>
                {articles.length === max &&
                    <button className="mt-8 flex flex-row items-center justify-center gap-4 border-2 px-4 py-2 rounded-md border-feed-border bg-load-more" onClick={handleLoadMore}>
                        <img className="h-4 w-4 opacity-70" src={loadMoreImg} alt="load more" />
                        <span className="text-description font-semibold">Load more..</span>
                    </button>
                }
                {isLoading && <LoadingComponent />}
            </div>
        </div>
    );
}

export default Feed;