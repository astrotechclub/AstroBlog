import React from "react";
import logo from "../assets/logo.svg";
import filterIcon from "../assets/icons/filter.png";
import searchIcon from "../assets/icons/search.png";
import bellIcon from "../assets/icons/bell-ring.png";
import profileImg from "../assets/images/profile.jpg";

class FeedNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: ["hello world"],
            profile: {
                img: profileImg,
            }
        };
    }

    notify() {
        if (this.state.notifications.length === 0) {
            return <div></div>;
        } else {
            return <div id="notifications" className="h-[10px] w-[10px] rounded-[10px] bg-light-pink absolute right-0 top-0"></div>;
        }
    }

    render() {
        return (
            <div className="px-20 flex flex-row items-center justify-between gap-4 py-10">
                <div className="flex flex-col items-center justify-center">
                    <img src={logo} alt="logo" className="h-10 -rotate-logo" />
                    <span className="logo font-semibold text-sm text-white">Astrotech</span>
                </div>
                <div className="flex flex-row items-center justify-between border border-feed-border border-2 p-4 rounded-md w-5/6 gap-2">
                    <img src={searchIcon} alt="search" className="h-[20px] w-[20px] opacity-[.7]" />
                    <form action="." method="GET" className="flex flex-row items-center justify-between w-full gap-2">
                        <div className="w-full">
                            <input type="text" placeholder="Click to search ..." className="w-full outline-none border-none bg-transparent text-white" />
                        </div>
                        <div>
                            <img src={filterIcon} alt="filter" className="h-[20px] w-[20px] opacity-[.7] cursor-pointer" />
                            {/* filters container with inputs */}
                        </div>
                    </form>
                </div>
                <div className="relative cursor-pointer">
                    <img src={bellIcon} alt="bell" className="h-6 w-6" />
                    {this.notify()}
                </div>
                <div className="cursor-pointer">
                    <img src={this.state.profile.img} alt="profile" className="rounded-[50px] h-[60px] w-[60px] object-cover" />
                </div>
            </div>
        );
    }


}

export default FeedNavBar;