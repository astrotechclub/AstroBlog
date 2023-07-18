import React from "react";
import SecuritySettings from "./SecuritySettings";
import ProfileSettings from "./ProfileSettings";
class SettingsContent extends React.Component {
    render() {
        return (
            <div className="w-full h-full col-span-2">
                <form action="">
                    <ProfileSettings />
                    <SecuritySettings />
                    <div className="flex flex-row mt-16 justify-end gap-4">
                        <button className='w-1/4 text-white rounded-md outline-none border bg-transparent h-[40px] font-medium text-sm border-boder-grey'>Cancel</button>
                        <button className='w-1/4 text-white rounded-md outline-none border-none bg-gradient-to-r from-light-pink to-dark-pink h-[40px] font-medium text-sm'>Save changes</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SettingsContent