"use client";

import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "../Redux/slices/CartSlice";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const page = () => {
  //Hyrate in NextJS
  const [isClient, setIsClient] = useState(false);
  //
  const dispatch = useDispatch();
  const router = useRouter();
  const { hideloading, CartItems, itemsPrice } = useSelector(
    (state: any) => state.Cart
  );

  // Hydrate
  useEffect(() => {
    setIsClient(true);
  }, []);

  const RemoveFromCartHandler = (id: number[] & void) => {
    dispatch(removeFromCart(id));
  };

  const addToCartHandler = async (item: any, qty: any) => {
    dispatch(addToCart({ ...item, qty }));
  };
  return (
    <>
      <div>
        <Navbar />
        {isClient ? (
          <div className="container">
            <h1 className="text-4xl font-bold text-center mt-10 mb-20 ">
              Shopping Cart
            </h1>
            {/*************When Cart Is Empty*****************/}
            {hideloading ? (
              <div>Loading....</div>
            ) : CartItems.length === 0 ? (
              <div>
                Cart Is Empty.
                <Link href="/AllProductCard">Go To Store</Link>
              </div>
            ) : (
              <>
                <div className="PlaceOrderTable grid">
                  <div className="overflow-x-auto md:col-span-3">
                    {/****************When Cart Have Items*****************************/}
                    <table className="min-w-full border border-2 border-gray-300">
                      <thead className="border-b">
                        <tr>
                          <th className="p-5 text-left">Product</th>
                          <th className="p-5 text-left">Quantity</th>
                          <th className="p-5 text-right">Price</th>
                          <th className="p-5">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CartItems.map((item: any) => (
                          <tr key={item.id} className="border-b">
                            <td>
                              <Link
                                className="flex items-center"
                                href={`/ProductDetails/${item.id}`}
                              >
                                <Image
                                  src={item.Image}
                                  width={50}
                                  height={50}
                                  className="p-1"
                                  alt="image"
                                />
                                {item.Name}
                              </Link>
                            </td>
                            <td className="p-[30px]">
                              <select
                                value={item.qty}
                                onChange={(e) =>
                                  addToCartHandler(item, Number(e.target.value))
                                }
                              >
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <option
                                      value={x + 1}
                                      key={x + 1}
                                    >
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </td>
                            <td className="p-5 text-right">${itemsPrice}</td>
                            <td className="p-5 text-center">
                              <button
                                className="default-button"
                                onClick={() => RemoveFromCartHandler(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-5">
                  {/***********SubTotal Items**********************/}
                  <div className="text-end font-bold mt-2">
                    Subtotal(
                    {CartItems.reduce((a: any, c: any) => a + c.qty, 0)}) : $
                    {itemsPrice}
                  </div>

                  {/************ Go To Shipping Page**********************/}
                  <div className="w-60 mx-auto mt-14">
                    <button
                      className="bg-gradient-to-r from-black to-[#ec462d] text-white  px-8 py-5 cursor-pointer"
                      onClick={() => router.push("/Shipping")}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <span>Loading.......</span>
        )}
      </div>
    </>
  );
};

export default page;
