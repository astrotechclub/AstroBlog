import React, { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CommunityEditDialog = ({ group, isOpen, onClose, setCommunities, setShowAlert, setAlertMessage, setAllCommunities, communities, allCommunities }) => {
    const host = "http://localhost:5000";
    const [newGroup, setNewGroup] = useState({
        community_name: '',
        profile_img: '',
        community_description: '',
        id: ''
    });
    console.log(group)

    useEffect(() => {
        if (group) {
            setNewGroup(group);
        }
    }, [group]);


    const handleInputChange = (event) => {
        const { name, value, type } = event.target;

        if (type === 'file') {
            setNewGroup((prevAccount) => ({
                ...prevAccount,
                profile_img: event.target.files[0],
            }));
        } else {
            setNewGroup((prevAccount) => ({
                ...prevAccount,
                [name]: value,
            }));
        }
    };


    const confirmEditDialog = async () => {
        onClose();

        const formData = new FormData();
        formData.append('community_name', newGroup.community_name);
        formData.append('community_description', newGroup.community_description);
        formData.append('profile_img', newGroup.profile_img);
        formData.append('id', newGroup.id)

        try {
            const res = await axios.put(`${host}/communities/edit`, formData, {
                withCredentials: true,

            });

            if (res.data.errors) {
                console.log(res.data.errors);
            }

            if (res.status === 401 || res.status === 403) {
                navigate("/login");
                return;
            }

            if (res.status === 404) {
                navigate("/E404");
                return;
            }

            const createdCommunity = res.data;
            setAlertMessage(`Community ${newGroup.community_name} saved successfully`)
            setShowAlert(true);

            const userIndex = communities.findIndex(user => user.id === group.id);
            if (userIndex !== -1) {
                const updatedUsers = [...communities];
                updatedUsers[userIndex] = res.data;
                setCommunities(updatedUsers);
            }

            userIndex = allCommunities.findIndex(user => user.id === group.id);
            if (userIndex !== -1) {
                const updatedUsers = [...allCommunities];
                updatedUsers[userIndex] = res.data;
                setAllCommunities(updatedUsers);
            }


        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Dialog isOpen={ isOpen } onClose={ onClose }>
            <div className='flex flex-col justify-start items-start gap-4'>
                <h1 className='text-2xl'>Edit community</h1>


                <div className='w-[600px]'>
                    <label for="last_name" class="text-[#6838ec] block mb-2 text-sm font-medium  dark:text-white">Name</label>
                    <input type="text" name='community_name' value={ newGroup.community_name }
                        onChange={ handleInputChange } id="last_name" class="bg-gray-50  border border-[#6838ec] focus:border-[#6838ec] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="" required />
                </div>
                <div className='w-[600px]'>
                    <label htmlFor="profile_img" className="text-[#6838ec] block mb-2 text-sm font-medium dark:text-white">Picture Image</label>
                    <div className="relative border border-[#6838ec] focus-within:border-[#6838ec] rounded-lg overflow-hidden">
                        <input
                            type="file"
                            id="profile_img"
                            name="profile_img"
                            accept="image/*"
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                            onChange={ handleInputChange }
                            required
                        />
                        <button
                            type="button"
                            className="bg-[#6838ec] text-white py-2 px-4 text-sm font-medium rounded-lg focus:outline-none"
                        >
                            Upload Image
                        </button>
                    </div>
                </div>
                <div className='w-[600px]'>
                    <label htmlFor="" className="text-[#6838ec] block mb-2 text-sm font-medium dark:text-white">
                        Community description
                    </label>
                    <textarea
                        name="community_description"
                        value={ newGroup.community_description }
                        onChange={ handleInputChange }
                        rows={ 3 }
                        id="image_link"
                        className="bg-gray-50 border border-[#6838ec] focus:border-[#6838ec] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder=""
                        required
                    />
                </div>

                <div className='flex flex-row justify-start items-center gap-6'>
                    <div onClick={ onClose } className='hover:cursor-pointer flex flex-row gap-2 py-1 border-2 border-transparent px-4 rounded-lg justify-start items-center text-white text-lg bg-[#7e4efc]'>
                        <button className=''>Close</button>
                    </div>
                    <div onClick={ confirmEditDialog } className='hover:cursor-pointer flex flex-row gap-2 py-1  px-4 rounded-lg justify-start items-center text-[#7e4efc] text-lg border-[#7e4efc] border-2'>
                        <button className=''>Save</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default CommunityEditDialog;