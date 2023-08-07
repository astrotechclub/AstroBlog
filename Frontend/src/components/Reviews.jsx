import { useState, useEffect } from "react";
import likesIcon from "../assets/icons/like.png";
import likesFillIcon from "../assets/icons/like-fill.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function updateLikes(action, id, author, community, host, navigate) {
    const url = `${host}/articles/update_likes/${id}`;
    axios.post(url, { "action": action, "author": author, "community": community }, {
        withCredentials: true,
    }).then(res => {
        if (res.data.errors) {
            console.log(res.data.errors);
        }
        if (res.status === 200) {
            window.location.reload();
        }
    }).catch(err => { console.log(err.response.data); });
}

function updateDislikes(action, id, author, community, host, navigate) {
    const url = `${host}/articles/update_dislikes/${id}`;
    axios.post(url, { "action": action, "author": author, "community": community }, {
        withCredentials: true,
    }).then(res => {
        if (res.data.errors) {
            console.log(res.data.errors);
        }
        if (res.status == 401 || res.status == 403) navigate("/login");
        if (res.status == 404) navigate("/E404");

        if (res.status === 200) {
            window.location.reload();
        }
    }).catch(err => { console.log(err.response.data); });
}

function Reviews({ alikes, adislikes, articleId, author, community, host, dark }) {
    const [likes, setLikes] = useState(alikes);
    const [dislikes, setDislikes] = useState(adislikes);
    const [likesChanged, setLikesChanged] = useState();
    const [dislikesChanged, setDislikesChanged] = useState();
    const navigate = new useNavigate();
    const handleLike = () => {
        if (!likesChanged) {
            setLikes(likes + 1);
            setLikesChanged(true);
            updateLikes("increase", articleId, author, community, host, navigate);
            if (dislikesChanged) {
                setDislikes(dislikes - 1);
                setDislikesChanged(false);
                updateDislikes("decrease", articleId, author, community, host, navigate);
            }
        } else {
            setLikes(likes - 1);
            setLikesChanged(false);
            updateLikes("decrease", articleId, author, community);
        }
    }
    const handleDislike = () => {
        if (!dislikesChanged) {
            setDislikes(dislikes + 1);
            setDislikesChanged(true);
            updateDislikes("increase", articleId, author, community);
            if (likesChanged) {
                setLikes(likes - 1);
                setLikesChanged(false);
                updateLikes("decrease", articleId, author, community);
            }
        } else {
            setDislikes(dislikes - 1);
            setDislikesChanged(false);
            updateDislikes("decrease", articleId, author, community);
        }
    }

    useEffect(() => {
        const fetchIlikedArticle = async () => {
            const url = `${host}/articles/likes/${articleId}`;
            const result = await fetch(url, { credentials: "include" });
            if (result.status == 200) {
                result.json().then(json => setLikesChanged(json.isLiked));
            } else {
                navigate("/E404");
            }
        }
        fetchIlikedArticle();
    }, []);

    useEffect(() => {
        const fetchIdislikedArticle = async () => {
            const url = `${host}/articles/dislikes/${articleId}`;
            const result = await fetch(url, { credentials: "include" });
            if (result.status == 200) {
                result.json().then(json => setDislikesChanged(json.isDisliked));
            } else {
                navigate("/E404");
            }
        }
        fetchIdislikedArticle();
    }, []);

    return (
        <>
            {(dislikesChanged === true || dislikesChanged === false) && (likesChanged === true || likesChanged === false) && < div className="flex flex-row items-start justify-center gap-4" >
                <div className="flex flex-col justify-center items-center gap-2">
                    <img src={likesChanged ? likesFillIcon : likesIcon} alt="like" className={`h-[25px] w-[25px] opacity-75 cursor-pointer ${dark ? null : "invert-grey"}`} onClick={handleLike} />
                    <span className="text-description font-medium text-mini-text">{likes} likes</span>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <img src={dislikesChanged ? likesFillIcon : likesIcon} alt="dislike" className={`rotate-180 h-[25px] w-[25px] opacity-75 cursor-pointer ${dark ? null : " invert-grey"}`} onClick={handleDislike} />
                    <span className="text-description font-medium text-mini-text">{dislikes} dislikes</span>
                </div>

            </div >}
        </>
    );
}

export default Reviews;