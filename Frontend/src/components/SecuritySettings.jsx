import React from "react";
import settingsIcon from "../assets/icons/settings.png"

function SecuritySettings({ setInputs, inputs, errors }) {

    return (
        <div id="security">
            <div className="pb-2 border-b-2 border-feed-border flex flex-row justify-start items-center gap-4">
                <img src={settingsIcon} alt="Settings" className="h-6 w-6" />
                <h2 className="font-semibold text-card-title text-white">security Settings</h2>
            </div>

            <div className="mt-4">
                <div className="w-full md:w-1/2 mb-4">
                    <label htmlFor="old_psw" className="text-white pb-1 pl-1 block text-small-subtitle">Old password</label>
                    <input type="password" id="old_psw" name="old_psw" className="block text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none w-full" onChange={e => setInputs({ ...inputs, "old_psw": e.target.value })} />
                    <span className="h-4 text-errors text-xs">{errors.old_psw}</span>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                        <label htmlFor="new_psw" className="text-white pb-1 pl-1 block text-small-subtitle">New password</label>
                        <input type="password" id="new_psw" name="new_psw" className="block text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none w-full" onChange={e => setInputs({ ...inputs, "new_psw": e.target.value })} />
                        <span className="h-4 text-errors text-xs">{errors.new_psw}</span>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2">
                        <label htmlFor="new_psw_conf" className="text-white pb-1 pl-1 block text-small-subtitle">Confirmation</label>
                        <input type="password" id="new_psw_conf" name="new_psw_conf" className="block text-white bg-transparent font-text text-small-subtitle border border-boder-grey p-2 rounded-md outline-none" onChange={e => setInputs({ ...inputs, "new_psw_conf": e.target.value })} />
                        <span className="h-4 text-errors text-xs">{errors.new_psw_conf}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SecuritySettings