import React, { useState, useEffect } from 'react';
import Dialog from './Dialog';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const ArticleEditDialog = ({ selectedArticle, isOpen, onClose, setArticles, setShowAlert, setAlertMessage, setAllArticles, articles, allArticles }) => {

    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;
    const [users, setUsers] = useState([])
    const [communities, setCommunities] = useState([])
    const [newArticle, setNewArticle] = useState({
        title: '',
        article_img: '',
        article_description: '',
        content: '',
        user_id: '',
        community: 0,
        id: ''
    });

    useEffect(() => {
        if (selectedArticle) {
            setNewArticle(selectedArticle);
        }
    }, [selectedArticle]);

    useEffect(() => {
        const fetchUsers = async () => {
            var result = await fetch(`${host}/user/all`, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                const data = await fetch(`${host}/refresh`, { credentials: "include" });
                if (data.status === 401 || data.status === 403) {
                    navigate("/login");
                } else {
                    navigate("/home");
                }
            } else {
                if (result.status === 200) {
                    result.json().then(json => {
                        setUsers(json);

                    });
                } else {
                    navigate("/E404");
                }
            }
        };

        const fetchCommunities = async () => {
            var result = await fetch(`${host}/communities/all`, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                const data = await fetch(`${host}/refresh`, { credentials: "include" });
                if (data.status === 401 || data.status === 403) {
                    navigate("/login");
                } else {
                    navigate("/home");
                }
            } else {
                if (result.status === 200) {

                    result.json().then(json => {
                        setCommunities(json);

                    });

                } else {
                    navigate("/E404");
                }
            }
        };

        fetchCommunities();
        fetchUsers();


    }, []);


    const handleInputChange = (event) => {
        const { name, value, type } = event.target;

        if (type === 'file') {
            setNewArticle((prevAccount) => ({
                ...prevAccount,
                article_img: event.target.files[0],
            }));
        } else {
            setNewArticle((prevAccount) => ({
                ...prevAccount,
                [name]: value,
            }));
        }
    };

    const confirmEditDialog = async () => {
        onClose()
        const formData = new FormData();
        formData.append('title', newArticle.title);
        formData.append('article_img', newArticle.article_img);
        formData.append('article_description', newArticle.article_description);
        formData.append('content', newArticle.content);
        formData.append('author', newArticle.user_id);
        formData.append('community', newArticle.community);
        formData.append('id', newArticle.id)

        try {
            const res = await axios.put(`${host}/articles/edit`, formData, {
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

            const userIndex = articles.findIndex(user => user.id === selectedArticle.id);
            if (userIndex !== -1) {
                const updatedUsers = [...articles];
                updatedUsers[userIndex] = res.data;
                setArticles(updatedUsers);
            }

            userIndex = allArticles.findIndex(user => user.id === selectedArticle.id);
            if (userIndex !== -1) {
                const updatedUsers = [...allArticles];
                updatedUsers[userIndex] = res.data;
                setAllArticles(updatedUsers);
            }

            setAlertMessage(`Article ${res.data.title} saved successfully`)
            setShowAlert(true);

        } catch (err) {
            console.log(err);
        }
    };






    return (
        <Dialog isOpen={ isOpen } onClose={ onClose }>
            <div className='flex flex-col justify-start items-start gap-4 '>

                <form>
                    <div className='flex flex-col justify-start items-start gap-4 '>
                        <h1 className='text-2xl'>Edit article</h1>
                        <div className='w-[600px]'>
                            <label for="last_name" class="text-[#6838ec] block mb-2 text-sm font-medium  dark:text-white">Title</label>
                            <input type="text" name='title' value={ newArticle.title }
                                onChange={ handleInputChange } id="last_name" class="bg-gray-50  border border-[#6838ec] focus:border-[#6838ec] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="" required />
                        </div>


                        <div className='w-[600px]'>
                            <label htmlFor="profile_image" className="text-[#6838ec] block mb-2 text-sm font-medium dark:text-white">Article Image</label>
                            <div className="relative border border-[#6838ec] focus-within:border-[#6838ec] rounded-lg overflow-hidden">
                                <input
                                    type="file"
                                    id="article_img"
                                    name="article_img"
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
                            <label htmlFor="" className="text-[#6838ec] block mb-2 text-sm font-medium dark:text-white">Article description</label>
                            <textarea
                                name='article_description'
                                value={ newArticle.article_description }
                                onChange={ handleInputChange }
                                rows={ 3 }
                                id="image_link"
                                className="bg-gray-50 border border-[#6838ec] focus:border-[#6838ec] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder=""
                                required
                            />
                        </div>
                        <div className='w-[600px]'>
                            <label htmlFor="" className="text-[#6838ec] block mb-2 text-sm font-medium dark:text-white">Article content</label>
                            <textarea
                                name='content'
                                value={ newArticle.content }
                                onChange={ handleInputChange }
                                rows={ 6 }
                                id="image_link"
                                className="bg-gray-50 border border-[#6838ec] focus:border-[#6838ec] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder=""
                                required
                            />
                        </div>
                        <div className="w-full  rounded-lg ">
                            <label htmlFor="select" className="block mb-2 text-sm font-medium text-[#6838ec]">
                                Select an auther
                            </label>
                            <select
                                value={ newArticle.user_id }
                                onChange={ handleInputChange }
                                name='user_id'

                                className="w-full bg-gray-50 text-gray-900 text-sm  border rounded-lg p-2.5 border-[#6838ec] focus:ring-[#6838ec] focus:border-[#6838ec] outline-none sm:text-sm"
                            >

                                { users.map(user => (
                                    <option class="px-4 py-3 flex items-center font-medium text-gray-900 whitespace-nowrap" key={ user.id } value={ user.id }>

                                        <img className='rounded-full w-10 h-10 mr-3' src={ picturesUrl + user.profile_pic } alt='' />

                                        { user.fullname + ' ( ' + user.email + ' )' }

                                    </option>
                                )) }

                            </select>
                        </div>

                        <div className="w-full  rounded-lg ">
                            <label htmlFor="select" className="block mb-2 text-sm font-medium text-[#6838ec]">
                                Select a community
                            </label>
                            <select
                                value={ newArticle.community }
                                onChange={ handleInputChange }
                                name='community'
                                id="select"
                                className="w-full bg-gray-50 text-gray-900 text-sm  border rounded-lg p-2.5 border-[#6838ec] focus:ring-[#6838ec] focus:border-[#6838ec] outline-none sm:text-sm"
                            >

                                { communities.map(community => (
                                    <option class="px-4 py-3 flex items-center font-medium text-gray-900 whitespace-nowrap" key={ community.id } value={ community.id }>

                                        <img className='rounded-full w-10 h-10 mr-3' src={ picturesUrl + community.profile_img } alt='' />
                                        { community.community_name }

                                    </option>
                                )) }
                            </select>
                        </div>


                    </div>
                </form>


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

export default ArticleEditDialog;
