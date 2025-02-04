import React from 'react'
import './Admin.css'
import { useNavigate } from 'react-router-dom'
const Card = ({Count,role,click,...props}) => {
  const navigate = useNavigate();
  return (
    <div className='Card-detail'>
      <h4>
        Total {role}:{" "}
        <span>{Count}</span>
      </h4>
      <div className='card-button'>
      <button onClick={click}>View</button>
    
      </div>
      
    </div>
  )
}

export default Card