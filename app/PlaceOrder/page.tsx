"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Checkout from "../components/Checkout";
import Link from "next/link";
import Image from "next/image";
import { Span } from "next/dist/trace";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const page = () => {

 //Hyrate in NextJS
    const [isClient, setIsClient] = useState(false)
 //

 // Hydrate
  useEffect(() => {
    setIsClient(true);
  }, []);

 
  const {
    CartItems,
    itemsPrice,
    totalPrice,
    taxPrice,
    shippingAddress,
    paymentMethod,
    hideloading,
  } = useSelector((state: any) => state.Cart);

  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/Payment");
    }
  }, [paymentMethod, router]);

  return (
    <>
   
    <div>
    <Navbar/>
    {isClient ? 
    (
      <>
      <Checkout activeStep={3} />
      <h1 className="text-4xl font-bold text-center mt-10 mb-20">
        Place Order
      </h1>
      {hideloading ? (
        <div>Loading</div>
      ) : CartItems.length === 0 ? (
        <div>
          Cart Is Empty. <Link href="/AllProductCard">Go Shopping</Link>
        </div>
      ) : (
     
        <div className=" container">
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <div className="p-2">
                {/********************Shipping Address****************************/}
                <h2 className="text-lg font-bold mb-2 border-b border-b-gray-950 decoration-2 w-44">
                  Shipping Address
                </h2>
                <div>
                  {shippingAddress.fullName}
                  <br />
                  {shippingAddress.address} <br />
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </div>
                <div className="mt-5">
                  <Link
                    href="/Shipping"
                    className="text-lg text-white bg-gradient-to-r from-black to-[#ec462d] py-2 px-8 w-40 mt-10 cursor-pointer"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              {/*******************End***********************/}
              <div className="overflow-x-auto p-2 ">
                {/*****************Order Items****************************/}
                <h2 className="text-lg font-bold mb-2 border-b border-b-gray-950 decoration-2 w-32 mt-5">
                  {" "}
                  Order Items{" "}
                </h2>
                <table className="min-w-full border">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">Item</th>
                      <th className="p-5 text-right">Quantity</th>
                      <th className="p-5 text-right">Price</th>
                      <th className="p-5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CartItems.map((item: any) => (
                      <tr key={item.id} className="border-b">
                        <td>
                          <Link href={`/ProductDetails/${item.id}`}>
                            <Image
                              src={item.Image}
                              alt={item.Image}
                              width={70}
                              height={70}
                              style={{
                                maxWidth: "100%",
                                height: "auto",
                              }}
                              className="p-1"
                            />
                            {item.name}
                          </Link>
                        </td>
                        <td className="p-5 text-right">{item.qty}</td>
                        <td className="text-right">${item.Price}</td>
                        <td className="p-5 text-right">
                          ${item.qty * item.Price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-5">
                  <Link
                    href="/AllProductCard"
                    className="text-lg text-white bg-gradient-to-r from-black to-[#ec462d] py-2 px-8 w-40 cursor-pointer mb-8"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>

            {/***************OrderSummary*******************/}
            <div>
              <div className="p-5 border mt-5">
                <h2 className="mb-2 text-lg">Order Summary</h2>
                <ul>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Items</div>
                      <div>${itemsPrice}</div>
                    </div>
                  </li>

                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Tax</div>
                      <div>${taxPrice}</div>
                    </div>
                  </li>

                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Total</div>
                      <div>${totalPrice}</div>
                    </div>
                  </li>
                  <li>
                    <button
                      className="text-lg text-white bg-gradient-to-r from-black to-[#ec462d] py-2 px-8 w-40 md:w-25 cursor-pointer "
                      onClick={() => alert("Not Implemented")}
                    >
                      Place Order
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      )}

    </>

    ): (<span>Loading....</span>)} 
    </div>
    <Footer/>
  
 
  </>
  
 
  );

};

export default page;
