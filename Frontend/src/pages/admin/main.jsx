import React, { useState, useEffect } from 'react'
import logo from '../../assets/logo.svg';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { VscAccount } from 'react-icons/vsc'
import { PiArticleMediumBold } from 'react-icons/pi'
import { BiCommentDetail } from 'react-icons/bi'
import ArticlesManagement from '../../components/ArticlesManagement';
import AccountsManagement from '../../components/AccountsManagement';
import CommentsManagement from '../../components/CommentsManagement';
import { IoStatsChartOutline } from 'react-icons/io5'
import { VscTable } from 'react-icons/vsc'
import { HiUserGroup } from 'react-icons/hi'
import AccountsStatistics from '../../components/AccountsStatistics';
import ArticlesStatistics from '../../components/ArticlesStatistics';
import CommentsStatistics from '../../components/CommentsStatistics';
import CommunityManagement from '../../components/CommunityManagement';
import CommunityStatistics from '../../components/CommunityStatistics';
import { RiLogoutCircleRLine } from 'react-icons/ri'


const MainAdmin = () => {

    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;
    const maxArticlesPerPage = 3;
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('accounts');
    const [statsOrData, setStatsOrData] = useState('data');
    const controls = useAnimation();
    const [profile, setProfile] = useState({})
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = async () => {
        const res = await fetch(`${host}/logout`, { credentials: "include" });
        if (res.status == 401 || res.status == 403) navigate("/login");
        if (res.status == 404) navigate("/E404");
        if (res.status === 200) {
            navigate("/login");
        }
    };


    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setStatsOrData('data');
    };

    const handleStatsOrData = (statsOrData) => {
        setStatsOrData(statsOrData);
        controls.start({ scaleX: statsOrData === 'stats' ? 0 : 1 });
    };


    useEffect(() => {
        const fetchProfile = (async () => {
            var result = await fetch(`${host}/user/mine`, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                result = await fetch(`${host}/refresh`, { credentials: "include" });
                if (result.status === 401 || result.status === 403) {
                    navigate("/login");
                } else {
                    result = await fetch(`${host}/user/mine`, { credentials: "include" });
                    if (result.status !== 200) navigate("/login");
                }
            }
            if (result.status == 404) navigate("/E404");
            if (result.status === 200) result.json().then(data => {
                setProfile(data);
                document.title = profile?.fullname ? profile.fullname : "Astroblog";
            });
        });
        fetchProfile();
        console.log(profile)
    }, []);





    return (
        <div>
            <div className='grid grid-cols-5 grid-rows-1 h-[100vh]'>
                <div className='bg-[#eef1f8]'>

                    <div className='w-full h-full  relative'>
                        <div className='bg-[#7e4efc] col-span-1 h-full flex flex-col justify-between items-center rounded-r-3xl drop-shadow-2xl gap-36'>
                            <div className='flex flex-col justify-start p-8 items-center h-full  gap-36'>
                                <motion.div
                                    initial={ { opacity: 0, y: -20 } }
                                    animate={ { opacity: 1, y: 0 } }
                                    exit={ { opacity: 0, x: 20 } }
                                    transition={ { duration: 0.5 } }
                                >
                                    <div className=' bg-none   shadow-2xl flex flex-row justify-start items-center gap-2 mb-10 px-4 mt-6 rounded-3xl'>
                                        <img src={ logo } alt="logo" className='h-12 w-12  -rotate-logo' />
                                        <span className='font text-2xl text-white  font-semibold logo'>Astrotech</span>
                                    </div>
                                </motion.div>

                                <div className='bg-[#6838ec] rounded-xl shadow-2xl flex flex-col justify-center items-start  '>

                                    <div onClick={ () => handleTabClick('accounts') } className={ `w-full px-6 py-4 hover:text-black  flex flex-row items-center gap-4 hover:cursor-pointer hover:bg-white hover:shadow-2xl hover:rounded-xl transform transition-transform hover:scale-110  ${activeTab == 'accounts' ? 'scale-110 shadow-2xl rounded-xl bg-white text-black' : 'rounded-t-xl text-white'} ` }>
                                        <VscAccount className=' h-6 w-6 ' />
                                        <a className=' font-medium text-base' href='#accounts' >Accounts management</a>
                                    </div>


                                    <hr className='w-full text-white' />


                                    <div onClick={ () => handleTabClick('groups') } className={ `w-full px-6 py-4 hover:text-black flex flex-row items-center gap-4 hover:cursor-pointer hover:bg-white hover:shadow-2xl hover:rounded-xl  transform transition-transform hover:scale-110 ${activeTab === 'groups' ? 'scale-110 rounded-xl shadow-2xl bg-white text-black' : 'text-white'}` } >
                                        <HiUserGroup className=' h-6 w-6 ' />
                                        <a className=' font-medium text-base' href='#groups' >Groups management</a>
                                    </div>

                                    <hr className='w-full text-white' />


                                    <div onClick={ () => handleTabClick('articles') } className={ `w-full px-6 py-4 hover:text-black flex flex-row items-center gap-4 hover:cursor-pointer hover:bg-white hover:shadow-2xl hover:rounded-xl  transform transition-transform hover:scale-110 ${activeTab === 'articles' ? 'scale-110 rounded-xl shadow-2xl bg-white text-black' : 'text-white'}` } >
                                        <PiArticleMediumBold className=' h-6 w-6 ' />
                                        <a className=' font-medium text-base' href='#articles' >Articles management</a>
                                    </div>

                                    <hr className='w-full  text-white' />


                                    <div onClick={ () => handleTabClick('comments') } className={ `w-full px-6 py-4 hover:text-black  flex flex-row items-center gap-4 hover:cursor-pointer hover:bg-white hover:shadow-2xl hover:rounded-xl transform transition-transform hover:scale-110  ${activeTab == 'comments' ? 'scale-110 shadow-2xl rounded-xl bg-white text-black' : 'rounded-b-xl text-white'} ` }>
                                        <BiCommentDetail className=' h-6 w-6 ' />
                                        <a className='font-medium text-base' href='#comments' >Comments management</a>
                                    </div>


                                </div>
                            </div>
                            <div className='p-2 flex flex-row justify-center w-full text-white shadow-2xl capitalize font-logo'>
                                <h1>Made by the artists of Astrotech</h1>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='bg-[#eef1f8] col-span-4 h-full grid grid-cols-1 custom-grid-9'>
                    <div className='px-10 bg-[#f1f5f8] shadow-2xl row-span-1 grid grid-cols-10 justify-center  items-center gap-8'>
                        <div className='col-span-4 flex flex-row   m-1 bg-[#6838ec] rounded-2xl shadow-xl p-1'>


                            <div onClick={ () => handleStatsOrData('data') } className={ ` hover:cursor-pointer    transform transition-transform   col-span-2 w-full  rounded-xl flex flex-row items-center justify-center gap-4 p-2 ${statsOrData === 'stats' ? ' text-white ' : ' text-black bg-white '}` }>
                                <VscTable className={ ` h-6 w-6` } />
                                <a className={ ` text-lg ` } href='#data' > Data tables </a>
                            </div>


                            <div onClick={ () => handleStatsOrData('stats') } className={ ` hover:cursor-pointer   transform transition-transform  col-span-2 w-full rounded-xl flex flex-row items-center justify-center gap-4 p-2 ${statsOrData === 'data' ? ' text-white ' : 'text-black bg-white '}` }>
                                <IoStatsChartOutline className={ ` h-6 w-6 }` } />
                                <a className={ ` text-lg ` } href='#stats' >Statistics</a>
                            </div>
                        </div>
                        <div className='col-span-4 h-full'></div>
                        <div className='col-span-1 flex justify-center items-center w-full h-full '>
                            <label class='switch'>
                                <input type='checkbox' />
                                <span class='slider rounded' />
                            </label>
                        </div>
                        <div className='col-span-1 h-full flex flex-col gap-4 justify-center items-center relative'>
                            <img
                                className='h-12 w-12 shadow-xl rounded-full cursor-pointer'
                                src={ picturesUrl + profile.img }
                                alt='Profile'
                                onClick={ toggleDropdown }
                            />

                            { showDropdown && (
                                <div onClick={ handleLogout } className='hover:bg-gray-100 hover:cursor-pointer absolute top-14 right-0 mt-1 bg-white border rounded-lg shadow-lg px-2.5 py-1 border-[#7e4efc]'>
                                    <div className='flex flex-row justify-between gap-4 items-center'>
                                        
                                        <button
                                            className='block w-full text-left   text-gray-800 '
                                            onClick={ handleLogout }
                                        >
                                            Logout
                                        </button>
                                        <RiLogoutCircleRLine className='w-8 h-8'/>
                                    </div>
                                </div>
                            ) }
                        </div>
                    </div>

                    <div className='rows-cols-8 w-full h-[85vh] overflow-y-scroll'>

                        { activeTab === 'accounts' && statsOrData === 'data' && <AccountsManagement /> }
                        { activeTab === 'accounts' && statsOrData === 'stats' && <AccountsStatistics /> }
                        { activeTab === 'groups' && statsOrData === 'data' && <CommunityManagement /> }
                        { activeTab === 'groups' && statsOrData === 'stats' && <CommunityStatistics /> }
                        { activeTab === 'articles' && statsOrData === 'data' && <ArticlesManagement /> }
                        { activeTab === 'articles' && statsOrData === 'stats' && <ArticlesStatistics /> }
                        { activeTab === 'comments' && statsOrData === 'data' && <CommentsManagement /> }
                        { activeTab === 'comments' && statsOrData === 'stats' && <CommentsStatistics /> }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default MainAdmin