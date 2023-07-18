import React from 'react';
import '../styles/pages/index.css';
import MoonScene from '../components/MoonScene';
import SignupForm from '../components/SignupForm';

class Signup extends React.Component {
  render() {
    return (
      <div className='page-container login grid grid-cols-2 grid-rows-1 place-items-stretch overflow-x-hidden font-text'>
        <SignupForm />
        <div className="h-full w-1/2 flex flex-col justify-center items-center bg-black p-5 bg-signIllustration fixed right-0">
          <div id="illustration" className='flex flex-col justify-center items-center w-1/2 h-full absolute z-10'>
            <MoonScene />
          </div>
          <div id='spans'>
            <span className='text-5xl font-bold block'>ASTRO</span>
            <span className='text-5xl font-bold block'>ASTRO</span>
            <span className='text-5xl font-bold block'>ASTRO</span>
            <span className='text-5xl font-bold block'>ASTRO</span>
            <span className='text-5xl font-bold block'>ASTRO</span>
          </div>
          <div className='text-semibold text-white absolute bottom-6 right-10'>
            Made by Astrotech ESI club
          </div>
        </div >
      </div >
    );
  }
}

export default Signup;
