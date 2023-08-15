import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import topArticlesIcon from "../assets/icons/trophy.png";

function TopArticles({ host }) {

    const [topArticles, setTopArticles] = useState([]);
    const navigate = new useNavigate();
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

        const url = `${host}/articles/top`;
        const fetchTopArticles = async () => {
            const result = await fetch(url, { credentials: "include" });
            if (result.status == 401 || result.status == 403) navigate("/login");
            if (result.status == 404) navigate("/E404");
            if (result.status == 200) {
                result.json().then(json => setTopArticles(json));
            }
        }
        fetchTopArticles();

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    let topArticlesList = []
    topArticles.forEach((article, index) => {
        topArticlesList.push(<div className="w-full h-full row-span-2 cursor-pointer">
            <div className="relative">
                <img src={ article.img } alt="article" className="h-64 w-full object-cover" onClick={ () => { navigate(`/article/${article.id}`) } } />
                <div className="absolute bottom-3 left-5 flex flex-row gap-2">
                    { article.fields.map(function (field) { return <span key={ field } className="border border-light-pink text-light-pink text-xs font-medium py-1 px-2 rounded-[10px]">{ field }</span>; }) }
                </div>
            </div>
            <div className="my-3 flex flex-row items-center justify-between">
                <span className="text-subtitle font-medium text-xs">{ article.date } { article.time }</span>
                <span className="text-subtitle font-medium text-xs">{ article.comments } comments, { parseInt(article.nb_likes) + parseInt(article.nb_dislikes) } reviews</span>
            </div>
            <div>
                <h3 className="text-white font-semibold text-xl mb-2" onClick={ () => { navigate(`/article/${article.id}`) } }>{ article.title }</h3>
                <p className="text-description text-base" onClick={ () => { navigate(`/article/${article.id}`) } }>{ article.description }</p>
            </div>
        </div>)
    })

    return (
        <>
            { topArticles.length === 3 && screenSize === 'large' && <div className="px-8 md:px-14 lg:px-20 py-8">
                <div className="pb-4 border-b-2 border-feed-border flex flex-row justify-start items-center gap-4">
                    <img src={ topArticlesIcon } alt="top articles" className="h-5 w-5" />
                    <h2 className="font-semibold text-big-title text-white">Top Articles</h2>
                </div>
                <div className="grid grid-cols-1 grid-rows-3 lg:grid-cols-2 lg:grid-rows-2 gap-10 mt-6">
                    <div className="w-full h-full row-span-2 cursor-pointer">
                        <div className="relative">
                            <img src={ topArticles[0].img } alt="article" className="h-64 w-full object-cover" onClick={ () => { navigate(`/article/${topArticles[0].id}`) } } />
                            <div className="absolute bottom-3 left-5 flex flex-row gap-2">
                                { topArticles[0].fields.map(function (field) { return <span key={ field } className="border border-light-pink text-light-pink text-xs font-medium py-1 px-2 rounded-[10px]">{ field }</span>; }) }
                            </div>
                        </div>
                        <div className="my-3 flex flex-row items-center justify-between">
                            <span className="text-subtitle font-medium text-xs">{ topArticles[0].date } { topArticles[0].time }</span>
                            <span className="text-subtitle font-medium text-xs">{ topArticles[0].comments } comments, { parseInt(topArticles[0].nb_likes) + parseInt(topArticles[0].nb_dislikes) } reviews</span>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-xl mb-2" onClick={ () => { navigate(`/article/${topArticles[0].id}`) } }>{ topArticles[0].title }</h3>
                            <p className="text-description text-base" onClick={ () => { navigate(`/article/${topArticles[0].id}`) } }>{ topArticles[0].description }</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-row items-start justify-between gap-4 cursor-pointer">
                        <img src={ topArticles[1].img } alt="article" className="h-48 w-1/2 object-cover" onClick={ () => { navigate(`/article/${topArticles[1].id}`) } } />
                        <div className="h-full w-1/2">
                            <span className="text-subtitle font-medium text-xs">{ topArticles[1].date } { topArticles[1].time }</span>
                            <h3 className="text-white font-semibold text-lg my-4" onClick={ () => { navigate(`/article/${topArticles[1].id}`) } }>{ topArticles[1].title }</h3>
                            <div className="flex flex-row items-center justify-start gap-2">
                                { topArticles[1].fields.map(function (field) { return <span key={ field } className="border border-light-pink text-light-pink text-xs font-medium py-1 px-2 rounded-[10px]">{ field }</span>; }) }
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row items-start justify-between gap-4 cursor-pointer">
                        <img src={ topArticles[2].img } alt="article" className="h-48 w-1/2 object-cover" onClick={ () => { navigate(`/article/${topArticles[2].id}`) } } />
                        <div className="h-full w-1/2">
                            <span className="text-subtitle font-medium text-xs">{ topArticles[2].date } { topArticles[2].time }</span>
                            <h3 className="text-white font-semibold text-lg my-4" onClick={ () => { navigate(`/article/${topArticles[2].id}`) } }>{ topArticles[2].title }</h3>
                            <div className="flex flex-row items-center justify-start gap-2">
                                { topArticles[2].fields.map(function (field) { return <span key={ field } className="border border-light-pink text-light-pink text-xs font-medium py-1 px-2 rounded-[10px]">{ field }</span>; }) }
                            </div>
                        </div>
                    </div>
                </div>
            </div> }

            { topArticles.length > 3 && screenSize === 'large' &&
                <div className="px-8 md:px-14 lg:px-20 py-8">
                    <div className="pb-4 border-b-2 border-feed-border flex flex-row justify-start items-center gap-4">
                        <img src={ topArticlesIcon } alt="top articles" className="h-5 w-5" />
                        <h2 className="font-semibold text-big-title text-white">Top Articles</h2>
                    </div>
                    <div className=" grid grid-cols-2 gap-10 mt-6">
                        { topArticlesList }
                    </div>
                </div>
            }

            {  (screenSize === 'medium' || screenSize ==='small') &&
                <div className="px-8 md:px-14 lg:px-20 py-8">
                    <div className="pb-4 border-b-2 border-feed-border flex flex-row justify-start items-center gap-4">
                        <img src={ topArticlesIcon } alt="top articles" className="h-5 w-5" />
                        <h2 className="font-semibold text-big-title text-white">Top Articles</h2>
                    </div>
                    <div className=" grid grid-cols-1 gap-10 mt-6">
                        { topArticlesList }
                    </div>
                </div>
            }
        </>
    );
}

export default TopArticles;