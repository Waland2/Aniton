import { useContext, useEffect } from "react";
import AppContext from "../AppContext";
import { formatNumber } from "../utils";

import money_icon from '../icons/money.svg'
import influence_icon from '../icons/influence.svg'
import friend_icon from '../icons/friend.svg'
import complete_icon from '../icons/complete.svg'
import api from "../main";

function Task({task, tasks, setTasks}) {
    const {user, setUser} = useContext(AppContext);

    const complete = () => {
        if (task.is_completed || !(user.money >= task.money_required && user.number_of_friends >= task.friends_required && user.daily_streak >= task.daily_streak_required)) return;
        const taskId = task.id;
        
        api.post(`task/complete/${taskId}`).then(resp => {
            setUser(prevUser => ({
                ...prevUser,
                tasks: {
                    ...prevUser.tasks,
                    [taskId]: { status: resp.data.status }
                },
                money: prevUser.money + task.money_reward,
                influence: prevUser.influence + task.influence_reward
            }));

            setTasks(prevTasks => (
                prevTasks.map((task, index) => {
                    return task.id == taskId ? { ...task, is_completed: true } : task
                })
            ))
        })
    }

    return <div onClick={complete} className={"task" + (task.is_completed ? " completed" : ((user.money >= task.money_required && user.number_of_friends >= task.friends_required && user.daily_streak >= task.daily_streak_required) ? " can-be-complet" : ""))}>
        <span className="complete-background">
            <img src={complete_icon} alt="" />
        </span>
        <span className="task-title">
            {task.friends_required ? <span className="text-with-icon">{task.friends_required} <img src={friend_icon} alt="" /></span> : (user.language === "en" ? task.title_eng : task.title_rus) }
        </span>
        <span className="task-reward">
            <span className="money-reward">
                {task.money_reward < 1000000 ?  formatNumber(task.money_reward / 1000) + "K" : formatNumber(task.money_reward / 1000000) + "M"} <img src={money_icon} alt="" width="18px"/>
            </span>
            <span className="influence-reward">
                {task.influence_reward < 1000 ? task.influence_reward : (task.influence_reward < 1000000 ?  formatNumber(task.influence_reward / 1000) + "K" : formatNumber(task.influence_reward / 1000000) + "M")} <img src={influence_icon} alt="" width="18px" /></span>
            </span>
    </div>
}

export default Task;