import { useState } from "react";
import filterIcon from "../assets/icons/filter.png";
import searchIcon from "../assets/icons/search.png";
import { useNavigate } from "react-router-dom";

function SearchBar({ setShowNotification, host }) {
    const [isFocus, setFocus] = useState(false);
    const [result, setResult] = useState();
    const [input, setInput] = useState();
    const [error, setError] = useState(false);
    const navigate = new useNavigate();

    const handleFocus = () => {
        setFocus(true);
        if (setShowNotification) setShowNotification(false);
    }
    const handleUnFocus = () => {
        setFocus(false);
        setResult(null);
        setError(false);
    }
    const renderResult = () => {
        /*
            img , title , subtitle + link
            if profile: img , fullname , nb likes + nb publications + link
            if article: img , title , nb comments + nb reviews + link
        */
        return (
            result.map(r => {
                return (
                    <div className="flex flex-row gap-2 items-end justify-start p-2 border-b border-border-grey cursor-pointer hover:bg-input-light-grey" onClick={() => { navigate(r.link); console.log("going") }}>
                        <img src={r.img} alt="result image" className="h-[40px] w-[50px] rounded-sm" />
                        <div className="flex flex-col items-start justify-start">
                            <span className="font-semibold text-black text-small-subtitle">{r.title}</span>
                            <span className="text-grey text-smallest-text">{r.subtitle}</span>
                        </div>
                    </div>
                );
            })
        );
    }


    const search = async (e) => {
        e.preventDefault();
        if (input && input.length > 0) {
            var result = await fetch(`${host}/home?search=${input}`, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                result = await fetch(`${host}/refresh`, { credentials: "include" });
                if (result.status === 401 || result.status === 403) {
                    navigate("/login");
                } else {
                    result = await fetch(`${host}/home?search=${input}`, { credentials: "include" });
                    if (result.status !== 200) navigate("/login");
                }
            }
            result.json().then(data => {
                setResult([]);
                if (data.article) {
                    setResult([...data.article]);
                }
                if (data.user) {
                    setResult([...result, ...data.user]);
                }
            }).catch(err => { console.log(err); setError(true) });;
        }
    }

    return (
        <div className="w-full relative h-[60px]">
            {isFocus && <div className="bg-white px-4 pt-[60px] pb-4 absolute top-0 left-0 right-0 w-full rounded-md">
                {error ? <span className="text-light-text text-small-subtitle font-medium">error while loading data</span> : !result ? !input ? <span className="text-light-text text-small-subtitle font-medium">type something and press enter</span> : <span className="text-light-text text-small-subtitle font-medium">searching ...</span> : result.length == 0 ? <span className="text-light-text text-small-subtitle font-medium">No result</span> : renderResult()}
            </div>}

            <div className={`flex flex-row items-center justify-between border ${isFocus ? "border-transparent" : "border-feed-border"} border-2 p-4 rounded-md w-full gap-2 absolute top-0 z-10`
            } >
                <img src={searchIcon} alt="search" className={`h-[20px] w-[20px] opacity-[.7] ${isFocus ? "invert" : ""}`} />
                <form action="" onSubmit={search} className="flex flex-row items-center justify-between w-full gap-2">
                    <div className="w-full">
                        <input type="text" placeholder="Click to search ..." onChange={e => setInput(e.target.value.replace(" ", "%20"))} className={`w-full outline-none border-none bg-transparent ${isFocus ? "text-black" : "text-white"}`} onFocus={handleFocus} onBlur={(e) => { e.target.value.length == 0 && handleUnFocus() }} />
                    </div>
                    {/* <div>
                    <img src={filterIcon} alt="filter" className="h-[20px] w-[20px] opacity-[.7] cursor-pointer" />
                    </div> 
                */}
                </form >
            </div >
        </div>
    );
}

export default SearchBar;