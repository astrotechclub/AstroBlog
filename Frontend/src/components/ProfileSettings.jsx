import React from "react";
import settingsIcon from "../assets/icons/settings.png"
import profileImg from "../assets/images/profile.jpg";
import pen from "../assets/icons/pen.png"

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: {
                img: profileImg,
            }
        }
    }
    render() {
        return (
            <div id="profile">
                < div className="pb-2 border-b-2 border-feed-border flex flex-row justify-start items-center gap-4" >
                    <img src={settingsIcon} alt="Settings" className="h-6 w-6" />
                    <h2 className="font-semibold text-card-title text-white">Profile Settings</h2>
                </div >
                <div className="flex flex-row mt-4 justify-between items-center gap-8">
                    <div className="w-full">
                        <div>
                            <label htmlFor="fname" className="text-white text-small-subtitle pb-1 pl-1 block">First Name</label>
                            <input type="text" id="fname" name="fname" className="w-full text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none" placeholder="Yacine" />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="lname" className="text-white text-small-subtitle pb-1 pl-1 block">Last Name</label>
                            <input type="text" id="lname" name="lname" className="w-full text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none" placeholder="Touahria" />
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-48 h-48 overflow-hidden rounded-full">
                            <img src={this.state.profile.img} alt="Profile picture" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-2 right-0 left-0 py-2 px-4 mx-4 bg-zinc-800 rounded-md flex flex-row gap-2 items-center justify-center">
                            <img src={pen} alt="google" className='h-4 w-4' />
                            <span className="text-white font-text text-sm cursor-pointer">Change picture</span>
                            <input type="file" className="w-full h-full z-10 absolute top-0 left-0 opacity-0" />
                        </div>
                    </div>
                </div>

                <div className="mt-4 w-full">
                    <div className="mb-4">
                        <label htmlFor="username" className="text-white pb-1 pl-1 block text-small-subtitle">Username</label>
                        <input type="text" id="username" name="username" className="w-full block text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none" placeholder="yacine_touahria" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-white pb-1 pl-1 block text-small-subtitle">Email</label>
                        <input type="email" id="email" name="email" className="w-full block text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none" placeholder="yacine_touahria@mail.com" />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-white pb-2 pl-1 block">Bio</label>
                        <textarea id="bio" name="bio" className="w-full block text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md h-24 outline-none resize-none" placeholder="Tell your readers about yoursef..." />
                    </div>
                </div>
            </div >

        )
    }
}

export default ProfileSettings