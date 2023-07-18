import React from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import userIcon from '../assets/icons/user.png';
import passwordIcon from '../assets/icons/password.png';
import googleLogo from '../assets/icons/google.png';

class LoginForm extends React.Component {
    render() {
        return (
            <div className="px-20 py-5 flex flex-col items-start justify-between">
                <div className='flex flex-row justify-start items-center gap-2 mb-10'>
                    <img src={logo} alt="logo" className='h-8 w-8 invert -rotate-logo' />
                    <span className='font text-lg font-medium text-text font-semibold logo'>Astrotech</span>
                </div>
                <div className='flex flex-col justify-center items-start w-full my-5'>
                    <h1 className='block text-2xl text-black font-bold'>Explore the world through our words</h1>
                    <span className='block font-semibold text-grey mt-4'>Login to your account</span>
                    <form action="." method="post" className='my-8 flex flex-col justify-center items-center w-full'>
                        <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mb-4'>
                            <input type="text" name="username" placeholder='username or email' className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                            <img src={userIcon} alt="user" className='inline h-4 w-4' />
                        </div>
                        <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mb-1'>
                            <input type="password" name="password" placeholder='password' className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                            <img src={passwordIcon} alt="password" className='inline h-4 w-4' />
                        </div>
                        <div className='w-3/4 text-xs text-errors mb-4'>
                            Password or username is wrong!
                        </div>
                        <div className='flex flex-row items-center justify-between w-3/4 mb-16'>
                            <div className='flex flex-row items-center justify-start gap-2'>
                                <input type="checkbox" className='h-3 w-3 text-light-pink' />
                                <label className='text-text font-medium text-xs'>Remember Me</label>
                            </div>
                            <a href="." className='decoration-none text-light-pink text-xs'>Forget your password?</a>
                        </div>
                        <button className='w-3/4 text-white rounded-md outline-none border-none bg-gradient-to-r from-light-pink to-dark-pink h-[50px] font-medium text-sm'>Login</button>
                        <div className='flex flex-row items-center justify-center gap-4 h-[50px] w-3/4 rounded-md border border-border-grey mt-4 cursor-pointer'>
                            <img src={googleLogo} alt="google" className='h-4 w-4' />
                            <span className='font-medium text-sm text-grey'>Sign in with Google</span>
                        </div>
                    </form>
                </div>
                <div className='flex flex-row items-center justify-center w-full gap-2 pb-4'>
                    <span className='text-light-text text-sm'>Don’t have an account yet?</span>
                    <Link to="/signup" className='text-light-pink text-sm pb-[1px] border-b border-light-pink'>Sign up</Link>
                </div>
            </div>
        );
    }
}

export default LoginForm;