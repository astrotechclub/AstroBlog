import React, { useState } from 'react';
import '../styles/pages/index.css';
import MoonScene from '../components/MoonScene';
import SignupForm from '../components/SignupForm';
import SendCode from '../components/SendCode';

function Signup() {
  const host = "http://localhost:5000";
  const [showConfMessage, setShowConfMessage] = useState(false);
  const [email, setEmail] = useState();
  const [inputs, setInputs] = useState();
  return (
    <div className='page-container login grid grid-cols-2 grid-rows-1 place-items-stretch overflow-x-hidden font-text relative'>
      {showConfMessage ? <SendCode email={email} inputs={inputs} host={host} /> : null}
      <SignupForm host={host} blur={showConfMessage} setShowConfMessage={setShowConfMessage} setEmail={setEmail} inputs={inputs} setInputs={setInputs} />
      <div className={`h-full w-1/2 flex flex-col justify-center items-center bg-black p-5 bg-signIllustration fixed right-0 ${showConfMessage ? "blur-sm" : null}`}>
        <div id="illustration" className='flex flex-col justify-center items-center w-1/2 h-full absolute z-10'>
          {/* <MoonScene /> */}
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

export default Signup;
