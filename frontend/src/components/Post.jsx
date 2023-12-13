import React from 'react'
import { Link } from 'react-router-dom'
import { UseContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'

const Post = () => {
  return (
    <div className='post'>
        <div className="image">
            <Link to={"post/1"} > 
            <img src="https://pbs.twimg.com/media/EhUHpYIUwAMEGU2?format=jpg&name=small" alt="" />
            </Link>
        </div>
        <div className="texts">
            <Link>
             <h2>
                ปืนกล้วย
             </h2>
            </Link>
            <p className='info'>
                <a href="" className='author'>tossapon</a>
                <time> 12 December 2023 </time>
            </p>
            <p className="summary">
                ยิงดียิงเเม่นasdfhasjdgfjasldhfglksahgkhasghuashdjglkashguashdguiasdgasidkgoasjdgasidgj
            </p>
        </div>
    </div>
  )
}

export default Post