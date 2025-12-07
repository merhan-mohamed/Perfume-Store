import { AllProducts } from '@/lib/AllProducts';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from '../../components/AddToCart';
import Navbar from '@/app/components/Navbar';


interface ProductID {
    id : number
}

const page = async({params}:any) => {
    const {id} = (await params)
    console.log((id))
    console.log(AllProducts)
    const Details = (AllProducts.find(x => (x.id) === Number(id)))
    console.log("details" , (Details) )
    if(!Details){
        return <div>Product Not Found</div>
    }
  return (
    <>
    <Navbar/>
    <div className='container'>
        <div className='mt-5'>
            <Link href="/AllProductCard" className='py-2 bg-white border-2 border-gray-500 p-2'>Back To Products</Link>
        </div>
        <div className='grid md:grid-cols-4 md:gap-3'>
            <div className='md:col-span-2'>
                <Image src={Details.Image} width={500} height={500} alt="Image" sizes="100vw" className='border border-2 border-gray-100 mt-5'/>
            </div>

            <div className='flex flex-col mt-6'>
            <div>
                <ul>
                    <li>
                        <h1 className='text-lg font-bold'>{Details.Name}</h1>
                    </li>
                    <li>
                        <hr className='my-3'/>
                        {/*******<p>{ProductDetails.Description}</p>*****/}
                    </li>
                </ul>
            </div>
            <div>
                <div className='p-5'>
                    <div className='mb-2 flex justify-between'>
                        <div>Price</div>
                        <div>${Details.Price}</div>
                    </div>

                <AddToCart item={Details} />
                </div>
            </div>
            </div>
        </div>
      
    </div>
    </>
  )
}

export default page
