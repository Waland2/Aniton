import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { formatNumber } from "../utils";

import money_icon from '../icons/money.svg'
import api from "../main";


function MetaTasks({isTasksVisible, setIsTasksVisible, tasks, setTasks}) {
    const {user, setUser} = useContext(AppContext);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const [task, setTask] = useState(null); // TODO?

    useEffect(() => {
        if (tasks !== null) {
            setTask(tasks[0]);
        } 
    }, tasks)

    const check = () => {
        api.post('task/subscribe-check').then(resp => {
            setUser({ ...user, money: user.money + task.money_reward });
            setTasks(prevTasks => (
                prevTasks.map((task, index) => {
                    return task.id == 4 ? { ...task, is_completed: true } : task // TODO ? 
                })
            ))
            setIsPopupVisible(false);
        })
        .catch(err => {
            setIsErrorVisible(true);
        })
    }

    const openPopup = () => {
        if (task.is_completed) return;
        setIsErrorVisible(false);
        setIsPopupVisible(!isPopupVisible)
    }

    return (isTasksVisible && (task !== null) && <>
        <div className="meta-tasks" >
            <button className={"m-task" + (task?.is_completed ? " completed" : "")} onClick={openPopup}>
                <span>{(task?.is_completed ? "Task completed" : "Subscribe to our channel!")}</span>
            </button>
        </div>

        {isPopupVisible && <>
            <div className="black-bg sub-popup-bg" onClick={() => setIsPopupVisible(false)}></div>

            <div className="popup sub-popup">
                <div className="sub-reward">
                    <span>Reward: {formatNumber(task.money_reward)} <img src={money_icon} alt="" /></span>
                </div>
                <div className="sub-checker">
                    <btn onClick={() => window.Telegram.WebApp.openTelegramLink("https://t.me/anitonbot")} className="btn">Subscribe</btn>
                    <button className="btn" onClick={check}>Check</button>
                </div>
                <div className={"error" + (isErrorVisible ? " visible" : "")}>Our system could not detect your subscription.</div>
                <button className="cancel-creation-btn" onClick={openPopup}>Cancel</button>
            </div>
        </>}
    </>)
}

export default MetaTasks;
