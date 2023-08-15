import React, { useState } from "react";
import settingsIcon from "../assets/icons/settings.png"
import pen from "../assets/icons/pen.png"

function ProfileSettings({ profile, setInputs, inputs, errors, setPicture, picturesUrl }) {
    const [currentPicture, setCurrentPicture] = useState(picturesUrl + profile.img);
    return (
        <div id="profile" className="mb-14">
            < div className="pb-2 border-b-2 border-feed-border flex flex-row justify-start items-center gap-4" >
                <img src={settingsIcon} alt="Settings" className="h-6 w-6" />
                <h2 className="font-semibold text-card-title text-white">Profile Settings</h2>
            </div >
            <div className="flex flex-col-reverse md:flex-row mt-4 justify-between items-center gap-8">
                <div className="w-full">
                    <div>
                        <label className="text-white text-small-subtitle pb-1 pl-1 block">Fullname</label>
                        <input type="text" required name="fullname" defaultValue={profile.fullname} className="w-full text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none" placeholder="Yacine Touahria" onChange={e => setInputs({ ...inputs, "fullname": e.target.value })} />
                        <span className="h-4 text-errors text-xs">{errors.fullname}</span>
                    </div>
                    {/* <div className="mt-4">
                        <label className="text-white text-small-subtitle pb-1 pl-1 block">Email</label>
                        <input type="email" required name="email" defaultValue={profile.email} className="w-full text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none" placeholder="yacine_touahria@mail.com" onChange={e => setInputs({ ...inputs, "email": e.target.value })} />
                        <span className="h-4 text-errors text-xs">{errors.email}</span>
                    </div> */}
                </div>
                <div className="relative">
                    <div className="w-48 h-48 overflow-hidden rounded-full">
                        <img src={currentPicture} alt="Profile picture" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-2 right-0 left-0 py-2 px-4 mx-4 bg-zinc-800 rounded-md flex flex-row gap-2 items-center justify-center">
                        <img src={pen} alt="google" className='h-4 w-4' />
                        <span className="text-white font-text text-sm cursor-pointer">Change picture</span>
                        <input type="file" name="picture" accept="image/* , .gif" className="w-full h-full z-10 absolute top-0 left-0 opacity-0" onChange={e => { const formData = new FormData(); formData.append("image", e.target.files[0]); setPicture(formData); setCurrentPicture(URL.createObjectURL(e.target.files[0])) }} />
                    </div>
                </div>
            </div>

            <div className="mt-4 w-full">
                <div>
                    <label htmlFor="bio" className="block text-white pb-2 pl-1 block">Bio</label>
                    <textarea id="bio" name="bio" defaultValue={profile.bio} className="w-full block text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md h-24 outline-none resize-none" placeholder="Tell your readers about yoursef..." onChange={e => setInputs({ ...inputs, "bio": e.target.value })} />
                </div>
            </div>
        </div >

    )
}

export default ProfileSettings