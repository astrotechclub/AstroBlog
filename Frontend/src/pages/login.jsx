import React from 'react';
import '../styles/pages/index.css';
import MoonScene from '../components/MoonScene';
import LoginForm from '../components/LoginForm';

function Login() {
  const host = "http://localhost:5000";
  return (
    <div className='page-container login grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 place-items-stretch overflow-x-hidden font-text'>
      <div className="h-full hidden w-full lg:w-1/2 lg:flex flex-col justify-center items-center bg-black p-5 bg-signIllustration fixed left-0">
        <div id="illustration" className='hidden xl:flex flex-col justify-center items-center w-1/2 h-full absolute z-10 '>
          <MoonScene />
        </div>
        <div id='spans'>
          <span className='text-5xl font-bold block'>ASTRO</span>
          <span className='text-5xl font-bold block'>ASTRO</span>
          <span className='text-5xl font-bold block'>ASTRO</span>
          <span className='text-5xl font-bold block'>ASTRO</span>
          <span className='text-5xl font-bold block'>ASTRO</span>
        </div>
        <div className='text-semibold text-white absolute bottom-6 left-5'>
          Made by Astrotech ESI club
        </div>
      </div >
      <div className='w-full lg:w-1/2 fixed right-0 top-0 overflow-y-auto h-full'>
        <LoginForm host={host} />
      </div>
    </div >
  );
}

export default Login;
