import { useContext, useEffect } from 'react'
import '../css/header.css'

import money_icon from '../icons/money.svg'
import influence_icon from '../icons/influence.svg'
import sound from '../icons/sound.svg'
import no_sound from '../icons/no_sound.svg'
import chest from '../icons/chest.svg'

import { formatNumber } from '../utils'
import AppContext from '../AppContext'

function Header({ page, setPage, isSound, setIsSound }) {
    const { user, setUser } = useContext(AppContext);


    useEffect(() => {

        const interval = setInterval(() => {
            setUser(prevUser => ({ ...prevUser, money: prevUser.money + (prevUser.passive_income / 36000) }));
        }, 100);

        return () => clearInterval(interval);
    }, [user]);

    return <>
        <header>
            <div className='money-and-influence'>
                <span className='money-span'>
                    <img className='icon' src={money_icon} alt="" width='28px' />
                    <span className='money-number'>{formatNumber(user.money)}</span>
                </span>
                <span className='influence-span'>
                    <img className='icon' src={influence_icon} alt="" width='28px' />
                    <span className='money-number'>{formatNumber(user.influence)}</span>
                </span>
            </div>

            <div className='donate-and-sound'>
                <span className={'donate' + (page === 3 ? " pressed" : "")} onClick={() => {page === 3 ? setPage(0) : setPage(3)}} >
                    <img src={chest} alt="" />
                </span>
                <span className='sound' onClick={() => setIsSound(!isSound)} >
                    <img src={isSound ? sound : no_sound} alt="" />
                </span>
            </div>

        </header>
    </>
}

export default Header