import React from 'react';
import '../styles/pages/index.css';
import MoonScene from '../components/MoonScene';
import LoginForm from '../components/LoginForm';

class Login extends React.Component {
  render() {
    return (
      <div className='page-container login grid grid-cols-2 grid-rows-1 place-items-stretch overflow-x-hidden font-text'>
        <div className="h-full w-1/2 flex flex-col justify-center items-center bg-black p-5 bg-signIllustration fixed left-0">
          <div id="illustration" className='flex flex-col justify-center items-center w-1/2 h-full absolute z-10 '>
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
        <div className='w-1/2 fixed right-0 top-0'>
          <LoginForm />
        </div>
      </div >
    );
  }
}

export default Login;
