import './App.css';
import './styles/Taskcard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import {  v4 as uuidv4 } from 'uuid';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import InprogressTaskcard from './components/InprogressTaskcard';
import CompletedTaskcard from './components/CompletedTaskcard';
import CreateTaskModal from './components/CreateTaskModal';
import FilterTaskPriority from './components/FilterTaskPriority';
import InprogressTaskPage from './pages/InprogressTaskPage';
import CompletedTaskPage from './pages/CompletedTaskPage';


function App() {

    // GETTING LATEST DATE AND DAY
    const today = new Date();
    const mo = today.getMonth();
    const dateNum = today.getDate();
    const yr = today.getFullYear();
    const day = today.getDay();
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayArr = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

    // TASK
    const [tasks, setTasks] = useState([]);

    let tasknameArr = tasks.map((tasksEle) => {
        const wsRegex = /\s/g;
        const trimTaskname = tasksEle.taskname
        const noSpace = trimTaskname.replace(wsRegex,"")
        return noSpace.toLowerCase(); 
    })

    // PROMPT CREATE TASK MODAL
    const [createModal, setCreateModal] = useState(false);

    // CREATING NEW TASK
    const newTask = (taskObj) => {
        let tasksCopy = tasks;
        tasksCopy.push(taskObj);
        localStorage.setItem('tasks', JSON.stringify(tasksCopy));
        setTasks(tasksCopy);
        window.location.reload();
    }  

    // FILTERING TASK BASED ON PRIORITY
    const [priority, setPriority] = useState("");

    const filterPriority = (priority) => {
        setPriority(priority);
    }

    let filteredTasks = priority === "" ? tasks : tasks.filter((tasksEle) => {
        return tasksEle.priority === priority
    })

    // EDITING TASK
    const editTask = (editedTaskObj, id) => {
        let tasksCopy = tasks;
        const indexOfTask = tasksCopy.findIndex(task => task.id === id);
        tasksCopy[indexOfTask] = editedTaskObj;
        localStorage.setItem("tasks", JSON.stringify(tasksCopy));
        setTasks(tasksCopy);
        window.location.reload();
    }

    // COMPLETING TASK
    const completeTask = (id) => {
        const updateTasks = [...tasks]
        updateTasks.map((tasksEle) => {
            if (tasksEle.id === id) {
                return tasksEle.completed = true;
            }
        })
        localStorage.setItem("tasks", JSON.stringify(updateTasks));
        setTasks(updateTasks);
        window.location.reload();
    }

    // DELETING TASK
    const deleteTask = (id) => {
        const indexOfTask = tasks.findIndex(task => task.id === id);
        const newTasks = [...tasks];
        newTasks.splice(indexOfTask, 1);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        setTasks(newTasks);
        window.location.reload();
    }
    
    //FILTERING INPROGRESS TASKS
    const inprogressTasks = filteredTasks.filter((tasksEle) => {
        return tasksEle.completed === false;
    });

    // RENDERING INPROGRESS TASKS
    const inprogressTaskcards = inprogressTasks.map((tasksEle) => (
        <InprogressTaskcard 
            id={tasksEle.id}
            taskname={tasksEle.taskname} 
            category={tasksEle.category} 
            priority={tasksEle.priority} 
            status={tasksEle.completed} 
            tasknameArr = {tasknameArr}
            completeBtn={completeTask}
            deleteBtn={deleteTask}
            editBtn = {editTask}
        />
    ));

    // FILTERING COMPLETED TASKS
    const completedTasks = tasks.filter((tasksEle) => {
        return tasksEle.completed === true;
    });

    // RENDERING COMPLETED TASKS
    const completedTaskcards = completedTasks.map((tasksEle) => (
        <CompletedTaskcard 
            id={tasksEle.id}
            taskname={tasksEle.taskname} 
            category={tasksEle.category} 
            priority={tasksEle.priority} 
            deleteBtn={deleteTask}
        />
    ));

    // LOCAL STORAGE CONFIGURATION
    useEffect(() => {
        let arr = localStorage.getItem("tasks")
        if (arr) {
            let obj = JSON.parse(arr)
            setTasks(obj)
        }
    }, [])
    
    // COUNT IN-PROGRESS TASK
    let numOfInprogress = inprogressTasks.length;

    // COUNT COMPLETED TASK
    let numOfCompleted = completedTasks.length;

    // DELETE ALL COMPLETED TASK
    const clearComplete = () => {
        const tasksCopy = tasks;
        const clearedComplete = tasksCopy.filter((taskEle) => {
            return taskEle.completed === false
        })
        localStorage.setItem("tasks", JSON.stringify(clearedComplete));
        setTasks(clearedComplete);
        window.location.reload()
    }

    // DELETE ALL IN-PROGRESS TASK
    const clearInprogress = () => {
        const tasksCopy = tasks;
        const clearedInprogress = tasksCopy.filter((taskEle) => {
            return taskEle.completed === true
        })
        localStorage.setItem("tasks", JSON.stringify(clearedInprogress));
        setTasks(clearedInprogress);
        window.location.reload()
    }

    return (
        <div className="App">
            <div className="appContainer">
                <div className="header">
                    <p className="appTitle">TODO|</p>
                    <div className="subHeader">
                        <p className="headInfo">{`${monthArr[mo]} ${dateNum}, ${yr} • ${dayArr[day]}`}</p>
                        <p className="headInfo">{numOfInprogress} Tasks Remaining • {numOfCompleted} Task Completed</p>
                    </div>
                </div>
                <div className='taskboard'>
                    <button 
                        className="createTaskBtn" 
                        onClick={() => setCreateModal(true)}>Add New Task
                    </button>
                    <CreateTaskModal 
                        onClose={() => setCreateModal(false)} 
                        modal={createModal} 
                        newTask = {newTask} 
                        tasknameArr = {tasknameArr}
                    />
                    <div className='filterAndNavbar'>
                        <FilterTaskPriority filterPriority={filterPriority} />
                        <nav>
                            <Link to="" style={{textDecoration: 'none', color: 'purple', margin: '6px 5px auto 5px'}} >All tasks</Link>• 
                            <Link to="InProgress" style={{textDecoration: 'none', color: 'purple', margin: '6px 5px auto 5px'}} >In-Progress Tasks</Link>•
                            <Link to="Completed" style={{textDecoration: 'none', color: 'purple', margin: '6px 5px auto 5px'}} >Completed Tasks</Link>
                        </nav>
                    </div>
                    <Routes >
                        <Route path='/' element={
                            <div className='divider'>
                                <InprogressTaskPage 
                                    inprogressTaskcards={inprogressTaskcards} 
                                    clearInprogress={clearInprogress} 
                                />
                                <CompletedTaskPage 
                                    completedTaskcards={completedTaskcards} 
                                    clearComplete={clearComplete} 
                                />
                            </div>} 
                        />
                        <Route 
                            path='/inprogress' 
                            element={ <InprogressTaskPage 
                                inprogressTaskcards={inprogressTaskcards}
                                clearInprogress={clearInprogress} 
                            /> }
                        />
                        <Route 
                            path='/completed' 
                            element={ <CompletedTaskPage 
                                completedTaskcards={completedTaskcards} 
                                clearComplete={clearComplete} 
                            /> }
                        />
                    </Routes>
                </div>
            </div>
        </div>
  );
}

export default App;