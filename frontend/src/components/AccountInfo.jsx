import { useContext, useState } from "react";
import { useEffect } from "react";
import AppContext from '../AppContext'
import copy_icon from '../icons/copy.svg'


function AccountInfo() {
    const { user, setUser } = useContext(AppContext);
    const [referralLink, setReferralLink] = useState(`t.me/anitonbot?x=${user.referral_code}`);
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000)
    };
    return <div className="account-info">

        <span className="info-span"><span className="bold">Название студии:</span> {user.studio_name}</span>
        {/* <span className="info-span"><span className="bold">Язык:</span> {user.language}</span> */}
        <span className="info-span"><span className="bold">Ton кошелёк:</span> {user.ton_wallet ? user.ton_wallet.substr(0, 4) + "..." + user.ton_wallet.substr(user.ton_wallet.length - 4) : "<Не подключен>"}</span>
        <div className="ref-block" onClick={copyToClipboard}> 
        
            <span className="ref-title">Ваша ссылка-приглашение для друзей</span> 
            <span className="ref-link">{isCopied ? "Скопировано!" : referralLink}<img src={copy_icon} alt="" /></span>
        </div>
    </div>
}

export default AccountInfo;