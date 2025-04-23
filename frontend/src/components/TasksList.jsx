import { useContext } from "react"
import AppContext from "../AppContext"
import Task from "./Task";


function TasksList() {
    const { tasks, setTasks } = useContext(AppContext);

    return <>
    <div id="tasks">

        <div class="divider">
            <span>Заработок</span>
        </div>
        <div className="task-category">
                {tasks.map((task, index) => {
                    return (task.category === "money_earn" ? <Task task={task} tasks={tasks} setTasks={setTasks} /> : <></>)
                })}
        </div>

        <div className="divider">
            <span>Друзья</span>
        </div>
        <div className="task-category">
                {tasks.map((task, index) => {
                    return (task.category === "friends" ? <Task task={task} tasks={tasks} setTasks={setTasks}/> : <></>)
                })}
        </div>

        <div className="divider">
            <span>Ежедневные задания</span>
        </div>
        <div className="task-category">
                {tasks.map((task, index) => {
                    return (task.category === "daily_streak" ? <Task task={task} tasks={tasks} setTasks={setTasks} /> : <></>)
                })}
        </div>


    </div></>
}

export default TasksList;