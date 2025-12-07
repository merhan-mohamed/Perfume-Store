"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Redux/slices/CartSlice";
import Checkout from "../components/Checkout";
import Navbar from "../components/Navbar";

const Shipping = () => {
  //React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  //
  const router = useRouter();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state: any) => state.Cart);

  useEffect(() => {
    setValue("fullName", shippingAddress?.fullName);
    setValue("address", shippingAddress?.address);
    setValue("city", shippingAddress?.city);
    setValue("postalCode", shippingAddress?.postalCode);
    setValue("country", shippingAddress?.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }: void & any) => {
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );

    router.push("/Payment");
  };



  return (
    <>
    <Navbar/>
    <div className="container mt-10">
      
      <Checkout activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-4xl font-bold text-center mt-10 mb-20">Shipping Address</h1>
        <div className="data">
        {/****FullName****/}
        <div className="text-center mb-5">
          <label htmlFor="fullName" className="text-xl">Full Name</label>
          <input
            className="w-full ml-5"
            id="fullName"
            autoFocus
            {...register("fullName", {
              required: "Please Enter Your Name",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        {/****Address****/}
        <div className="Address text-center mb-5">
          <label htmlFor="fullName" className="text-xl">Address</label>
          <input
            className="w-full ml-10"
            id="address"
            autoFocus
            {...register("address", {
              required: "Please Enter Your Address",
              minLength: {
                value: 3,
                message: "Address more than 2 chars",
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        {/****PostalCode****/}
        <div className="text-center mb-5">
          <label htmlFor="fullName" className="text-xl">Postal Code</label>
          <input
            className="w-full ml-4"
            id="postal code"
            autoFocus
            {...register("postalCode", {
              required: "Please Enter Your PostalCode",
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        {/****Country****/}
        <div className="Country text-center">
          <label htmlFor="fullName" className="text-xl w-full">Country</label>
          <input
            className="w-full ml-10"
            id="country"
            autoFocus
            {...register("country", {
              required: "Please Enter Your Country",
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        </div>

        <div className="mb-4 text-center">
          <button className="text-lg text-white bg-gradient-to-r from-black to-[#ec462d] py-1 px-1 w-40 mt-10 cursor-pointer">Next</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Shipping;
