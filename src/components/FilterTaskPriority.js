import React, { useState } from 'react'
import '../styles/FilterTaskPriority.css';

const FilterTaskPriority = ({filterPriority}) => {

    const [priority, setPriority] = useState("");

    const handleSelectPriority = (e) => {
        setPriority(filterPriority(e.target.value));
    }

  return (
    <div className='filterTab'>
        <select className='priorityFilter' value={priority} onChange={handleSelectPriority}>
            <option className='filterOption' value="">All</option>
            <option className='filterOption' value='Low'>Low</option>
            <option className='filterOption' value='Medium'>Medium</option>
            <option className='filterOption' value='High'>High</option>
            <option className='filterOption' value='Critical'>Critical</option>
        </select>
    </div>
  )
}

export default FilterTaskPriority