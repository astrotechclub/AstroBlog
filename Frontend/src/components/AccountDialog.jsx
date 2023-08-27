import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiLike } from 'react-icons/bi'

const AccountDialog = ({ isOpen, onClose, user }) => {
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
                        <div className='flex flex-row justify-between items-center gap-8 rounded-md mb-10'>
                            <img className='w-auto h-36' src={ picturesUrl + user.profile_pic } alt='' />
                            <div className='flex flex-col  gap-2'>
                                <h2 className="text-xl font-bold capitalize">{ user.fullname }</h2>
                                <td class="">{ user.email }</td>
                                <div className='flex flex-row justify-between items-center gap-4'>
                                    <h1 class="flex flex-row gap-2">
                                        <div className='font-semibold text-black'>{ user.nb_publications }</div>
                                        <span className='capitalize'>publication</span>
                                    </h1>
                                    <h1 class="flex flex-row gap-2">
                                        <div className='font-semibold text-black'>{ user.nb_likes }</div>
                                        <BiLike className='h-5 w-5 text-black' />
                                    </h1>
                                </div>
                            </div>

                        </div>
                        <div className='bg-gray-200 shadow-lg w-full h-px rounded-full mb-6' />
                        <div className='flex flex-col justify-start gap-2'>
                            <h1 className='font-semibold text-base capitalize'>{ user.category }</h1>
                            <h1 className='font-semibold text-base capitalize'>{ user.bio }</h1>
                            <p className='capitalize'>{ user.details }</p>
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

export default AccountDialog;
