import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Notifications({ notifications, host }) {
    const navigate = new useNavigate();
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
    }, []);

    const seeNotification = async (notif, link) => {
        const url = `${host}/notification/see`;
        axios.post(url, { "notification": notif }, {
            withCredentials: true,
        }).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
            }
            if (res.status == 401 || res.status == 403) navigate("/login");
            if (res.status == 404) navigate("/E404");

            if (res.status === 200) {
                navigate(link);
            }
        }).catch(err => { console.log(err); });
    };

    const renderNotifications = (notifications) => {
        return notifications.map((notif) => {
            return (
                <div className="flex flex-row items-end justify-start gap-2 py-2 border-b border-border-grey relative hover:bg-input-light-grey" key={notif.id} onClick={() => { notif.seen ? navigate(notif.link) : seeNotification(notif.id, notif.link) }}>
                    <img src={notif.img} alt={notif.img} className="h-[40px] w-[50px] rounded-sm" />
                    <div className="flex flex-col items-center justify-start">
                        <span className={`w-full ${notif.seen ? "text-black" : "text-light-pink"} font-semibold text-small-subtitle`}>{notif.title}</span>
                        <span className={`w-full ${notif.seen ? "text-light-text" : "text-light-pink font-medium"} text-smallest-text `}>{notif.date}</span>
                    </div>
                    {!notif.seen && <div className="h-2 w-2 rounded-full bg-light-pink absolute top-1 right-0"></div>}
                </div>
            );
        });
    }
    return (
        <div className={`flex flex-col gap-4 px-4 py-3 w-[300px] bg-white max-h-40 overflow-auto rounded-md absolute ${screenSize === "small" ? "-right-20" : "right-0"} top-[30px] z-40`}>
            {renderNotifications(notifications)}
        </div>
    );
}

export default Notifications;