import React from 'react'

const CompletedTaskPage = ({completedTaskcards, clearComplete}) => {
  return (
    <div>
        <div className='completedTab'>
            <p className='tabDescription'>Completed Task</p>
            <p className='tabBtn' onClick={clearComplete}>Clear Completed</p>
        </div>
        <div className='cardSection'>
            { completedTaskcards }
        </div>
    </div>
  )
}
export default CompletedTaskPage 