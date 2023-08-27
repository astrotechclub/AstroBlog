import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiLike, BiDislike, BiCommentDetail } from 'react-icons/bi'
import { IoCalendarOutline } from 'react-icons/io5'

const ArticleDialog = ({ isOpen, onClose, article }) => {
    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;
    return (
        <AnimatePresence>
            { isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center backdrop-opacity-75 backdrop-filter backdrop-blur-3xl"
                    initial={ { opacity: 0 } }
                    animate={ { opacity: 1 } }
                    exit={ { opacity: 0 } }
                    transition={ { duration: 0.3 } }
                >
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-md"
                        initial={ { y: "-50%", opacity: 0 } }
                        animate={ { y: 0, opacity: 1 } }
                        exit={ { y: "-50%", opacity: 0 } }
                        transition={ { duration: 0.3 } }
                    >
                        <div className='flex flex-col gap-4 justify-center items-center overflow-y-auto'>
                            <h1 className='text-2xl text-black'>{ article.title }</h1>
                            <div className='flex flex-row justify-center items-center rounded-md'>
                                <img className='shadow-2xl  w-auto h-80 rounded-lg' src={ picturesUrl+article.article_img } alt='' />
                            </div>
                            <div className='flex flex-row justify-between items-center gap-6 w-full'>
                                <div className='flex flex-row justify-start items-center w-full gap-6'>
                                    <div className='flex flex-row justify-start items-center gap-2'>
                                        <h1 className='text-black font-semibold text-lg'>{ article.nb_likes }</h1>
                                        <BiLike className='h-5 w-5 text-black' />
                                    </div>
                                    <div className='flex flex-row justify-start items-center gap-2'>
                                        <h1 className='text-black font-semibold  text-lg'>{ article.nb_dislikes }</h1>
                                        <BiDislike className='h-5 w-5 text-black' />
                                    </div>
                                    <div className='flex flex-row justify-start items-center gap-2'>
                                        <h1 className='text-black font-semibold  text-lg'>{ article.nb_comments }</h1>
                                        <BiCommentDetail className='h-5 w-5 text-black' />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-end items-center w-full'>

                                    <div className='flex flex-row justify-center items-center gap-2'>
                                        <IoCalendarOutline className='h-5 w-5 text-black' />
                                        <div className='flex flex-row justify-between items-center'>
                                            <h1 className=''>{ article.date_time.substring(0, 10) }</h1>
                                            <h1 className=''>{ article.date_time.substring(11, 19) }</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row justify-between items-center w-full '>
                                <div className='py-3 flex flex-row justify-start items-center'>
                                    <img className='rounded-full w-10 h-10 mr-3' src={ picturesUrl + article.profile_pic } alt='' />
                                    {article.email}
                                </div>
                                <div className='py-3 flex flex-row justify-start items-center'>
                                    <img className='rounded-full w-10 h-10 mr-3' src={picturesUrl +  article.community_pic } alt='' />
                                    {article.community_name}
                                </div>  
                            </div>
                            <div className='bg-gray-200 shadow-lg w-full h-px rounded-full'/>
                            <div className='flex flex-col w-full justify-start'>
                                <p className='first-letter:capitalize font-semibold text-lg'>
                                    { article.article_description }
                                </p>
                            </div>
                            <div className='flex flex-col w-full justify-start'>
                                <p className='first-letter:capitalize'>
                                    { article.content}
                                </p>
                            </div>
                        </div>

                        <button
                            className="mt-8 bg-[#7e4efc] text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={ onClose }
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            ) }
        </AnimatePresence>
    );
};

export default ArticleDialog;
