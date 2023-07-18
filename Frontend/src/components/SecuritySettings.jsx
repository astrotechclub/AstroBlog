import React from "react";
import settingsIcon from "../assets/icons/settings.png"

class SecuritySettings extends React.Component {

    render() {
        return (
            <div className="mt-12" id="security">
                <div className="pb-2 border-b-2 border-feed-border flex flex-row justify-start items-center gap-4">
                    <img src={settingsIcon} alt="Settings" className="h-6 w-6" />
                    <h2 className="font-semibold text-card-title text-white">security Settings</h2>
                </div>

                <div className="mt-4">
                    <div className="w-1/2 mb-4">
                        <label htmlFor="old_psw" className="text-white pb-1 pl-1 block text-small-subtitle">Old password</label>
                        <input type="password" id="old_psw" name="old_psw" className="block text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none w-full" />
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="w-1/2">
                            <label htmlFor="new_psw" className="text-white pb-1 pl-1 block text-small-subtitle">New password</label>
                            <input type="password" id="new_psw" name="new_psw" className="block text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none w-full" />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="new_psw_conf" className="text-white pb-1 pl-1 block text-small-subtitle">Confirmation</label>
                            <input type="password" id="new_psw_conf" name="new_psw_conf" className="block text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none" />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SecuritySettings