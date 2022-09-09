import '../css/Product.css'
import React from 'react';
import {ProductContext} from "./Layout";

function Product(props) {
    const {data, handleAddCart} = React.useContext(ProductContext)
    return (
        <div className='product-container'>
            {
                data.map(product => {
                    return (
                        <div className='product-item' key={product.id}>
                            <img src={product.image} alt='image'/>
                            <h3 className='product-name'>{product.name}</h3>
                            <p>Price: {product.price}</p>
                            <p className='product-des'>{product.description}</p>
                            <button onClick={() => handleAddCart(product.id, product.name, product.price)}>Add to cart</button>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Product;