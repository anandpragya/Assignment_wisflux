import { faMinusCircle, faMoneyBill, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart, deleteItem } from '../actions/cartActions'
import Navbar from '../components/navbar/Navbar'
import './cart.css'

const Cart = () => {

    const cartState = useSelector(state => state.cartReducer);
    const cartItems = cartState.cartItems

    const navigate = useNavigate();

    var totalPrice = cartItems.reduce((x, item) => x + item.price, 0);

    const dispatch = useDispatch();

    function checkoutHandler() {
        if (totalPrice > 0) {
            navigate('/checkoutdetails')
        }
    }

    return (
        <div className='cart-container'>
            <div className="cart-row">
                <Navbar />
            </div>
            <div className="cart-row">
                
                <h1 className="cart-title">Your Cart</h1>
                
            </div>
            {(cartItems.length > 0) ? <div className="cart-row">
                <div className="cart-col">
                    {cartItems.map((item) => (

                        <div className="cart-card" key ={item._id}>
                            <div className="cart-header">
                                <h2 className="cart-subTitle">{item.name}</h2>
                                <span className="cart-varient">{item.varient}</span>
                            </div>
                            <div className="cart-body">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="cart-footer">
                                <div className="cart-footer-top">
                                    <p className='cart-price'>Price: {item.quantity} * {(item.prices[0][item.varient])} = Rs{item.prices[0][item.varient] * item.quantity}</p>
                                   <h3> Quantity: {item.quantity}</h3>
                                            <div style={{ display: "inline" }}>
                                                <h3>+{item.crust} + {item.prices[1][item.crust]}</h3>
                                                {item.toppings.map(topping => {
                                                    return (<h3>+{topping.text} - +{topping.price}</h3>)
                                                })}
                                            </div>
                                </div>
                                <div className="cart-footer-bottom">
                                    <div className="cart-footer-bottom-left">
                                        <FontAwesomeIcon icon={faTrash} onClick={() => { dispatch(deleteItem(item)) }} />
                                    </div>
                                    <div className="cart-footer-bottom-right">
                                
                                           <div>
                                             <h2>Price :{item.price}</h2>
                                            
                                            <FontAwesomeIcon icon={faPlusCircle}
                                             onClick={() => {dispatch(addToCart(item, +item.quantity+1, item.varient,item.crust,item.toppings, (item.price + (item.prices[0][item.varient] ))))}} />
                                        <span className='quantity'>{item.quantity}</span>
                                        <FontAwesomeIcon icon={faMinusCircle}
                                         onClick={() => {dispatch(addToCart(item,+ item.quantity-1, item.varient,item.crust,item.toppings, (item.price -(item.prices[0][item.varient]))))}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                <div className="cart-col">
                    <div className="cartTotal">
                        <h2 className="totalprice">Total Price: ${(totalPrice)}</h2>
                        <button onClick={checkoutHandler}><FontAwesomeIcon icon={faMoneyBill} /> Checkout</button>
                    </div>
                </div>
            </div>
             :<>
             <div className="cart-col">
                    <div className="cartTotal">
             <h1 className='totalprice'> YOUR CART IS EMPTY</h1>
             <p className='totalprice'> <a href = '/'> Click here to add</a></p> 
             </div>
             </div>
             </> }
        </div>
    )
}

export default Cart
