import "../styles/Taskcard.css"

const Taskcard = ({id, taskname, category, priority, status, completeBtn, deleteBtn}) => {

    return (
        <div className='taskcard'>
            <div className='taskInfo'>
                <h3 className='cardName'>{ taskname }</h3>
                <p className='cardCat'>Category: {category}</p>
                <p className='cardPrio'>Priority: {priority}</p>
            </div>
            <div className='taskAction'>
                <button onClick={() => completeBtn(id, status)} className='completeBtn'  ></button>
                <button className='editBtn'></button>
                <button onClick={() => deleteBtn(id)} className='deleteBtn'  ></button>
            </div>
        </div>
    )
}

export default Taskcard