import React, { useState, useEffect } from 'react';
import Dialog from './Dialog';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccountEditDialog = ({ selectedUser, isOpen, onClose, setShowAlert, setUsers, users, allUsers, setAllUsers, setAlertMessage }) => {
    const host = "http://localhost:5000";
    const [newAccount, setNewAccount] = useState({
        id: '',
        fullname: '',
        email: '',
        category: 'esi_student',
        profile_pic: '',
        user_password: '',
        bio: '',
        details: '',
        is_admin: ''
    });

    useEffect(() => {
        if (selectedUser) {
            setNewAccount(selectedUser);
            setNewAccount((prevAccount) => ({
                ...prevAccount,
                user_password: '',
            }));
        }
    }, [selectedUser]);

    const handleInputChange = (event) => {
        const { name, value, type } = event.target;

        if (type === 'file') {
            setNewAccount((prevAccount) => ({
                ...prevAccount,
                profile_pic: event.target.files[0],
            }));
        } else {
            setNewAccount((prevAccount) => ({
                ...prevAccount,
                [name]: value,
            }));
        }
        console.log(newAccount)
    };

    const confirmEditDialog = () => {
        onClose();
        const formData = new FormData();
        formData.append('profile_pic', newAccount.profile_pic);
        formData.append('fullname', newAccount.fullname);
        formData.append('email', newAccount.email);
        formData.append('category', newAccount.category);
        formData.append('user_password', newAccount.user_password);
        formData.append('bio', newAccount.bio);
        formData.append('details', newAccount.details);
        formData.append('is_admin', newAccount.is_admin)
        formData.append('id', newAccount.id);

        axios.put(`${host}/user/editUser`, formData, {
            withCredentials: true,
        }).then(res => {
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

            setNewAccount(res.data);
            console.log(res.data)

            setAlertMessage(`User ${newAccount.fullname} edited successfully`)
            setShowAlert(true);

            const userIndex = users.findIndex(user => user.id === selectedUser.id);
            if (userIndex !== -1) {
                const updatedUsers = [...users];
                updatedUsers[userIndex] = res.data;
                setUsers(updatedUsers);
            }

            userIndex = allUsers.findIndex(user => user.id === selectedUser.id);
            if (userIndex !== -1) {
                const updatedUsers = [...allUsers];
                updatedUsers[userIndex] = res.data;
                setAllUsers(updatedUsers);
            }


        }).catch(err => {
            console.log(err);
        });
    };




    return (
        <Dialog isOpen={ isOpen } onClose={ onClose }>
            <form>
                <div className='flex flex-col justify-start items-start gap-4'>
                    <h1 className='text-2xl'>Edit user</h1>
                    <div className='w-[600px]'>
                        <label for="last_name" class="text-[#6838ec] block mb-2 text-sm font-medium  dark:text-white">Fullname</label>
                        <input type="text" name='fullname' value={ newAccount.fullname }
                            onChange={ handleInputChange } id="last_name" class="bg-gray-50  border border-[#6838ec] focus:border-[#6838ec] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="" required />
                    </div>
                    <div className='w-[600px]'>
                        <label for="last_name" class="text-[#6838ec] block mb-2 text-sm font-medium  dark:text-white">Email</label>
                        <input name='email' value={ newAccount.email }
                            onChange={ handleInputChange } type="email" id="last_name" class="bg-gray-50  border border-[#6838ec] focus:border-[#6838ec] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="" required />
                    </div>
                    <div className='w-[600px]'>
                        <label htmlFor="profile_image" className="text-[#6838ec] block mb-2 text-sm font-medium dark:text-white">Profile Image</label>
                        <div className="relative border border-[#6838ec] focus-within:border-[#6838ec] rounded-lg overflow-hidden">
                            <input
                                type="file"
                                id="profile_pic"
                                name="profile_pic"
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

                    <div className="w-full  rounded-lg ">
                        <label htmlFor="select" className="block mb-2 text-sm font-medium text-[#6838ec]">
                            Select a category
                        </label>
                        <select
                            value={ newAccount.category }
                            onChange={ handleInputChange }
                            name='category'
                            id="select"
                            className="w-full bg-gray-50 text-gray-900 text-sm  border rounded-lg p-2.5 border-[#6838ec] focus:ring-[#6838ec] focus:border-[#6838ec] outline-none sm:text-sm"
                        >

                            <option value="esi_student">ESI student</option>
                            <option value="esi_prof">ESI professor</option>
                            <option value="other_univ">Other univ. student</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='w-[600px]'>
                        <label for="last_name" class="text-[#6838ec] block mb-2 text-sm font-medium  dark:text-white">Password</label>
                        <input value={ newAccount.user_password }
                            onChange={ handleInputChange } type="password" name='user_password' id="last_name" class="bg-gray-50  border border-[#6838ec] focus:border-[#6838ec] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="" required />
                    </div>
                    <div className="w-full  rounded-lg ">
                        <label htmlFor="select" className="block mb-2 text-sm font-medium text-[#6838ec]">
                            Select user type
                        </label>
                        <select
                            value={ newAccount.is_admin }
                            onChange={ handleInputChange }
                            name='is_admin'

                            className="w-full bg-gray-50 text-gray-900 text-sm  border rounded-lg p-2.5 border-[#6838ec] focus:ring-[#6838ec] focus:border-[#6838ec] outline-none sm:text-sm"
                        >


                            <option class="px-4 py-3 flex items-center font-medium text-gray-900 whitespace-nowrap" value={ 0 }>Not admin
                            </option>
                            <option class="px-4 py-3 flex items-center font-medium text-gray-900 whitespace-nowrap" value={ 1 }>
                                Admin
                            </option>


                        </select>
                    </div>
                    <div className='w-[600px]'>
                        <label htmlFor="" className="text-[#6838ec] block mb-2 text-sm font-medium dark:text-white">Bio</label>
                        <textarea
                            name='bio'
                            value={ newAccount.bio }
                            onChange={ handleInputChange }
                            rows={ 2 }
                            id="image_link"
                            className="bg-gray-50 border border-[#6838ec] focus:border-[#6838ec] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder=""
                            required
                        />
                    </div>
                    <div className='w-[600px]'>
                        <label htmlFor="" className="text-[#6838ec] block mb-2 text-sm font-medium dark:text-white">Details</label>
                        <textarea
                            name='details'
                            value={ newAccount.details }
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
                            <button className='' >Close</button>
                        </div>
                        <div onClick={ () => { confirmEditDialog() } } className='hover:cursor-pointer flex flex-row gap-2 py-1  px-4 rounded-lg justify-start items-center text-[#7e4efc] text-lg border-[#7e4efc] border-2'>
                            <button className='' >Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default AccountEditDialog;
