import React from "react";
import logo from "../assets/logo.svg";
import esiLogo from "../assets/icons/esi.png";
import moonBg from "../assets/images/moon.jpg";

class Footer extends React.Component {
    render() {
        return (
            <div id="footer" className="px-60 pt-24 relative">
                <div id="footer-bg">
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center mb-4">
                        <img src={logo} alt="logo" className="h-12 object-cover -rotate-logo" />
                        <span className="text-card-title text-white font-bold logo">Astrotech</span>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-10 mb-8 px-16">
                        <p className="text-white text-mini-text text-justify">
                            Astrotech" is the astronomy club of the National School of Computer Science (ESI ex INI).
                            Astrotech aims to carry out student projects dedicated to learning the deepest secrets of the vast universe in which we live; this is in order to create a community of computer scientists passionate about astronomy and space.
                        </p>
                        <div className="p-2 bg-white rounded-md w-[200px]"><img src={esiLogo} alt="esi" className="object-cover" /></div>
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
                            <form action="" method="post">
                                <textarea name="message" cols="30" rows="10" placeholder="Write something to us ..." className="resize-none bg-textarea border-2 border-white rounded-md outline-none p-2 h-20 text-mini-text mb-2 w-full text-white"></textarea>
                                <input type="submit" value="send to astrotech@esi.dz" className="bg-light-pink p-2 rounded-md w-full text-small-subtitle cursor-pointer text-white" />
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
}

export default Footer;