import React, { useState, useEffect } from "react";
import suggestionsIcon from "../assets/icons/link.png";
import communitiesIcon from "../assets/icons/group.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Contacts({ picturesUrl, host }) {
    const [suggestions, setSuggestions] = useState([]);
    const [my_communities, setMyCommunities] = useState([]);
    const navigate = new useNavigate();

    useEffect(() => {
        const fetchMyCommunites = async () => {
            const url = `${host}/communities/following/mine`;
            const result = await fetch(url, { credentials: "include" });
            if (result.status == 200) {
                result.json().then(json => setMyCommunities(json));
            }
            if (result.status == 401 || result.status == 403) navigate("/login");
            if (result.status == 404) navigate("/E404");

        }
        fetchMyCommunites();
    }, []);

    useEffect(() => {
        const fetchMyCommunites = async () => {
            const url = `${host}/communities/suggestions/mine`;
            const result = await fetch(url, { credentials: "include" });
            if (result.status == 200) {
                result.json().then(json => setSuggestions(json));
            } else {
                navigate("/E404");
            }
        }
        fetchMyCommunites();
    }, []);

    const createSuggestions = () => {
        return suggestions.map(function (community) {
            return <div className="flex flex-row items-center justify-between my-4 gap-2" >
                <div className="flex flex-row items-center justify-start gap-2 cursor-pointer" onClick={() => navigate(`/community/${community.id}`)}>
                    <img src={picturesUrl + community.img} alt="community" className="h-[40px] w-[40px] rounded-full object-cover" />
                    <div className="block">
                        <span className="block text-small-subtitle text-white font-semibold">{community.name}</span>
                        <span className="block text-mini-text text-subtitle font-medium">{community.followers} followers, {community.likes} likes</span>
                    </div>
                </div>
                <button className="border-2 rounded-md border-feed-border text-description text-mini-text font-medium px-4 py-2" onClick={(e) => { handleFollow(e.target, community.id) }}>follow</button>
            </div>;
        });
    }

    const createMyCommunities = () => {
        return my_communities.map(function (community) {
            return <div className="flex flex-row items-center justify-between my-4 gap-2">
                <div className="flex flex-row items-center justify-start gap-2 cursor-pointer" onClick={() => navigate(`/community/${community.id}`)}>
                    <img src={picturesUrl + community.img} alt="community" className="h-[40px] w-[40px] rounded-full object-cover" />
                    <div className="block">
                        <span className="block text-small-subtitle text-white font-semibold">{community.name}</span>
                        <span className="block text-mini-text text-subtitle font-medium">{community.followers} followers, {community.likes} likes</span>
                    </div>
                </div>
                {community.id != 1 && <button className="border-2 rounded-md border-feed-border text-description text-mini-text font-medium px-4 py-2" onClick={(e) => { handleUnfollow(e.target, community.id); }}>unfollow</button>}
            </div>;
        });
    }

    const handleUnfollow = (button, id) => {
        const url = `${host}/communities/unfollow`;
        button.parentElement.remove();
        axios.post(url, { community: id }, { withCredentials: true }).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
            }
            if (res.status === 200) {
                console.log(res);
            }
        }).catch(err => { console.log(err.response.data); });

    }
    const handleFollow = (button, id) => {
        const url = `${host}/communities/follow`;
        button.parentElement.remove();
        axios.post(url, { community: id }, { withCredentials: true }).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
            }
            if (res.status === 200) {
                console.log(res);
            }
        }).catch(err => { console.log(err.response.data); });
    }

    return (
        <div className="sticky top-4">
            <div className="mt-8">
                <div className="flex flex-row justify-start items-center gap-2 mb-4">
                    <img src={communitiesIcon} alt="suggestions" className="h-[20px] w-[20px]" />
                    <h4 className="text-white font-semibold">My communities</h4>
                </div>
                <div>
                    {createMyCommunities()}
                </div>
            </div>
            {suggestions.length > 0 && <div className="mt-8">
                <div className="flex flex-row justify-start items-center gap-2 mb-4">
                    <img src={suggestionsIcon} alt="suggestions" className="h-[20px] w-[20px]" />
                    <h4 className="text-white font-semibold">Other communities</h4>
                </div>
                <div>
                    {createSuggestions()}
                </div>
            </div>}
        </div>
    );
}

export default Contacts;