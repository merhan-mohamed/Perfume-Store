"use client";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../Redux/slices/CartSlice';


const AddToCart = ({item, showqty=true, increasePerClick=false }:any) => {
    const dispatch = useDispatch()
    const {CartItems} = useSelector((state:any) => state.Cart)
    const [qty, setQty] = useState(1)

    const AddToCartHandle = () => {
        let newQty = qty
        if(increasePerClick){
            const existItem = CartItems.find((x:any) => x.id === item.id)
            if(existItem){
                if(existItem.qty + 1 <= item.countInStock){
                    newQty = existItem.qty + 1

                }else{
                    return alert ("No More Prouct Exist")
                }
            }
        }
        dispatch(addToCart({...item, qty:newQty}))
    }

  return (
<>
    <div>
    {/**************Select Quantity******************/}
      {item.countInStock > 0  && showqty && (
        <div className='mb-2 mt-2 flex justify-between'>
            <div>QTY</div>
            <div>
                <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}>
                    {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x+1} value={x+1}>
                            {x + 1}
                        </option>
                    ))}
                </select>{' '}
            </div>
        </div>
      )}
      
      <div className='text-center'>
        {item.countInStock > 0 ? (
            <button className='bg-[#ec462d] py-2 px-12 md:px-0 w-full rounded-sm text-white mt-3 cursor-pointer' onClick={AddToCartHandle}>
                Add To Cart
            </button>
        ): <button className='disabled'> Out Of Stock</button>}
      </div>
    </div>
   </>
  )
}

export default AddToCart
