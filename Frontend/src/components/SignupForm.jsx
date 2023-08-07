import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';
import userIcon from '../assets/icons/user.png';
import passwordIcon from '../assets/icons/password.png';
import googleLogo from '../assets/icons/google.png';
import emailIcon from '../assets/icons/email.png';

function SignupForm({ host, blur, setShowConfMessage, setEmail, inputs, setInputs }) {
    const [checkedTerms, setCheckedTerms] = useState(false);
    const [showWhoRU, setShowWhoRU] = useState(false);
    const [errors, setErrors] = useState();
    const url = `${host}/register/validate`;
    const handleSubmit = (event) => {
        setErrors({});
        event.preventDefault();
        axios.post(url, inputs, {
            withCredentials: true,
        }).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
            }
            if (res.status === 200) {
                setShowConfMessage(true);
            }
        }).catch(err => { setErrors(err.response.data); });
    }
    return (
        <div className={`px-20 py-5 flex flex-col items-start justify-between ${blur ? "blur-sm" : null}`} >
            <div className='flex flex-row justify-start items-center gap-2 mb-10'>
                <img src={logo} alt="logo" className='h-8 w-8 invert -rotate-logo' />
                <span className='font text-lg font-medium text-text font-semibold logo'>Astrotech</span>
            </div>
            <div className='flex flex-col justify-center items-start w-full my-5'>
                <h1 className='block text-2xl text-black font-bold'>Explore the world through our words</h1>
                <span className='block font-semibold text-grey mt-4'>Create an account</span>
                <form action="" onSubmit={handleSubmit} className='my-8 flex flex-col justify-center items-center w-full'>
                    <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between'>
                        <input type="text" name="fullname" placeholder='fullname' onChange={(event) => { setInputs({ ...inputs, fullname: event.target.value }) }} className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                        <img src={userIcon} alt="user" className='inline h-4 w-4' />
                    </div>
                    {errors && errors.fullname && <div className='w-3/4 text-xs text-errors mt-1'>
                        {errors.fullname}
                    </div>}
                    <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mt-4'>
                        <input type="email" name="email" placeholder='email' onChange={(event) => { setInputs({ ...inputs, email: event.target.value }); setEmail(event.target.value); }} className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                        <img src={emailIcon} alt="email" className='inline h-4 w-4' />
                    </div>
                    {errors && errors.email && <div className='w-3/4 text-xs text-errors mt-1'>
                        {errors.email}
                    </div>}
                    <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mt-4'>
                        <select name="about" className='inline outline-0 bg-transparent font-text text-sm w-full' onChange={(e) => { setShowWhoRU(e.target.value.startsWith("other")); setInputs({ ...inputs, about: e.target.value }) }}>
                            <option value="">Who are you?</option>
                            <option value="esi_studend">ESI student</option>
                            <option value="esi_prof">ESI professor</option>
                            <option value="other_univ">Other univ. student</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {errors && errors.about && <div className='w-3/4 text-xs text-errors mt-1'>
                        {errors.about}
                    </div>}
                    {showWhoRU ? <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mt-4'>
                        <input type="text" name="other" placeholder='Who exactly?' onChange={(e) => { setInputs({ ...inputs, other: e.target.value }) }} className='inline outline-0 bg-transparent font-text text-sm w-full' />
                    </div> : <></>}
                    {showWhoRU && errors && errors.other && <div className='w-3/4 text-xs text-errors mt-1'>
                        {errors.other}
                    </div>}
                    <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mt-4'>
                        <input type="password" name="password" placeholder='password' onChange={(e) => { setInputs({ ...inputs, password: e.target.value }) }} className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                        <img src={passwordIcon} alt="password" className='inline h-4 w-4' />
                    </div>
                    {errors && errors.password && <div className='w-3/4 text-xs text-errors mt-1'>
                        {errors.password}
                    </div>}
                    <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mt-4'>
                        <input type="password" name="password_c" placeholder='password confirmation' onChange={(e) => { setInputs({ ...inputs, password_c: e.target.value }) }} className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                        <img src={passwordIcon} alt="password" className='inline h-4 w-4' />
                    </div>
                    {errors && errors.password_c && <div className='w-3/4 text-xs text-errors mt-1 mb-4'>
                        {errors.password_c}
                    </div>}
                    <div className='mt-4 flex flex-row items-center justify-start gap-2 w-3/4 mb-16'>
                        <input type="checkbox" onChange={(e) => { setCheckedTerms(!checkedTerms) }} className='h-3 w-3 text-light-pink' />
                        <label className='text-text font-medium text-xs'>Agree Terms and Conditions and Privacy Statements</label>
                    </div>
                    {checkedTerms ?
                        <button className='w-3/4 text-white rounded-md outline-none border-none bg-gradient-to-r from-light-pink to-dark-pink h-[50px] font-medium text-sm'>Sign up</button>
                        : <button className='w-3/4 text-white rounded-md outline-none border-none bg-grey h-[50px] font-medium text-sm' disabled>Sign up</button>
                    }
                    <div className='flex flex-row items-center justify-center gap-4 h-[50px] w-3/4 rounded-md border border-border-grey mt-4 cursor-pointer'>
                        <img src={googleLogo} alt="google" className='h-4 w-4' />
                        <span className='font-medium text-sm text-grey'>Sign up with Google</span>
                    </div>
                </form>
            </div>
            <div className='flex flex-row items-center justify-center w-full gap-2 mt-10 pb-4'>
                <span className='text-light-text text-sm'>Already have an account?</span>
                <Link to="/login" className='text-light-pink text-sm pb-[1px] border-b border-light-pink'>Login</Link>
            </div>
        </div>
    );
}

export default SignupForm;