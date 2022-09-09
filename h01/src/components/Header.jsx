import '../css/Header.css'
import React, {useContext} from 'react';
import {BsFillCartFill, BsFillCartXFill} from 'react-icons/bs'
import Product from "./Product";
import {ProductContext} from "./Layout";

function Header(props) {
    const {cart, cartDisplay, handleCartDisplay} = React.useContext(ProductContext)
    const [amount, setAmount] = React.useState(0)
    React.useEffect(() => {
        let a = 0
        cart.map(item => {
            a = a + item.amount
        })
        setAmount(a)
    }, [cart])
    return (
        <div className="header">
            <h1>SHOPEE</h1>
            <div className="cart-header">
                <button className='cart-btn' onClick={handleCartDisplay}>{cartDisplay?<BsFillCartXFill/>:<BsFillCartFill/>}</button>
                <div className="cart-amount">{amount}</div>
            </div>
        </div>
    );
}

export default Header;