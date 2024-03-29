import {useDispatch} from 'react-redux'
import {filterPizzas} from '../../actions/pizzaActions.js'
import './filter.css'

import React, { useState } from 'react'

const Filter = () => {

    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all'); //default is all show

  return (
    <div className='filter-row'>
        <div className="filter-col">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='filter-input' placeholder='Search ...' />
        </div>
        <div className="filter-col">
            <div className="filter-select">
                <select value={category} onChange={(e) => setCategory(e.target.value)} >
                    <option value="all">All Pizzas</option>
                    <option value="italian">Italian Pizzas</option>
                    <option value="american">American Pizzas</option>
                </select>
            </div>
        </div>
        <div className="filter-col">
            <button className='filter-btn' onClick={() => {dispatch(filterPizzas(search, category))}}>Filter</button>
        </div>
    </div>
  )
}

export default Filter