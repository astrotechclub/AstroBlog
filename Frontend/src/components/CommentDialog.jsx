import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCalendarOutline } from 'react-icons/io5'


const CommentDialog = ({ isOpen, onClose, comment }) => {
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
                        <div className='flex flex-col gap-8 justify-center items-center overflow-y-auto'>
                            <h1 className='text-2xl text-black'>{ comment.title }</h1>
                            <div className='flex flex-row justify-center items-center rounded-md'>
                                <img className='shadow-2xl  w-auto h-80 rounded-lg' src={ picturesUrl + comment.article_img } alt='' />
                            </div>
                            <div className='bg-gray-400 shadow-lg w-full h-px  rounded-full' />
                            <div className='w-full flex flex-col justify-start items-start gap-6'>
                                <div className='flex flex-row justify-between items-center w-full'>
                                    <div className='flex flex-row justify-start items-center'>
                                        <img className='rounded-full w-10 h-10 mr-3' src={ picturesUrl + comment.profile_pic } alt='' />
                                        { comment.email }
                                    </div>
                                    <div className='flex flex-row justify-end items-center'>
                                        <div className='flex flex-row justify-between gap-2 items-center'>
                                            <IoCalendarOutline className='h-5 w-5 text-black' />
                                            <h1 className=''>{ comment.date_time.substring(0, 10) }</h1>
                                            <h1 className=''>{ comment.date_time.substring(11, 19) }</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <p className='ml-10 first-letter:capitalize rounded-lg border-2 border-gray-400  p-4'>
                                        { comment.comment_text }
                                    </p>
                                </div>

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

export default CommentDialog;
