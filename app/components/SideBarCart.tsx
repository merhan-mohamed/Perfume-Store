import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { addToCart, removeFromCart } from '../Redux/slices/CartSlice'
import { usePathname } from 'next/navigation'

const SideBarCart = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector((state:any) => state.Cart)

    // Add To Cart
    const addToCartHandler = (product:any, qty:any) => {
        dispatch(addToCart({...product , qty}))
    }
    // remove From Cart
    const RemoveFromCartHandler = (id:any) => {
        dispatch(removeFromCart(id))
    }
    const {CartItems, itemsPrice} = useSelector((state:any) => state.Cart)
    const pathname = usePathname()

   return (
    <div className={loading 
        ? " " 
        : CartItems.length > 0  
        ? "fixed top-0 right-0 w-32 h-full shadow-lg border-l-gray-700 border-l bg-black text-white z-100" 
        :"hidden"}
    
    
   >
        {loading ? ( <div className='py-5 px-2'>
            Loading....
        </div>) : CartItems.length === 0 ? (
            <div className='py-3 px-2'>Cart is Empty</div>
        ) : 
        (
        <>
        <div className='p-2 flex flex-col items-center border-b mb-2 border-b-gray-600 '>
            <div>
                SubTotal
            </div>
            <div className='font-bold text-orange-700 mb-2'>
                ${itemsPrice}
            </div>
            <div>
                <Link href="/Cart"
                className='w-full text-center p-1 rounded-xs border-2 mb-2'>
                    Go To Cart
                </Link>
            </div>
           
            {/*******maping all items********/}
            {CartItems.map((item:any) => (
                <div key={item.Name} className='flex flex-col mt-2'>
                   <Link href={`/ProductDetails/${item.id}`}>
                        <Image src={item.Image} width={50} height={50} className="p-1 mb-2 cursor-pointer" alt='Image' />
                    </Link>
                    <select
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    
                    >
                        {[...Array(item.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1} className='bg-black'>
                                {x + 1}
                            </option>
                        ))}
                    </select>
                    <button className='default-button mt-2 cursor-pointer' onClick={() => RemoveFromCartHandler(Number(item.id))}>Delete</button>
                    <div className='border-b border-white mb-3'></div>
                    
                </div>
            ))}
        </div>
       
        </>
        )}
      
    </div>
  )
}

export default SideBarCart
