import React, { useContext, useState, useEffect } from 'react'
import AppContext from '../context/AppContext';
const ProductsTable = ({ cart }) => {
    const { decreaseQty, addToCart, removeItem, clearCart } = useContext(AppContext);
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    useEffect(() => {
        let qty = 0;
        let price = 0;
        if (cart?.items) {
            for (let i = 0; i < cart?.items?.length; i++) {
                qty += cart.items[i].qty;
                price += cart.items[i].price
            }
        }
        setQty(qty)
        setPrice(price)
    }, [cart])
    return (
        <>
            <table className="table table-bordered border-primary bg-dark text-center">
                <thead>
                    <tr>
                        <th scope="col" className='bg-dark text-white text-center'>Product Img</th>
                        <th scope="col" className='bg-dark text-white text-center'>Title</th>
                        <th scope="col" className='bg-dark text-white text-center'>Price</th>
                        <th scope="col" className='bg-dark text-white text-center'>Qty</th>
                        <th scope="col" className='bg-dark text-white text-center'>Qty--</th>
                        <th scope="col" className='bg-dark text-white text-center'>Qty++</th>
                        <th scope="col" className='bg-dark text-white text-center'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.items?.map((product) => (
                        <tr key={product._id}>
                            <td className='bg-dark text-white text-center'>
                                <img src={product.imgSrc} alt="" style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td className='bg-dark text-white text-center'>
                                {product.title}
                            </td>
                            <td className='bg-dark text-white text-center'>
                                {product.price}
                            </td>
                            <td className='bg-dark text-white text-center'>
                                {product.qty}
                            </td>
                            <td className='bg-dark text-white text-center'>
                                <span 
                                className="material-symbols-outlined"
                                onClick={() => decreaseQty(product?.productId, 1)}
                                style={{cursor:'pointer'}}
                                >
                                do_not_disturb_on
                                </span>
                            </td>
                            <td className='bg-dark text-white text-center'>
                                <span 
                                className="material-symbols-outlined"
                                onClick={() => addToCart(product?.productId, product?.title, product?.price / product?.qty, 1, product?.imgSrc)}
                                style={{cursor:'pointer'}}
                                >
                                add_circle
                                </span>
                            </td>
                            <td 
                            className='bg-dark text-white text-center'
                            onClick={() => {
                                if (confirm("Are You Sure Want to remove item from cart")) {
                                  removeItem(product?.productId)
                                }
                              }}
                            style={{cursor:'pointer'}}
                            >
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td className='bg-dark text-white text-center'></td>
                        <td className='bg-dark text-white text-center'></td>
                        <td className='bg-dark text-white text-center'>
                            {" "}
                            <button className='btn btn-primary' style={{ fontWeight: 'bold' }}>
                                Total
                            </button>
                        </td>
                        <td className='bg-dark text-white text-center'>
                            {" "}
                            <button className='btn btn-warning' style={{ fontWeight: 'bold' }}>
                                {price}
                            </button>
                        </td>
                        <td className='bg-dark text-white text-center'>
                            {" "}
                            <button className='btn btn-info' style={{ fontWeight: 'bold' }}>
                                {qty}
                            </button>
                        </td>
                        <td className='bg-dark text-white text-center'></td>
                        <td className='bg-dark text-white text-center'></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ProductsTable