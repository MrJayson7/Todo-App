import React, { useEffect, useState } from 'react';
import EmptyErrorModal from './EmptyErrorModal';
import DuplicateErrorModal from './DuplicateErrorModal';

const EditTaskModal = ({modal, onClose, editTask, prevId, prevTaskname, prevCategory, prevPriority, tasknameArr}) => {

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

    useEffect (() => {
        setTaskname(prevTaskname)
        setCategory(prevCategory)
        setPriority(prevPriority)
    },[])

    const [emptyModal, setEmptyModal] = useState(false);
    const [duplicateModal, setDuplicateModal] = useState(false);

    // REGULAR EXPRESSION FOR EMPTY TASK
    const wsRegex = /\s/g;
    const trimTaskname = taskname.replace(wsRegex,"").toLowerCase();
    const trimCategory = category.replace(wsRegex,"");

    const handleEditTask = () => {
        if (trimTaskname === "" || trimCategory === "") {
            setEmptyModal(true);
        } else if (tasknameArr.includes(trimTaskname) === true) {
            setDuplicateModal(true);
        } else {
            let editedTaskObj = {}
            editedTaskObj['id'] = prevId
            editedTaskObj['taskname'] = taskname
            console.log(editedTaskObj['taskname'])
            editedTaskObj['category'] = category
            editedTaskObj['priority'] = priority
            editedTaskObj['completed'] = false
            editTask(editedTaskObj);
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
                    <h4 className='modalTitle'>Edit Task</h4>
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
                    <button className='addBtn'  onClick={handleEditTask} color="primary">save changes</button>
                    <button className='closeBtn' onClick={onClose} color="secondary">Cancel</button>
                </div>
            </div>
            <EmptyErrorModal emptyError={emptyModal} closeError={() => setEmptyModal(false)}/>
            <DuplicateErrorModal duplicateError={duplicateModal} closeDupError={() => setDuplicateModal(false)}/>
        </div>
    )
}

export default EditTaskModal