import money_icon from '../icons/money.svg'
import influence_icon from '../icons/influence.svg'

import { formatNumber } from '../utils'
import { useContext } from 'react'
import AppContext from '../AppContext'

function AnimeResult({ rating, money, influence, reviews, isResultVisible, setIsResultVisible }) {
    const { user, setUser } = useContext(AppContext);

    return (isResultVisible ? <>
        <div className="result-div">
            <h2>Результаты Аниме</h2>
            <div className="rating-section">
                <span>{rating}/10</span>
            </div>
            <div className="profit-section">
                <span className="money-profit"> <span className='plus'>+</span> {formatNumber(money)}
                    <img className="icon" src={money_icon} alt="" />
                </span>
                <span className="influence-profit"> <span className='plus'>+</span> {formatNumber(influence)} <img className="icon" src={influence_icon} alt="" /></span>
            </div>

            <div className="review-section">
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p dangerouslySetInnerHTML={{ __html: (user.language === "ru" ? review.text_rus : review.text_eng) }} />
                    </div>
                ))}
            </div>


            <button className="submit-btn" onClick={() => setIsResultVisible(false)}>Ок</button>
        </div>
    </> : <></>)
}

export default AnimeResult;