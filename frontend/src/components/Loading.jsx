import loadSpinner from '../images/load.svg'

import bk1 from '../images/bk1.jpg'
import bk2 from '../images/bk2.jpg'
import bk3 from '../images/bk3.jpg'
import bk4 from '../images/bk4.jpg'
import bk5 from '../images/bk5.jpg'
import bk6 from '../images/bk6.jpg'
import bk7 from '../images/bk7.jpg'

import '../css/loading.css'
import { useState } from 'react'

const backgrounds = [bk1, bk2, bk3, bk4, bk5, bk6, bk7]
function Loading() {
    const [background, setBackground] = useState(`url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`)
    
    return <>
    <div className='loading-page' style={{backgroundImage: background}}>   
        <div className='background-filter'>
            <span className='lp-text'>Loading game...</span>
            <img className='lp-gif' src={loadSpinner} alt="" />
        </div>
    </div>
    </>
        
}

export default Loading
