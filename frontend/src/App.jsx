import { useEffect, useState } from 'react'

import './css/style.css'

import Footer from './components/Footer'
import Home from './components/Home'
import Shop from './components/Shop'
import Account from './components/Account'
import Donate from './components/Donate'
import Header from './components/Header'
import Loading from './components/Loading'


import axios from 'axios'
import Cookies from 'js-cookie';
import AppContext from './AppContext'

import api from './main'
import { TonConnectUIProvider } from '@tonconnect/ui-react'


function App() {
    const [user, setUser] = useState({
        created_at: "",
        daily_streak: 0,
        id: 0,
        influence: 0,
        is_learning_complete: false,
        language: "",
        last_daily_collect: "",
        money: 0,
        number_of_friends: 0,
        passive_income: 0,
        profit_ratio: 0,
        referral_code: "",
        studio_name: "",
        tasks: null,
        timeout_after_creating: 0,
        ton_wallet: "",
        updated_at: "",
        upgrades: null,
        user: 0,
        username: ""
    })
    const [upgrades, setUpgrades] = useState(null);
    const [tasks, setTasks] = useState(null);

    const [isSound, setIsSound] = useState(true);


    const [loading, setLoading] = useState(0)
    const [page, setPage] = useState(0)
    const [timeoutSeconds, setTimeoutSeconds] = useState(0);

    const [dailyReward, setDailyReward] = useState(null);

    useEffect(() => { // TODO loading in many state / fix many request
        if (loading === 0) {
            let token = Cookies.get('token');
            if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setLoading(1);
            // api.get(`user/auth?${window.Telegram.WebView.initParams.tgWebAppData}`) // TODO
            api.get(`user/auth?query_id=AAENod9KAgAAAA2h30rcTf19&user=%7B%22id%22%3A5551137037%2C%22first_name%22%3A%22Memcor%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22memcor%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1726156760&hash=bf76fa0959f70d0ccbb19b6ed4d79040eab0985dc9e5fca540f17b5a92350dff`)
            .then(resp => {
                token = resp.data.access;
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                Cookies.set('token', token, { expires: 3, secure: true });
            })
            .then(() => {
                return api.get(`user/stats`).then(resp => {
                    let data = resp.data;
                    setUser({ ...data });
                    setTimeoutSeconds(data.timeout_seconds);
                    return data;
                });
            })
            .then(user_data => {
                return api.get(`upgrade/upgrades`).then(resp => {
                    let data = resp.data;
                    data.forEach(el => {
                        el.is_purchased = (el.id in user_data.upgrades ? true : false);
                    });
                    setUpgrades(data);
                    return user_data;
                })
            })
            .then(user_data => {
                api.get(`task/tasks`).then(resp => {
                    let data = resp.data;
                    data.forEach(el => {
                        el.is_completed = (el.id in user_data.tasks ? true : false);
                    });
                    setTasks(data);
                })
            })
            .then(() => {
                api.post('task/daily').then(resp => {
                    setDailyReward(resp.data);
                    console.log(resp.data)
                    setLoading(2);
                })
            })
            .catch(err => {
                setLoading(0);
            })
        }
    }, [loading])

    useEffect(() => {
        
        let timer;
        if (timeoutSeconds > 0) {
            timer = setTimeout(() => setTimeoutSeconds(timeoutSeconds - 1), 1000);
        }
        return () => clearTimeout(timer);

    }, [timeoutSeconds]);

    { /* Your app */ }
    return (loading < 2) ? <div id='app' className='selectDisable'><Loading /></div> :
        
        <TonConnectUIProvider manifestUrl="https://main--clinquant-gecko-344f70.netlify.app/tonconnect-manifest.json">
            <AppContext.Provider value={{user, setUser, upgrades, setUpgrades, tasks, setTasks}}>
                <div id='app' className='selectDisable'>
                    <Header page={page} setPage={setPage} isSound={isSound} setIsSound={setIsSound}/>
                    {page === 0 ? <Home timeoutSeconds={timeoutSeconds} setTimeoutSeconds={setTimeoutSeconds} dailyReward={dailyReward} setDailyReward={setDailyReward} /> 
                    :
                    (page === 1 ? <Shop /> : (page === 2 ? <Account /> : <Donate/>))}
                    <Footer page={page} setPage={setPage} />
                </div>  
            </AppContext.Provider>
        </TonConnectUIProvider>
}

export default App;
