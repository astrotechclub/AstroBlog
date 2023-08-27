import React, { useState } from 'react';
import Dialog from './Dialog';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const AccountAddDialog = ({ isOpen, onClose, setShowAlert, setUsers, setAllUsers, setAlertMessage }) => {

    const host = "http://localhost:5000";
    const [newAccount, setNewAccount] = useState({
        fullname: '',
        email: '',
        profile_pic: '',
        about: 'esi_student',
        password: '',
        bio: '',
        details: ''
    });

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
    };



    const confirmAddDialog = () => {
        onClose();
        const formData = new FormData();
        formData.append('profile_pic', newAccount.profile_pic);
        formData.append('fullname', newAccount.fullname);
        formData.append('email', newAccount.email);
        formData.append('about', newAccount.about);
        formData.append('password', newAccount.password);
        formData.append('bio', newAccount.bio);
        formData.append('details', newAccount.details);

        axios.post(`${host}/user/add`, formData, {
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

            const createdUser = res.data;

            setUsers(prevUsers => [...prevUsers, createdUser]);
            setAllUsers(prevUsers => [...prevUsers, createdUser])
            setNewAccount({
                fullname: '',
                email: '',
                about: 'esi_student',
                password: '',
                bio: '',
                details: ''
            })
            setAlertMessage(`User ${newAccount.fullname} created successfully`)
            setShowAlert(true);
        }).catch(err => {
            console.log(err);
        });
    };




    return (
        <Dialog isOpen={ isOpen } onClose={ onClose }>
            <form>
                <div className='flex flex-col justify-start items-start gap-4'>
                    <h1 className='text-2xl'>Add user</h1>
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
                            value={ newAccount.about }
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
                        <input value={ newAccount.password }
                            onChange={ handleInputChange } type="password" name='password' id="last_name" class="bg-gray-50  border border-[#6838ec] focus:border-[#6838ec] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="" required />
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
                        <div onClick={ () => { confirmAddDialog() } } className='hover:cursor-pointer flex flex-row gap-2 py-1  px-4 rounded-lg justify-start items-center text-[#7e4efc] text-lg border-[#7e4efc] border-2'>
                            <button className='' >Create</button>
                        </div>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default AccountAddDialog;
