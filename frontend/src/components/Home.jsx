import React, { useContext, useState } from 'react';

import "../css/home.css";

import AnimeResult from "./AnimeResult";
import AnimeForm from "./AnimeForm";
import MetaTasks from './MetaTasks';
import AppContext from '../AppContext';

import money_icon from '../icons/money.svg'
import influence_icon from '../icons/influence.svg'
import { formatNumber } from '../utils';

function Home({ timeoutSeconds, setTimeoutSeconds, dailyReward, setDailyReward }) {
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [lastAnimeResult, setLastAnimeResult] = useState(null);
    const [isTasksVisible, setIsTasksVisible] = useState(true);
    const { user, setUser, tasks, setTasks } = useContext(AppContext);

    return (
        <>
            <div id="home">
                

                {!dailyReward.is_claimed_today && <>
                <div className="black-bg daily-bg"></div>
                <div className='popup daily-streak'>
                    <span className='streak-info'>
                        <span className="streak-number">{dailyReward.new_streak} дней</span>
                        <span className='streak-reward'>Ежедневная награда {formatNumber(dailyReward.money_reward)} <img src={money_icon} alt="" /></span>
                    </span>
                    <div className='ok-button-div'> 

                        <button className='btn' onClick={() => {
                            setDailyReward({...dailyReward, is_claimed_today: true});
                            setUser({...user, money: user.money + dailyReward.money_reward});
                            }}>Хорошо</button>
                    </div>
                </div>
                </>  
                }
                

                <MetaTasks isTasksVisible={isTasksVisible} setIsTasksVisible={setIsTasksVisible} tasks={tasks} setTasks={setTasks} />
                <AnimeForm timeoutSeconds={timeoutSeconds} setTimeoutSeconds={setTimeoutSeconds} setIsResultVisible={setIsResultVisible} setLastAnimeResult={setLastAnimeResult} setIsTasksVisible={setIsTasksVisible} />

                <AnimeResult rating={lastAnimeResult?.rating} money={lastAnimeResult?.money_profit} influence={lastAnimeResult?.influence_profit} reviews={lastAnimeResult?.reviews} isResultVisible={isResultVisible} setIsResultVisible={setIsResultVisible} />

            </div>
        </>
    );
}

export default Home;
