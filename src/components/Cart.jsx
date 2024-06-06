import React, { useState, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
const Cart = () => {
  const { cart, decreaseQty, increaseQty, addToCart, removeItem, clearCart } = useContext(AppContext);
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
  // console.log(cart)
  return (
    <>
      {
        cart?.items?.length == 0 ? (
          <>
            <div className='text-center my-5'>
            <Link to="/" className="btn btn-warning mx-3" style={{ fontWeight: 'bold' }}>
              Continue Shopping....
            </Link>
            </div>
          </>
        ) :
          (
            <>
              <div className='my-5 text-center'>
                <button className=" btn btn-info mx-3" style={{ fontWeight: 'bold' }}>
                  Total QTY :- {qty}
                </button>
                <button className="btn btn-warning" style={{ fontWeight: 'bold' }}>
                  Total Price :- {price}
                </button>
              </div>
            </>
          )
      }
      {
        cart?.items?.map((product) => (
          <div key={product._id} className='container my-3 bg-dark text-center'>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
              <div className="cart_img">
                <img src={product?.imgSrc} alt="" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
              </div>
              <div className="cart_des">
                <h2>{product.title}</h2>
                <h2>{product.price}</h2>
                <h3>Qty:- {product.qty}</h3>
              </div>
              <div className="cart_action">
                <button className="btn btn-warning mx-3" onClick={() => decreaseQty(product?.productId, 1)} style={{ fontWeight: 'bold' }}>Qty--</button>
                <button className="btn btn-info mx-3" style={{ fontWeight: 'bold' }} onClick={() => addToCart(product?.productId, product?.title, product?.price / product?.qty, 1, product?.imgSrc)}>Qty++</button>
                <button className="btn btn-danger mx-3"
                  style={{ fontWeight: 'bold' }}
                  onClick={() => {
                    if (confirm("Are You Sure Want to remove item from cart")) {
                      removeItem(product?.productId)
                    }
                  }}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      }
      {cart?.items?.length > 0 && (
        <>
          <div className="container text-center my-3">
            <Link to="/shipping" className="btn btn-warning mx-3"
              style={{ fontWeight: 'bold' }}
            >Checkout
            </Link>
            <button className="btn btn-danger mx-3"
              style={{ fontWeight: 'bold' }}
              onClick={() => {
                if (confirm("Are You Sure Want to Clear Cart")) {
                  clearCart();
                }
              }}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default Cart