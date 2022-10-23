import React, { useState } from 'react'
import EditTaskModal from './EditTaskModal';

const InprogressTaskcard = ({id, taskname, category, priority, status, tasknameArr, completeBtn, deleteBtn, editBtn}) => {

    // PROMPT EDIT TASK MODAL
    const [editModal, setEditModal] = useState(false);

    const editTask = (editedTaskObj) => {
        editBtn(editedTaskObj, id)
    }

    return (
    <div className='taskcard'>
        <div className='taskInfo'>
            <h3 className='cardName'>{ taskname }</h3>
            <p className='cardCat'>Category: {category}</p>
            <p className='cardPrio'>Priority: {priority}</p>
        </div>
        <div className='taskAction'>
            <button onClick={() => completeBtn(id, status)} className='completeBtn'  ></button>
            <button onClick={() => setEditModal(true)} className='editBtn'></button>
            <button onClick={() => deleteBtn(id)} className='deleteBtn'  ></button>
        </div>
        <EditTaskModal 
            onClose={() => setEditModal(false)} 
            modal={editModal} 
            editTask = {editTask} 
            prevId = {id}
            prevTaskname = {taskname} 
            prevCategory = {category}
            prevPriority = {priority} 
            tasknameArr = {tasknameArr}
        />
    </div>
  )
}

export default InprogressTaskcard