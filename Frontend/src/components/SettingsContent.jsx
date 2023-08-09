import React from "react";
import SecuritySettings from "./SecuritySettings";
import ProfileSettings from "./ProfileSettings";
function SettingsContent({ profile, handleEditProfile, setInputs, inputs, errors, setPicture, picturesUrl }) {
    return (
        <div className="w-full h-full col-span-2">
            <form action="" onSubmit={e => handleEditProfile(e)}>
                <ProfileSettings profile={profile} setInputs={setInputs} inputs={inputs} errors={errors} setPicture={setPicture} picturesUrl={picturesUrl} />
                <SecuritySettings setInputs={setInputs} inputs={inputs} errors={errors} />
                <div className="flex flex-row mt-16 justify-end gap-4">
                    <input type="reset" value="clear" className='w-1/4 text-white rounded-md outline-none border bg-transparent h-[40px] font-medium text-sm border-boder-grey' />
                    <input type="submit" value="Save changes" className='w-1/4 text-white rounded-md outline-none border-none bg-gradient-to-r from-light-pink to-dark-pink h-[40px] font-medium text-sm cursor-pointer' />
                </div>
            </form>
        </div>
    )
}

export default SettingsContent