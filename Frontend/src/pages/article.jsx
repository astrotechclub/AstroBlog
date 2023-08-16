import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Comments from "../components/Comments";
import ReactMarkdown from "react-markdown";
import "../styles/pages/article.css";
import loadMoreImg from "../assets/icons/reload.png";
import AddComment from "../components/AddComment";
import commentsIcon from "../assets/icons/comment.png";
import Reviews from "../components/Reviews";
import SmoothScroll from "../components/SmoothScroll";
import LoadingPage from "../components/LoadingPage";
import LoadingComponent from "../components/LoadingComponent";

function Article() {
    const [screenSize, setScreenSize] = useState('');
    const [dark, setTheme] = useState(true);
    const [article, setArticle] = useState();
    const [comments, setComments] = useState();
    const [profile, setProfile] = useState();
    const maxComments = 3;
    const [max, setMax] = useState(maxComments);
    const [isLoading, setIsLoading] = useState(false);
    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;

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


    document.title = article?.title ? article.title : "Astroblog";

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        const fetchProfile = (async () => {
            const result = await fetch(`${host}/user/mine`, { credentials: "include" });
            result.json().then(data => {
                setProfile(data); document.title = "New article ✨";
            });
        });
        fetchProfile();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const articleId = useParams().articleId;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            var result = await fetch(`${host}/articles/${articleId}`, { credentials: "include" });
            if (result.status === 404) {
                navigate("/E404");
            }
            if (result.status === 401 || result.status === 403) {
                const data = await fetch(`${host}/refresh`, { credentials: "include" });
                if (data.status === 401 || data.status === 403) {
                    navigate("/login");
                } else {
                    result = await fetch(`${host}/articles`, { credentials: "include" });
                    if (result.status !== 200) navigate("/login");
                }
            }
            result.json().then(json => {
                setArticle(json);
            });
        };
        fetchArticle();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            const result = await fetch(`${host}/comments/${articleId}-${max}`, { credentials: "include" });
            if (result.status == 401 || result.status == 403) navigate("/login");
            if (result.status == 404) navigate("/E404");
            result.json().then(json => {
                setComments(json);
                document.title = json.title;
            });
        };
        fetchComments();
    }, []);

    const switchTheme = (event) => {
        let checkbox = event.target;
        checkbox.classList.toggle("checked");
        if (checkbox.classList.contains("checked")) { setTheme(true) } else { setTheme(false); };
    }

    const createFields = (article) => {
        return article.fields.map(function (field) { return <span className="border border-light-pink text-light-pink text-xs font-medium py-1 px-2 rounded-[10px] mr-2">{field}</span> });
    }

    const handleLoadMore = () => {
        setIsLoading(true);
        setMax(max + maxComments);
    }

    useEffect(() => {
        const fetchComments = async () => {
            const result = await fetch(`${host}/comments/${articleId}-${max}`, { credentials: "include" });
            setIsLoading(false);
            if (result.status === 404 || result.status === 400) {
                navigate("/E404");
            } else {
                result.json().then(json => {
                    setComments(json);
                    document.title = json.title;
                })
            }
        };
        if (max > maxComments) fetchComments();
    }, [max]);

    return (
        <>
            {
                article ? <div className={`${dark ? "bg-gradient-to-b from-page-light-dark to-page-dark text-white" : "bg-white text-black"} relative`} key={article.id}>
                    <SmoothScroll />
                    <div className="relative z-10 min-h-[100vh]">
                        <div className="absolute z-30  top-0 left-0 right-0 ">
                            <NavBar profile={profile} picturesUrl={picturesUrl} host={host} />
                        </div>
                        <div className="w-full">
                            <img src={article.img} alt="article" className="brightness-75 object-cover w-full h-[500px]" />
                        </div>
                        <div className="px-8 lg:px-20 py-10 grid grid-cols-5 lg:flex  lg:flex-row items-start justify-between gap-2">
                            <div className="hidden lg:block"></div>
                            <div className="col-span-3 flex flex-row justify-start  items-center gap-4">
                                <div className={`relative ${screenSize === "small" ? "w-[140px]" : null}`}>
                                    <img src={picturesUrl + article.community_profile} alt="community" className="h-[55px] w-[55px] rounded-full object-cover cursor-pointer" onClick={() => navigate(`/community/${article.community_id}`)} />
                                    <img src={picturesUrl + article.user_profile} alt="author" className="h-[20px] w-[20px] rounded-full absolute bottom-0 right-0 object-cover cursor-pointer" onClick={() => navigate(`/profile/${article.user_id}`)} />
                                </div>
                                <div className=" flex flex-col gap-1 justify-start items-start cursor-pointer" onClick={() => navigate(`/profile/${article.user_id}`)}>
                                    <span className="block text-small-subtitle font-semibold">{article.user_name} | {article.community_name}</span>
                                    <span className="block text-mini-text text-subtitle font-medium">{article.user_publications} publications, {article.user_likes} likes</span>
                                </div>
                            </div>

                            <div className="col-span-2 flex justify-end w-[200px]">
                                <div className='toggle-switch'>
                                    <label>
                                        <input type='checkbox' className="checked" onClick={event => switchTheme(event)} />
                                        <span className='slider'></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-6 grid-rows-1">
                            <AddComment profile={profile} picturesUrl={picturesUrl} host={host} dark={dark} />
                        </div>
                        <div className="grid grid-cols-6 grid-rows-1 w-full mt-10 px-8 md:px-14 lg:px-20 gap-4">
                            <div className="hidden md:block"></div>
                            {screenSize !== "large" &&
                                <div className="col-span-6 w-full flex justify-center items-center mb-4">
                                    <Reviews alikes={article.article_likes} adislikes={article.article_dislikes} articleId={articleId} author={article.user_name} community={article.community_name} host={host} dark={dark} />
                                </div>
                            }
                            <div className="col-span-6 md:col-span-4">
                                <div className="mb-4">
                                    {createFields(article)}
                                </div>
                                <span className="text-sm md:text-subtitle font-medium text-md mb-4 block">{article.date} {article.time}</span>
                                <h1 className="font-bold text-3xl">{article.title}</h1>
                                <p className="font-regular text-description text-mini-text mt-2">{article.description}</p>
                                <div className="markdown">
                                    <ReactMarkdown>{article.content}</ReactMarkdown>
                                </div>
                                <div className="mt-12 mb-4 w-full">
                                    <div className={`border-b-2 ${dark ? "border-feed-border" : "border-black"} pb-2 flex flex-row justify-start items-center gap-4 w-full`}>
                                        <img src={commentsIcon} alt="comment" className={`h-[25px] w-[25px] block ${dark ? null : "invert"}`} />
                                        <span className="block text-lg md:text-2xl font-semibold text-card-title">Comments</span>
                                    </div>
                                    {comments && < Comments comments={comments} picturesUrl={picturesUrl} dark={dark} />}
                                </div>
                                {comments && comments.length === max && <>
                                    <dir className="w-full flex justify-center items-center">
                                        <button className={`mt-8 flex flex-row items-center justify-center gap-4 border-2 px-4 py-2 rounded-md ${dark ? "border-feed-border" : "border-border-grey"} bg-load-more`} onClick={handleLoadMore}>
                                            <img className={`h-4 w-4 opacity-70 ${dark ? null : "invert-grey"}`} src={loadMoreImg} alt="load more" />
                                            <span className="text-description font-semibold">Load more..</span>
                                        </button>
                                    </dir>
                                </>
                                }
                                {isLoading && <LoadingComponent dark={dark} />}
                            </div>
                            {screenSize === "large" && <Reviews alikes={article.article_likes} adislikes={article.article_dislikes} articleId={articleId} author={article.user_name} community={article.community_name} host={host} dark={dark} />}
                        </div>
                        <Footer profile={profile} />
                    </div>
                </div > : <LoadingPage />
            }
        </>

    );
}

export default Article;