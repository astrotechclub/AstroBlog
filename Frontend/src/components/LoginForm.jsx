import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from '../assets/logo.svg';
import userIcon from '../assets/icons/user.png';
import passwordIcon from '../assets/icons/password.png';
import googleLogo from '../assets/icons/google.png';

function LoginForm({ host }) {
    const [inputs, setInputs] = useState();
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const url = `${host}/login`;

    const handleSubmit = (event) => {
        setErrors(null);
        event.preventDefault();
        axios.post(url, inputs, {
            withCredentials: true,
        }).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
            }
            if (res.status === 200) {
                if (res.data.is_admin == 0) {
                    navigate("/home");
                }
                else{
                    navigate('/admin/main')
                }
            }
        }).catch(err => { setErrors(err.response.data); });
    }
    return (
        <div className="md:px-20 py-10 lg:px-0 xl:px-20 flex flex-col items-start justify-between">
            <div className='px-12 md:px-20 flex flex-row justify-start items-center gap-2 mb-10'>
                <img src={ logo } alt="logo" className='h-8 w-8 invert -rotate-logo' />
                <span className='font text-lg  text-text font-semibold logo'>Astrotech</span>
            </div>
            <div className='flex flex-col justify-center items-start w-full my-5'>
                <h1 className='px-12 md:px-20 block text-lg md:text-2xl text-black font-bold'>Explore the world through our words</h1>
                <span className='px-12 md:px-20 block font-semibold text-grey mt-4'>Login to your account</span>
                <form action="" onSubmit={ handleSubmit } className='my-8 flex flex-col justify-center items-center w-full'>
                    <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mb-4'>
                        <input type="text" maxLength="35" name="email" placeholder='email' onChange={ (e) => { setInputs({ ...inputs, email: e.target.value }) } } className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                        <img src={ userIcon } alt="user" className='inline h-4 w-4' />
                    </div>
                    <div className='p-4 border border-boder-grey rounded-md bg-input-light-grey w-3/4 flex flex-row items-center justify-between mb-1'>
                        <input type="password" maxLength="30" name="password" placeholder='password' onChange={ (e) => { setInputs({ ...inputs, password: e.target.value }) } } className='inline outline-0 bg-transparent font-text text-sm w-5/6' />
                        <img src={ passwordIcon } alt="password" className='inline h-4 w-4' />
                    </div>
                    { errors && <div className='w-3/4 text-xs text-errors mb-4'>
                        { errors }
                    </div> }
                    {/* <div className='flex flex-row items-center justify-between w-3/4'>
                        <div className='flex flex-row items-center justify-start gap-2'>
                            <input type="checkbox" onChange={(e) => { setInputs({ ...inputs, remember: e.target.value }) }} className='h-3 w-3 text-light-pink' />
                            <label className='text-text font-medium text-xs'>Remember Me</label>
                        </div>
                        <a href="." className='decoration-none text-light-pink text-xs'>Forget your password?</a>
                    </div> */}
                    <button className='mt-16 w-3/4 text-white rounded-md outline-none border-none bg-gradient-to-r from-light-pink to-dark-pink h-[50px] font-medium text-sm'>Login</button>
                    {/* <div className='flex flex-row items-center justify-center gap-4 h-[50px] w-3/4 rounded-md border border-border-grey mt-4 cursor-pointer'>
                        <img src={googleLogo} alt="google" className='h-4 w-4' />
                        <span className='font-medium text-sm text-grey'>Sign in with Google</span>
                    </div> */}
                </form>
            </div>
            <div className='flex flex-row items-center justify-center w-full gap-2 pb-4'>
                <span className='text-light-text text-sm'>Don’t have an account yet?</span>
                <Link to="/register" className='text-light-pink text-sm pb-[1px] border-b border-light-pink'>Sign up</Link>
            </div>
        </div>
    );
}

export default LoginForm;