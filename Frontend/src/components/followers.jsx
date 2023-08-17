import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import communitiesIcon from "../assets/icons/group.png";
import LoadingComponent from "./LoadingComponent";

function Followers({ community, host, picturesUrl }) {
    const [users, setUsers] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            const url = `${host}/communities/users/${community}`;
            var result = await fetch(url, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                result = await fetch(`${host}/refresh`, { credentials: "include" });
                if (result.status === 401 || result.status === 403) {
                    navigate("/login");
                } else {
                    result = await fetch(url, { credentials: "include" });
                    if (result.status !== 200) navigate("/login");
                }
            }
            if (result.status == 200) {
                result.json().then(json => setUsers(json));
            }
            if (result.status == 401 || result.status == 403) navigate("/login");
            if (result.status == 404) navigate("/E404");

        }
        fetchUsers();
    }, []);
    const createFollowers = () => {
        return users.map(function (user) {
            return <div key={user.id + "_followers"} className="flex flex-row items-center justify-start gap-2 cursor-pointer" onClick={() => navigate(`/profile/${user.fullname}`)}>
                <img src={picturesUrl + user.profile_pic} alt="community" className="h-[40px] w-[40px] rounded-full object-cover" />
                <div className="block">
                    <span className="block text-small-subtitle text-white font-semibold">{user.fullname}</span>
                    <span className="block text-mini-text text-subtitle font-medium">{user.nb_publications} publications, {user.nb_likes} likes</span>
                </div>
            </div>;
        });
    }
    return (
        <div className="sticky top-4">
            <div className="mt-8">
                <div className="flex flex-row justify-start items-center gap-2 mb-4">
                    <img src={communitiesIcon} alt="suggestions" className="h-[20px] w-[20px]" />
                    <h4 className="text-white font-semibold">Followers</h4>
                </div>
                <div className="flex flex-col gap-2">
                    {users ? createFollowers() : <LoadingComponent dark={true} />}
                </div>
            </div>
        </div>
    );
}

export default Followers;