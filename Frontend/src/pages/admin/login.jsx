import React from 'react'
import logo from '../../assets/logo.svg';

const LoginAdmin = () => {

    return (
        <div className='bg-[#eef1f8] h-full w-full flex justify-center items-center'>
            <div className='bg-[#7e4efc]  custom-shadow rounded-3xl w-5/12 h-5/6 flex justify-center items-center' >
                <div className='w-1/2 h-5/6 flex flex-col justify-start items-center gap-24'>
                    <div className='px-12 md:px-20 flex flex-row justify-start items-center gap-2 mb-10'>
                        <img src={ logo } alt="logo" className='h-12 w-12  -rotate-logo' />
                        <span className='font text-2xl  text-white font-semibold logo'>Astrotech</span>
                    </div>
                    <div className='h-full flex flex-col items-center justify-evenly w-full'>
                        <div className='text-white text-xl font-bold'>
                            Sign in
                        </div>
                        <div className='w-full'>
                            <form className='w-full'>
                                <div class="flex flex-col justify-center items-center gap-4 w-full">
                                    <div className='w-full'>
                                        <label for="first_name" class="block mb-2 text-sm font-medium text-white dark:text-white">Email</label>
                                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                    </div>
                                    <div className='w-full'>
                                        <label for="last_name" class="text-white block mb-2 text-sm font-medium  dark:text-white">Password</label>
                                        <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                                    </div>
                                    <button type="submit" class="mt-8 w-full shadow-2xl text-white bg-[#6838ec]   focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin