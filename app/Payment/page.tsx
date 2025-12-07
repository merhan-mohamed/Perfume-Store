"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../Redux/slices/CartSlice";
import Checkout from "../components/Checkout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Shipping = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod } = useSelector((state) => state.Cart);

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/Shipping");
    }
    setValue("paymentMethod", paymentMethod);
  }, [setValue, shippingAddress, paymentMethod]);

  const submitHandler = ({ paymentMethod }:any) => {
    dispatch(savePaymentMethod(paymentMethod));

    router.push("/PlaceOrder");
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <Checkout activeStep={2} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-4xl font-bold text-center mt-10 mb-20">Shipping Address</h1>
        {["Instapay", "Visa", "CashonDelivery"].map((payment) => (
          <div className="mb-4" key={payment}>
            <div className="payment">
            <input
              type="text"
              name="paymentMethod"
              className="outline-none focus:ring-0 "
              id={payment}
              type="radio"
              value={payment}
              {...register("paymentMethod", {
                required: "Please Enter Your Address ",
              })}
            />

            <label htmlFor="{payment}" className="">{payment}</label>
            </div>
          </div>
        ))}

        {errors.paymentMethod && (
          <div className="text-red-500">{errors.paymentMethod.message}</div>
        )}

         <div className="mb-4 text-center">
          <button className="text-lg text-white bg-gradient-to-r from-black to-[#ec462d] py-1 px-1 w-40 mt-10 cursor-pointer">Next</button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Shipping;
