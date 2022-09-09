import React from 'react';
import Header from "./Header";
import Product from "./Product";
import Cart from "./Cart";

export const ProductContext = React.createContext({})

function Layout(props) {
    const [data, setData] = React.useState([])
    const [cart, setCart] = React.useState([])
    const [cartDisplay, setCartDisplay] = React.useState(false)

    const fetchData = async () => {
        const res = await fetch('https://631a3ff1dc236c0b1eda9721.mockapi.io/api/product')
        if(res.ok) {
            const dataRes =  await res.json()
            setData(dataRes)
        }else {
            console.log('Error occurred while fetching data')
        }
    }

    React.useEffect(() => {
        fetchData()
        setCart(localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [] )
    }, [])

    const handleCartDisplay  = () => {
        setCartDisplay(!cartDisplay)
    }

    const handleAddCart = (id, name, price) => {
        if(cart.filter(item => item.id === id).length === 0) {
            const newCartItem = {id, name, price, amount: 1}
            const newCart = [...cart, newCartItem]
            newCart.sort((a, b) => {return a.name > b.name})
            localStorage.setItem('cartItem', JSON.stringify(newCart))
            setCart(newCart)
        } else {
            const oldCartItem = cart.find(item => item.id === id)
            const newCartItem = {...oldCartItem, amount: oldCartItem.amount + 1}
            const oldCart = cart.filter(item => item.id !== id)
            const newCart = [...oldCart, newCartItem]
            newCart.sort((a, b) => {return a.name > b.name})
            localStorage.setItem('cartItem', JSON.stringify(newCart))
            setCart(newCart)
        }
    }

    const handleMinusCart = (id) => {
        const oldCartItem = cart.find(item => item.id === id)
        if(oldCartItem.amount === 1) {
            const newCart = cart.filter(item => item.id !== id)
            newCart.sort((a, b) => {return a.name > b.name})
            localStorage.setItem('cartItem', JSON.stringify(newCart))
            setCart(newCart)
        } else {
            const newCartItem = {...oldCartItem, amount: oldCartItem.amount - 1}
            const oldCart = cart.filter(item => item.id !== id)
            const newCart = [...oldCart, newCartItem]
            newCart.sort((a, b) => {return a.name > b.name})
            localStorage.setItem('cartItem', JSON.stringify(newCart))
            setCart(newCart)
        }
    }

    const handleDeleteCart = (id) => {
        const newCart = cart.filter(item => item.id !== id)
        newCart.sort((a, b) => {return a.name > b.name})
        localStorage.setItem('cartItem', JSON.stringify(newCart))
        setCart(newCart)
    }

    return (
        <ProductContext.Provider value={{data, cart, handleAddCart, handleMinusCart, handleDeleteCart, cartDisplay, handleCartDisplay}}>
            <Header />
            {
                cartDisplay ? <Cart /> : <Product />
            }
        </ProductContext.Provider>
    );
}

export default Layout;