import { useContext } from "react";
import AppContext from "../AppContext";



function Friends() {
    const {user, setUser} = useContext(AppContext);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`t.me/anitonbot?x=${user.referral_code}`);
    };

    return (
        <></>
    );
}

export default Friends;