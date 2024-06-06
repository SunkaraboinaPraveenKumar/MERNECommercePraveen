import React, { useState, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { useContext } from 'react'
import { Modal } from 'react-bootstrap';
import Payment from './Payment'
import ProductsTable from './ProductsTable'

const Checkout = () => {
  const {cart,userAddress,url,user} = useContext(AppContext);
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false); // State to control the checkout modal visibility

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

  // Function to handle showing the checkout modal
  const handleShowCheckoutModal = () => {
    setShowCheckoutModal(true);
  };

  return (
    <>
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
                <ProductsTable cart={cart}/>
              </td>
              <td className='bg-dark text-light'>
                <ul style={{fontWeight:'bold'}}>
                  <li>Name : {userAddress?.fullName}</li>
                  <li>Phone : {userAddress?.phoneNumber}</li>
                  <li>Country : {userAddress?.country}</li>
                  <li>State : {userAddress?.state}</li>
                  <li>Pincode : {userAddress?.pincode}</li>
                  <li>Nearby : {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
          <button className='btn btn-secondary btn-lg' style={{fontWeight:'bold'}} onClick={handleShowCheckoutModal}>
            Proceed To Pay
          </button>
      </div>

      {/* Render the Checkout modal */}
      <Modal
        show={showCheckoutModal}
        onHide={() => setShowCheckoutModal(false)}
        animation={false}
        centered
      >
      <Payment/>
      </Modal>
    </>
  )
}

export default Checkout
