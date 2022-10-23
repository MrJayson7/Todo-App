import React from 'react'
import "../styles/EmptyErrorModal.css"

const EmptyErrorModal = ({emptyError, closeError}) => {

    if (!emptyError) {
        return null
    }

    return (
        <div className='emptyErrorModal'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h4 className='modalTitle'>Friendly Reminder</h4>
                </div>
                <div className='modalBody'>
                    <p>Task name and task category shall not be empty.</p>
                    <p>Help:  Use alphanumeric case.</p>
                </div>
                <div className='modalFooter'>
                    <button className='closeBtn' onClick={closeError} color="secondary">Exit</button>
                </div>
            </div>
        </div>
    )
}

export default EmptyErrorModal