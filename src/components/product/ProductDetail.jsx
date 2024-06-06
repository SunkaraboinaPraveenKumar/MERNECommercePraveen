import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RelatedProduct from './RelatedProduct';
import AppContext from '../../context/AppContext';
const ProductDetail = () => {
    const {id}=useParams();
    const {addToCart} =useContext(AppContext)
    const url="https://mern-ecommerce-api1.onrender.com/api"
  const [product, setProduct] = useState([])
  useEffect(() => {
    const fetchProduct=async()=>{
      const api=await axios.get(`${url}/product/${id}`,{
        headers:{
          "Content-Type":"Application/json"
        },
        withCredentials:true,
      })
      setProduct(api?.data.product)
      // console.log(api?.data.product);
    } 
    fetchProduct();
  }, [id])
  return (
    <>
    <div className="container text-center my-5" style={{
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center'
    }}>
        <div className="left">
            <img src={product?.imgSrc} alt="" style={{width:'250px',height:'250px',borderRadius:'10px',border:"2px solid yellow"}} />
        </div>
        <div className="right">
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
            <h1>{product?.price}{" "}₹</h1>
            <div className='my-5'>
                <button className='btn btn-danger mx-3' style={{fontWeight:'bold'}} onClick={() => addToCart(product?.productId, product?.title, product?.price / product?.qty, 1, product?.imgSrc)}>Buy Now</button>
                <button className='btn btn-warning' style={{fontWeight:'bold'}} onClick={() => addToCart(product?.productId, product?.title, product?.price / product?.qty, 1, product?.imgSrc)}>Add To Cart</button>
            </div>
        </div>
    </div>

    <RelatedProduct category={product?.category}/>
    </>
  )
}

export default ProductDetail