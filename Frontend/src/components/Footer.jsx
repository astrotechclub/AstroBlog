
import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import esiLogo from "../assets/icons/esi.png";
import moonBg from "../assets/images/moon.jpg";

function Footer() {


    const [screenSize, setScreenSize] = useState('');

    const handleResize = () => {
        const width = window.innerWidth;
        if (width >= 1024) {
            setScreenSize('large');
        } else if (width >= 768) {
            setScreenSize('medium');
        } else {
            setScreenSize('small');
        }
    };

    useEffect(() => {

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);




    return (
        <div id="footer" className=" pt-24 relative px-8 md:px-14 xl:px-96" >
            { screenSize === 'large' && <div className="footer-bg ">
            </div> }
            <div>

                <div className='hidden lg:block'>
                    <div className="flex flex-col items-center justify-center mb-4">
                        <img src={ logo } alt="logo" className="h-12 object-cover -rotate-logo" />
                        <span className="text-card-title text-white font-bold logo">Astrotech</span>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-8 ">
                        <p className="text-white text-center  text-mini-text lg:text-justify">
                            Astrotech" is the astronomy club of the National School of Computer Science (ESI ex INI).
                            Astrotech aims to carry out student projects dedicated to learning the deepest secrets of the vast universe in which we live; this is in order to create a community of computer scientists passionate about astronomy and space.
                        </p>
                        { screenSize === 'large' && <div className="p-2 bg-white rounded-md "><img src={ esiLogo } alt="esi" className="object-contain" /></div> }
                    </div>
                </div>

                <div className='footer-bg-sm lg:hidden'>
                    <div className="flex flex-col items-center justify-center mb-4">
                        <img src={ logo } alt="logo" className="h-12 object-cover -rotate-logo" />
                        <span className="text-card-title text-white font-bold logo">Astrotech</span>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-8 ">
                        <p className="text-white text-center  text-mini-text lg:text-justify">
                            Astrotech" is the astronomy club of the National School of Computer Science (ESI ex INI).
                            Astrotech aims to carry out student projects dedicated to learning the deepest secrets of the vast universe in which we live; this is in order to create a community of computer scientists passionate about astronomy and space.
                        </p>
                        { screenSize === 'large' && <div className="p-2 bg-white rounded-md "><img src={ esiLogo } alt="esi" className="object-contain" /></div> }
                    </div>
                </div>
                { screenSize === 'large' && <div className="flex flex-row items-start justify-between gap-10 mb-8">
                    <div>
                        <span className="block text-white font-semibold text-small-subtitle mb-2">Socials</span>
                        <a href="" className="block text-description text-small-subtitle">Facebook</a>
                        <a href="" className="block text-description text-small-subtitle">Instagram</a>
                        <a href="" className="block text-description text-small-subtitle">Linked in</a>
                    </div>
                    <div>
                        <span className="block text-white font-semibold text-small-subtitle mb-2">Location</span>
                        <p className="block text-description text-small-subtitle">École Nationale Supérieure d’Informatique, BP 68M, 16270, Oued Smar, Algérie</p>
                    </div>
                    <div>
                        <form action="" method="post">
                            <textarea name="message" cols="30" rows="10" placeholder="Write something to us ..." className="resize-none bg-textarea border-2 border-white rounded-md outline-none p-2 h-20 text-mini-text mb-2 w-full text-white"></textarea>
                            <input type="submit" value="send to astrotech@esi.dz" className="bg-light-pink p-2 rounded-md w-full text-small-subtitle cursor-pointer text-white" />
                        </form>
                    </div>
                </div> }



                { (screenSize == 'small' || screenSize == 'medium') &&
                    <div className="flex flex-col items-center justify-between gap-10 mt-80 mb-4 w-full">
                        <div className="flex flex-row items-start justify-between gap-10 mb-8">
                            <div className='hidden md:block'>
                                <span className="block text-white font-semibold text-small-subtitle mb-2">Socials</span>
                                <a href="" className="block text-description text-small-subtitle">Facebook</a>
                                <a href="" className="block text-description text-small-subtitle">Instagram</a>
                                <a href="" className="block text-description text-small-subtitle">Linked in</a>
                            </div>

                            <div>
                                <span className="block text-white font-semibold text-small-subtitle mb-2">Location</span>
                                <p className="block text-description text-small-subtitle">École Nationale Supérieure d’Informatique, BP 68M, 16270, Oued Smar, Algérie</p>
                            </div>
                            <div className="p-2 bg-white rounded-md sm:w-2/6 md:w-1/6"><img src={ esiLogo } alt="esi" className="object-contain" /></div>


                        </div>
                        <div className="flex flex-row items-start justify-between gap-10 sm:mb-4 md:mb-8 w-full">

                            <form action="" method="post" className='flex flex-col w-full gap-4'>
                                <textarea name="message" cols="30" rows="15" placeholder="Write something to us ..." className="resize-none bg-textarea border-2 border-white rounded-md outline-none p-2 h-20 text-mini-text mb-2 w-full text-white"></textarea>
                                <input type="submit" value="send to astrotech@esi.dz" className="bg-light-pink p-2 rounded-md w-full text-small-subtitle cursor-pointer text-white" />
                            </form>

                        </div>
                        <div className='md:hidden sm:flex flex-row items-center justify-between mb-8 w-full'>
                            <a href="" className=" text-description text-small-subtitle">Facebook</a>
                            <a href="" className="text-description text-small-subtitle">Instagram</a>
                            <a href="" className=" text-description text-small-subtitle">Linked in</a>
                        </div>
                    </div>
                }


                <div className="w-full text-center pb-4 font-semibold text-white">
                    Made by the artists of Astrotech ✨
                </div>
            </div>
        </div>
    );
}

export default Footer;