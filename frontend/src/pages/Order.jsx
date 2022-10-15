import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderActions'
import Navbar from '../components/navbar/Navbar'
import './order.css'

const Order = () => {

    const dispatch = useDispatch();

    const orderstate = useSelector(state => state.getUserOrdersReducer);
    const {orders, err, loading} = orderstate;

    useEffect(() => {

        dispatch(getUserOrders());

    }, [dispatch]);


  return (
    <>
    <Navbar />
    <div className='or-container'>
        <div className="or-row">
          <div className="or-col">
            <h2 className="or-title">Your Orders</h2>
          </div>
        </div>
        <div className="or-row">
            <div className="or-col">
                <div className="or-cards">
                    {loading ? (<h2 className='loading'>Loading...</h2>) : err ? (<h2 className='error'>Error...</h2>) : (
                        orders.map((order) => (
                            <div className="or-card">
                              <div className="or-header">
                                {order.orderItems.map((item) => (
                                  <>
                                    <h2 className='or-items'>{item.name} * {item.quantity} = Rs{(item.price)}/-</h2>
                                    <span className='or-varient'>{item.variant}</span>
                                  </>
                                ))}
                              </div>
                              <div className="or-body">
                                <p className='or-address'>Address</p>
                                <span className='or-address-span'>{order.shippingAddress}</span>
                              </div>
                              <div className="or-footer">
                                <p>Order Amount</p>
                                <span className='or-amount'>${order.orderAmount}</span>
                                <p className='or-date-title'>Date</p>
                                <span className='or-date'>{order.createdAt.substring(0,10)}</span>
                              </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Order
