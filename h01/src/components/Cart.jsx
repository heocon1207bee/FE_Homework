import '../css/Cart.css'
import React from 'react';
import {MdDeleteForever} from 'react-icons/md'
import { ProductContext } from './Layout'

function Cart(props) {
    const {cart, handleAddCart, handleMinusCart, handleDeleteCart} = React.useContext(ProductContext)
    return (
        <div className='cart-container'>
            <div className='cart'>
                <h2>Your cart: </h2>
                {
                    cart.length > 0 ? (
                        cart.map(item => {
                            return (
                                <div className='cart-item' key={item.id}>
                                    <h4 style={{flex: "50%", textAlign: "left"}}>{item.name}</h4>
                                    <p style={{flex: "20%"}}>{item.price * item.amount}$</p>
                                    <div className='cart-item-amount' style={{flex: "20%"}}>
                                        <button onClick={() => handleMinusCart(item.id)}>-</button>
                                        <p>{item.amount}</p>
                                        <button onClick={() => handleAddCart(item.id, item.name, item.price)}>+</button>
                                    </div>
                                    <button className='delete-btn' style={{flex: "10%"}} onClick={() => handleDeleteCart(item.id)}><MdDeleteForever/></button>
                                </div>
                            )
                        })
                    ) : (
                        <p className='cart-item'>Your cart is empty...</p>
                    )
                }
            </div>
        </div>
    );
}

export default Cart;