import React, { useRef, useState } from "react";
import logo from "../assets/logo.svg";
import esiLogo from "../assets/icons/esi.png";
import moonBg from "../assets/images/moon.jpg";
import emailjs from '@emailjs/browser';

function Footer({ profile }) {
    const [message, setMessage] = useState();
    const email = profile.email;
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_wg3dy3t', 'template_6zpv402', form.current, 'MY_PUBLIC_KEY')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }
    return (
        <div id="footer" className="pt-24 relative px-[20%]" >
            <div id="footer-bg">
            </div>
            <div>
                <div className="flex flex-col items-center justify-center mb-4">
                    <img src={logo} alt="logo" className="h-12 object-cover -rotate-logo" />
                    <span className="text-card-title text-white font-bold logo">Astrotech</span>
                </div>
                <div className="flex flex-row items-center justify-between gap-4 mb-8 px-20">
                    <p className="text-white text-mini-text text-justify px-10">
                        Astrotech" is the astronomy club of the National School of Computer Science (ESI ex INI).
                        Astrotech aims to carry out student projects dedicated to learning the deepest secrets of the vast universe in which we live; this is in order to create a community of computer scientists passionate about astronomy and space.
                    </p>
                    <img src={esiLogo} alt="esi" className="object-cover h-20 " />
                </div>
                <div className="flex flex-row items-start justify-between gap-10 mb-8">
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