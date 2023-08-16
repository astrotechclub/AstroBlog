
import React, { useState, useRef, useEffect } from 'react';
import logo from "../assets/logo.svg";
import esiLogo from "../assets/icons/esi.png";
import moonBg from "../assets/images/moon.jpg";
import emailjs from '@emailjs/browser';

function Footer({ profile }) {
    console.log(profile);
    const [message, setMessage] = useState();
    const email = profile.email;
    const form = useRef();
    const sendEmail = (e) => {
        console.log(email);
        e.preventDefault();
        //k6_TeWWtLOqIFoB7v
        emailjs.sendForm('service_wg3dy3t', 'template_6zpv402', form.current, 'k6_TeWWtLOqIFoB7v')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

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
        <div id="footer" className="pt-24 relative flex justify-center items-center">
            <div id="footer-bg">
            </div>
            <div id="footer-content" className={`${screenSize === 'large' ? "w-1/2 max-w-[1000px]" : screenSize === "medium" ? "w-full px-32" : "w-full px-10"}`}>
                <div className="flex flex-col items-center justify-center mb-4">
                    <img src={logo} alt="logo" className="h-12 object-cover -rotate-logo" />
                    <span className="text-card-title text-white font-bold">Astrotech</span>
                </div>
                <div className="flex flex-row items-center justify-between gap-10 mb-8">
                    <p className="text-white text-mini-text text-justify">
                        Astrotech is the astronomy club of the National School of Computer Science (ESI ex INI).
                        Astrotech aims to carry out student projects dedicated to learning the deepest secrets of the vast universe in which we live; this is in order to create a community of computer scientists passionate about astronomy and space.
                    </p>
                    <div className="p-2 bg-white rounded-md"><img src={esiLogo} alt="esi" className={`object-cover ${screenSize === "small" ? "w-80" : "w-40"}`} /></div>
                </div>
                <div className={`${screenSize === "small" ? "grid grid-cols-2" : "flex flex-row items-start justify-between"} gap-10 mb-8`}>
                    <div>
                        <span className="block text-white font-semibold text-small-subtitle mb-2">Socials</span>
                        <a href="https://web.facebook.com/people/Astrotech-ESI/100088700419699/?_rdc=1&_rdr" className="block text-description text-small-subtitle">Facebook</a>
                        <a href="https://www.instagram.com/astrotech_esi/" className="block text-description text-small-subtitle">Instagram</a>
                        <a href="https://www.linkedin.com/company/astrotech-esi/" className="block text-description text-small-subtitle">Linked in</a>
                    </div>
                    <div>
                        <span className="block text-white font-semibold text-small-subtitle mb-2">Location</span>
                        <p className="block text-description text-small-subtitle">École Nationale Supérieure d’Informatique, BP 68M, 16270, Oued Smar, Algérie</p>
                    </div>
                    <div className={screenSize === "small" ? "col-span-2" : null}>
                        <form ref={form} onSubmit={sendEmail}>
                            <input type="hidden" name="from_name" value={email} />
                            <textarea name="message" cols="30" rows="10" placeholder="Write something to us ..." className="resize-none bg-textarea border-2 border-white rounded-md outline-none p-2 h-20 text-mini-text mb-2 w-full text-white" onChange={(e) => setMessage(e.target.value)}></textarea>
                            {message && message.length > 10 ? <input type="submit" value={"send to astrotech@esi.dz"} className="bg-light-pink p-2 box-border rounded-md w-full text-small-subtitle cursor-pointer text-white" /> : <input type="submit" value={"send to astrotech@esi.dz"} className="bg-dark-pink p-2 box-border rounded-md w-full text-small-subtitle text-white" disabled />}
                        </form>
                    </div>
                </div>
                <div className="w-full text-center pb-4 font-semibold text-white">
                    Made by the artists of Astrotech ✨
                </div>
            </div>
        </div>
    );
}

export default Footer;