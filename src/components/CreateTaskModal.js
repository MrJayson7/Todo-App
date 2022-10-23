import React, { useState } from 'react';
import "../styles/CreateTaskModal.css"
import {  v4 as uuidv4 } from 'uuid';
import EmptyErrorModal from './EmptyErrorModal';
import DuplicateErrorModal from './DuplicateErrorModal';

const CreateTaskModal = ({modal, onClose, newTask, tasknameArr}) => {

    const [taskname, setTaskname] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("Low");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'taskname') {
            setTaskname(value);
        } else if (name === 'category') {
            setCategory(value);
        } else {
            setPriority(value);
        }
    }

    const [emptyModal, setEmptyModal] = useState(false);
    const [duplicateModal, setDuplicateModal] = useState(false);
 
    // REGULAR EXPRESSION FOR EMPTY TASK AND DUPLICATE INPUT
    const wsRegex = /\s/g;
    const trimTaskname = taskname.replace(wsRegex,"").toLowerCase();
    const trimCategory = category.replace(wsRegex,"");

    const handleNewTask = () => {
        if (trimTaskname === "" || trimCategory === "") {
            setEmptyModal(true);
        } else if (tasknameArr.includes(trimTaskname) === true) {
            setDuplicateModal(true);
        } else {
            let taskObj = {}
            taskObj['id'] = uuidv4()
            taskObj['taskname'] = taskname
            taskObj['category'] = category
            taskObj['priority'] = priority
            taskObj['completed'] = false
            newTask(taskObj);
            onClose();
        }
    }
    
    if (!modal) {
        return null
    }

  return (
    <div className='createModal'>
        <div className='createTaskModal'>
            <div className='modalHeader'>
                <h4 className='modalTitle'>New Task</h4>
            </div>
            <form className='createTask'>
                <div className='form-group'>
                    <label className='createLabel'>Task</label>
                    <input 
                        className='form-control' 
                        type='text' 
                        required
                        value={taskname}
                        name="taskname"
                        onChange={handleChange}>
                    </input>
                </div>
                <div className='form-group'>
                    <label className='createLabel'>Category</label>
                    <input 
                        className='form-control' 
                        type='text' 
                        required
                        value={category}
                        name='category'
                        onChange={handleChange}
                        >
                    </input>
                </div>
                <div className='form-group'>
                    <label className='createLabel' for='selectPriority'>Priority</label>
                        <select id='selectPriority' className='form-control' name='priority' value={priority} onChange={handleChange}>
                            <option value='Low'>Low</option>
                            <option value='Medium'>Medium</option>
                            <option value='High'>High</option>
                            <option value='Critical'>Critical</option>
                        </select>
                </div>
            </form>
            <div className='modalFooter'>
                <button className='addBtn'  onClick={handleNewTask} color="primary">Add</button>
                <button className='closeBtn' onClick={onClose} color="secondary">Cancel</button>
            </div>
        </div>
        <EmptyErrorModal emptyError={emptyModal} closeError={() => setEmptyModal(false)}/>
        <DuplicateErrorModal duplicateError={duplicateModal} closeDupError={() => setDuplicateModal(false)}/>
    </div>
  )
}
export default CreateTaskModal