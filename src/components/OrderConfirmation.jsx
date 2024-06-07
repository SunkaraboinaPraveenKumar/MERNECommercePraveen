import React,{useState,useEffect,useContext} from 'react'
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';
import OrderDetailsTable from './OrderDetails';
const OrderConfirmation = () => {
  const {cart,userAddress,user} = useContext(AppContext);
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
  }, [cart]);

  return (
    <div className='container my-5'>
      <h1 className='text-center'>Your Order has been Confirmed</h1>
      <h3 className='text-center'>It will be Delivered Soon....</h3>
      <div className="container">
        <h1 className='text-center my-3'>Order Summary</h1>

        <table className="table table-bordered border-primary bg-dark">
          <thead className='bg-dark'>
            <tr>
              <th scope="col" className='bg-dark text-light text-center'>Product Details</th>
              <th scope="col" className='bg-dark text-light text-center'>Shipping Address</th>
            </tr>
          </thead>
          <tbody className='bg-dark'>
            <tr>
              <td className='bg-dark text-light'>
                <OrderDetailsTable/>
              </td>
              <td className='bg-dark text-light'>
                <ul style={{fontWeight:'bold'}}>
                  <li>User Id: {userAddress?._id}</li>
                  <li>Name : {userAddress?.fullName}</li>
                  <li>Phone : {userAddress?.phoneNumber}</li>
                  <li>Country : {userAddress?.country}</li>
                  <li>State : {userAddress?.state}</li>
                  <li>City : {userAddress?.city}</li>
                  <li>Pincode : {userAddress?.pincode}</li>
                  <li>Nearby : {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
          <Link to='/' className='btn btn-warning btn-lg mx-3' style={{fontWeight:'bold'}}>
            Continue Shopping...
          </Link>
          <Link to='/orderDetails'  className='btn btn-info btn-lg' style={{fontWeight:'bold'}}>
             All Orders
          </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation