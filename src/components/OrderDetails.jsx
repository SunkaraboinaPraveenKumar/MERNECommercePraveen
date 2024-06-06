import React, { useState, useEffect, useContext } from 'react'
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom';
const OrderDetailsTable = () => {
    const { cart, userAddress } = useContext(AppContext);
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
            <div className="container text-center my-3 mx-3">
                <div className="container">
                    <b>User Id:</b> {userAddress?._id}
                </div>
                <div className="container">
                    <b>Name:</b> {userAddress?.fullName}
                </div>
            </div>
            <table className="table table-bordered border-primary bg-dark text-center my-5">
                <thead>
                    <tr>
                        <th scope="col" className='bg-dark text-white text-center'>Product Img</th>
                        <th scope="col" className='bg-dark text-white text-center'>Title</th>
                        <th scope="col" className='bg-dark text-white text-center'>Price</th>
                        <th scope="col" className='bg-dark text-white text-center'>Qty</th>
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
                        </tr>
                    ))}
                    <tr>
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
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default OrderDetailsTable