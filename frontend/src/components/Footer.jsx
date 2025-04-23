import homeIcon from '../icons/home.svg'
import shopIcon from '../icons/shop.svg'
import accountIcon from '../icons/account.svg'

import '../css/footer.css'

function Footer({page, setPage}) {
    return <>
        <footer>
            <span className={'page' + (page === 0 ? ' active' : '')} onClick={() => setPage(0)}>
                <img src={homeIcon} alt="Home" />
            </span>
            <span className={'page' + (page === 1 ? ' active' : '')} onClick={() => setPage(1)}>
                <img src={shopIcon} alt="Shop" />
            </span>
            <span className={'page' + (page === 2 ? ' active' : '')} onClick={() => setPage(2)}>
                <img src={accountIcon} alt="Account" />
            </span>
            
        </footer>
    </>
}

export default Footer