import React from 'react'

const CompletedTaskcard = ({id, taskname, category, priority, deleteBtn}) => {
  return (
    <div className='taskcard'>
            <div className='taskInfo'>
                <h3 className='cardName' style={{color: "tan"}}>{ taskname }</h3>
                <p className='cardCat' style={{color: "tan"}}>Category: {category}</p>
                <p className='cardPrio' style={{color: "tan"}}>Priority: {priority}</p>
            </div>
            <div className='taskAction' style={{marginLeft: "12rem"}}>
                <button 
                    onClick={() => deleteBtn(id)} className='deleteBtn'  >
                </button>
            </div>
        </div>
  )
}

export default CompletedTaskcard