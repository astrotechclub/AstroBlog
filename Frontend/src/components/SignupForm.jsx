import React from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import userIcon from '../assets/icons/user.png';
import passwordIcon from '../assets/icons/password.png';
import googleLogo from '../assets/icons/google.png';
import emailIcon from '../assets/icons/email.png';

class SignupForm extends React.Component {
    render() {
        return (
            <div className="px-20 py-5 flex flex-col items-start justify-between">
                <div className='flex flex-row justify-start items-center gap-2 mb-10'>
                    <img src={logo} alt="logo" className='h-8 w-8 invert -rotate-logo' />
                    <span className='font text-lg font-medium text-text font-semibold logo'>Astrotech</span>
                </div>
                <div className='flex flex-col justify-center items-start w-full my-5'>
                    <h1 className='block text-2xl text-black font-bold'>Explore the world through our words</h1>
                    <span className='block font-semibold text-grey mt-4'>Create an account</span>
                    <form action="." method="post" className='my-8 flex flex-col justify-center items-center w-full'>
                        <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between'>
                            <input type="text" name="username" placeholder='username' className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                            <img src={userIcon} alt="user" className='inline h-4 w-4' />
                        </div>
                        <div className='w-3/4 text-xs text-errors mt-1'>
                            This username is already in use!
                        </div>
                        <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mt-4'>
                            <input type="email" name="email" placeholder='email' className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                            <img src={emailIcon} alt="email" className='inline h-4 w-4' />
                        </div>
                        <div className='w-3/4 text-xs text-errors mt-1'>
                            Wrong e-mail address!
                        </div>
                        <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mt-4'>
                            <select name="about" className='inline outline-0 bg-transparent font-text text-sm w-full'>
                                <option value="">Who are you?</option>
                                <option value="esi_studend">ESI student</option>
                                <option value="esi_prof">ESI professor</option>
                                <option value="other_univ">Other univ. student</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className='w-3/4 text-xs text-errors mt-1'>
                            You have to choose!
                        </div>
                        <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mt-4'>
                            <input type="text" name="other" placeholder='Who exactly?' disabled className='inline outline-0 bg-transparent font-text text-sm w-full' />
                        </div>
                        <div className='w-3/4 text-xs text-errors mt-1'>
                            You have to fill this box!
                        </div>
                        <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mt-4'>
                            <input type="password" name="password" placeholder='password' className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                            <img src={passwordIcon} alt="password" className='inline h-4 w-4' />
                        </div>
                        <div className='w-3/4 text-xs text-errors mt-1'>
                            Password must contain at least 8 caracters, 2 digits and 2 special caracters!
                        </div>
                        <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mt-4'>
                            <input type="password" name="password_c" placeholder='password confirmation' className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                            <img src={passwordIcon} alt="password" className='inline h-4 w-4' />
                        </div>
                        <div className='w-3/4 text-xs text-errors mt-1 mb-4'>
                            Password doesn't match!
                        </div>
                        <div className='flex flex-row items-center justify-start gap-2 w-3/4 mb-16'>
                            <input type="checkbox" className='h-3 w-3 text-light-pink' />
                            <label className='text-text font-medium text-xs'>Agree Terms and Conditions and Privacy Statements</label>
                        </div>
                        <button className='w-3/4 text-white rounded-md outline-none border-none bg-gradient-to-r from-light-pink to-dark-pink h-[50px] font-medium text-sm'>Sign up</button>
                        <div className='flex flex-row items-center justify-center gap-4 h-[50px] w-3/4 rounded-md border border-border-grey mt-4 cursor-pointer'>
                            <img src={googleLogo} alt="google" className='h-4 w-4' />
                            <span className='font-medium text-sm text-grey'>Sign up with Google</span>
                        </div>
                    </form>
                </div>
                <div className='flex flex-row items-center justify-center w-full gap-2 mt-10 pb-4'>
                    <span className='text-light-text text-sm'>Already have an account?</span>
                    <Link to="/" className='text-light-pink text-sm pb-[1px] border-b border-light-pink'>Login</Link>
                </div>
            </div>
        );
    }
}

export default SignupForm;