import React from 'react'
import{faHome} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../../actions/userActions';
import './navbar.css'

const Navbar = () => {

  const cartState = useSelector(state=>state.cartReducer);
  const userState = useSelector(state=>state.loginUserReducer);
  const {currentUser} = userState;
  const dispatch = useDispatch();

  return (
    <div className='n-navbar'>
        <div className="n-row">
            <div className="n-col">
                <a href="/" className="n-logo"> <FontAwesomeIcon icon={faHome}/>PIZZASHOP</a>                
            </div>
            <div className="n-col">
                {currentUser ? (
                  <>
                    <a href="/"> Welcome {currentUser.name}</a>
                    <a href="/orders">Orders</a>
                    <a href="#" onClick={() => {dispatch(logout())}}>LogOut</a>
                    <a href="/cart">Cart <span className="badge">{cartState.cartItems.length}</span></a>
                  </>
                ) : (
                  <>
                  <a href="/login">Login</a>
                  <a href ="/register">Register</a>
                  <a href="/login">Cart <span className="badge">{cartState.cartItems.length}</span></a>
                  </>
                )}
                
            </div>
        </div>
    </div>
  )
}

export default Navbar