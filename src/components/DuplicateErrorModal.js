import React from 'react'

const DuplicateErrorModal = ({duplicateError, closeDupError}) => {

    if (!duplicateError) {
        return null
    }

    return (
        <div className='emptyErrorModal'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h4 className='modalTitle'>Friendly Reminder</h4>
                </div>
                <div className='modalBody'>
                    <p>Your provided task name is already registered in the database.</p>
                    <p>Try to use different task name.</p>
                </div>
                <div className='modalFooter'>
                    <button className='closeBtn' onClick={closeDupError} color="secondary">Exit</button>
                </div>
            </div>
        </div>
  )
}

export default DuplicateErrorModal