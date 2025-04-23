import '../css/account.css'

import Friends from "./Friends"
import AccountInfo from "./AccountInfo"
import { useContext, useEffect } from 'react'
import AppContext from '../AppContext'
import TasksList from './TasksList'

function Account() {

    return <div id="account">
        <AccountInfo/>

        {/* <Friends/> */}
        <TasksList/>
    </div>
}

export default Account