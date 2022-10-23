import React from 'react'

const InprogressTaskPage = ({inprogressTaskcards, clearInprogress}) => {
  return (
        <div>
            <div className='inprogressTab'>
                    <p className='tabDescription'>In Progress</p>
                    <p className='tabBtn' onClick={clearInprogress}>Clear In-Progress</p>
                </div>
            <div className='cardSection'>
                { inprogressTaskcards }
            </div>
        </div>
    )
}
export default InprogressTaskPage