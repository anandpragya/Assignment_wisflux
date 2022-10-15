import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import Quick from '../quick/Quick';
import './pizza.css'

const Pizza = ({pizza}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [quantity, setquantity] = useState(1)
  const [varient, setvarient] = useState("small")
  const [extras, setExtras] = useState([]);
  const [crust, setCrust] = useState("thin")
  const [price, setPrice] = useState(pizza.prices[0]["small"])
  
  const dispatch = useDispatch()
  const addtocart=()=>{
    dispatch(addToCart(pizza,quantity,varient,crust,extras,price))
    alert("Item added successfully.Click on cart to order")
  }

  const changePrice = (number) => {
    setPrice(price + number)
  }
  const handleCrust = (e) => {
    setCrust(e.target.value)
    setPrice(price + pizza.prices[1][crust])
  }
  const handleVarient = (e) => {
    setvarient(e.target.value)
    setPrice(price + pizza.prices[0][varient])
  }
  const handlequantity = (e) => {
    setquantity(e.target.value)
    setPrice(price + pizza.prices[0][varient] * e.target.value)
  }

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  return (
    <div className='p-card'  key={pizza._id}>
        <div className="p-card-header">
            <img className='p-image' src={pizza.image} alt={pizza.name} />
            <h2 className="p-title" onClick={handleShow}>{pizza.name}</h2>
        </div>
        <div className="p-card-body">
            <div className="p-left">
                <span className="varients">Varients</span>
                <div className="p-select">
                    <select value={varient} onChange={(e) => handleVarient(e)}>
                        {pizza.varients.map((varient ,i)=> (
                            <option key = {i} value={varient}>{varient}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="p-right">
                <span className="varients">Quantity</span>
                <div className="p-select quantity">
                    <select value={quantity} onChange={(e) => handlequantity(e)}>
                        {[...Array(5).keys()].map((x, i) => (
                            <option key = {i}value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
                <div>
                <div className="p-left">
                <span className="varients">Crust</span>
                <div className="p-select quantity">
                    <select value={crust} onChange={(e) => handleCrust(e)}>
                        {pizza.crust.map((crust,i )=> (
                            <option key = {i} value={crust}>{crust}</option>
                        ))}
                    </select>
                </div>
            </div>  
            <div className='p-right'>
            <span className="varients">Ingredients</span><br></br>
          <div className="ingredient">
            {pizza.extraOption.map((option,i) => (
              <div className="option" key = {i}>
                <input
                  key = {i}
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  className="checkbox"
                  onChange={(e) => handleChange(e, option)}
                />
                <label htmlFor="double">{option.text}</label>
              </div>
            ))}
          </div>
 
            </div>
                </div>
            </div>
        </div>
        <div className="p-card-footer">
            <div className="p-f-left">
                <p className="price"><span>Price:</span> Rs{price}/-</p> {/*  price for pizza  from home page*/}
            </div>
            <div className="p-f-right">
                <button onClick={addtocart} className='btn'>Add</button>
            </div>
        </div>

        {/* For PopUp Modal or Quick View */}
        {show && <Quick handleClose={handleClose} pizza={pizza} />}
    </div>
  )
}

export default Pizza
