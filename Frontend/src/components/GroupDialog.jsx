import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiLike } from 'react-icons/bi'

const GroupDialog = ({ isOpen, onClose, group }) => {
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
                        <div className='flex flex-col gap-4 justify-center items-center'>
                            <h1 className='text-2xl text-black'>{ group.community_name }</h1>
                            <div className='flex flex-row justify-center items-center rounded-md'>
                                <img className='shadow-2xl  w-auto h-80 rounded-lg' src={ picturesUrl + group.profile_img } alt='' />
                            </div>
                            <div className='flex flex-row justify-start items-center gap-6 w-full'>
                                <div className='flex flex-row justify-start items-center gap-2'>
                                    <h1 className='text-black font-semibold text-lg'>{ group.nb_followers }</h1>
                                    <spane className='capitalize'>followers</spane>
                                </div>
                                <div className='flex flex-row justify-start items-center gap-2'>
                                    <h1 className='text-black font-semibold  text-lg'>{ group.nb_likes }</h1>
                                    <BiLike className='h-5 w-5 text-black' />
                                </div>
                            </div>
                            <div className='flex flex-col w-full justify-start'>
                                <p className='first-letter:capitalize'>
                                    { group.community_description }
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

export default GroupDialog;
