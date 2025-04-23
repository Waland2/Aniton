import { useContext } from "react";
import "../css/donate.css"
import AppContext from "../AppContext";
import { TonConnectButton } from "@tonconnect/ui-react";


function Donate() {
    const { user, setUser } = useContext(AppContext);

    return <>
        {user.ton_wallet ? <div></div> : 
        <div>
            <span className="donate-title">Для продолжения - подключите кошелёк</span>
            <div className="ton-connect-btn">
                <TonConnectButton/>

            </div>
        </div>}


    </>
}

export default Donate;