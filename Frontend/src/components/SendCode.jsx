import emailIllustration from "../assets/icons/email_illustration.png";
import { useState, useEffect, useSyncExternalStore } from "react";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import axios from "axios";


function SendCode({ email, inputs, host }) {

    const [inputCode, setInputCode] = useState();
    const [code, setCode] = useState();
    const [countDown, setCountDown] = useState();
    const [stop, setStop] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const navigate = useNavigate();

    const sendEmail = (c) => {
        //k6_TeWWtLOqIFoB7v
        emailjs.send("service_wg3dy3t", "template_04eslpi", { code: c, email: email, }, "k6_TeWWtLOqIFoB7v").then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    const generateCode = (length) => {
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    useEffect(() => {
        if (!emailSent) {
            const c = generateCode(8);
            setCode(c);
            sendEmail(c);
            setEmailSent(true);
        }
    }, []);

    const startTimer = (duration) => {
        var timer = duration, minutes, seconds;
        const t = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            setCountDown(minutes + ":" + seconds);
            timer--;
            if (timer <= 0) {
                timer = 0;
                setStop(true);
            }
        }, 1000);
    }

    useEffect(() => {
        if (!stop) startTimer(60 * 2);
    }, []);

    const handleClick = () => {
        const c = generateCode(8);
        setCode(c);
        sendEmail(c);
        setEmailSent(true);
        startTimer(60 * 2);
    }

    useEffect(() => {
        const handleSubmit = () => {
            const url = `${host}/register`;
            axios.post(url, inputs, {
                withCredentials: true,
            }).then(res => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                }
                if (res.status === 200) {
                    navigate("/home");
                }
            }).catch(err => { console.log(err.response.data); });
        }
        if (inputCode && inputCode == code) handleSubmit();

    }, [inputCode]);

    return (
        <div className='absolute top-0 bottom-0 right-0 left-0 h-full w-full z-20 flex items-center justify-center'>
            <div className=' bg-white p-10 rounded-sm drop-shadow fixed'>
                <div className='border-b border-border-grey px-10 pb-4 flex flex-col items-center justify-center'>
                    <img src={emailIllustration} alt="email illustration" className='h-20 w-20' />
                    <span className='block font-bold text-2xl text-grey'>You've Got Mail!</span>
                </div>
                <div className='pt-8  px-8 flex flex-col justify-center items-center'>
                    <span className='block font-grey text-small-subtitle text-center'>We sent you a confirmation code. Check your e-mail and past the code here.</span>
                    <span className='block font-bold text-ms text-light-pink py-2 w-full text-center'>{stop ? "time over" : countDown}</span>
                    {!stop ? <input type="text" placeholder="code" className="outline-0 bg-transparent font-text text-xl text-grey w-[150px] p-4 border border-boder-grey rounded-md bg-input-light-grey text-center" onChange={(e) => setInputCode(e.target.value)} /> : <span className="text-xl text-light-text">Click re-send code</span>}
                    {inputCode && inputCode != code && < span className="block text-errors text-mini-text font-medium w-[150px] text-start h-4">Wrong code!</span>}
                    <button className="bg-transparent border-none outline-none underline text-light-pink font-semibold text-small-subtitle pt-8" onClick={handleClick}>Re-send Code</button>
                </div>
            </div>
        </div >
    );
}

export default SendCode;