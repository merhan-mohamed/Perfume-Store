"use client";

import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Navbar = () => {
  //Cart Items
  const { loading, CartItems } = useSelector((state: any) => state.Cart);
  // Session For Cart
  const { data: session } = useSession();
  // Query for Search

  const router = useRouter();

 //Sign Out Function and Redirect
  function HandleLogout() {
    if (session) {
      signOut();
      router.push("http://localhost:3000/");
    } else {
      router.push("/Register");
    }
  }

  return (
    <div>
      {/* First Black Row in NavBar */}
      <div className="bg-black text-white p-3 text-xs mb-7">
        <div>
          <ul className="flex items-center gap-5 md:ml-[110px] xs:ml-[45px]">
            <li>
              <Link href="/AllProductCard">shop</Link>
            </li>
            <li>
              <Link href="#">Blogs</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        {/*Logo With SignIn And SignUP*/}
        <div className="flex flex-row justify-between mb-5">
          {/* Logo */}
          <div className="">
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={150}
                height={150}
                alt="Perfume logo"
              />
            </Link>
          </div>
         {/* Auth & Cart */}
          <div className="authBtn xs:ml-[18px]">
            <ul className="flex justify-center lg:justify-between items-center gap-3">
              <li>
                <Link
                  href="/SignIn"
                  className=" hover:text-[#ec462d] hover:bg-white bg-gradient-to-r from-black to-[#ec462d]  text-white py-2 px-4 rounded-sm "
                >
                  {`${session ? `Hello ${session?.user?.name}` : "SigIn"}`}
                </Link>
              </li>
              <li className=" hover:text-[#ec462d] cursor-pointer" onClick={HandleLogout}>
                {`${session ? "LogOut" : "SignUp"} `}
              </li>
              {session && (
                <li className="rounded-full align-center relative">
                 
                    {/********Cart Icon Section***********/}
                    <div className="">
                      <span className="bg-[#ec462d] absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-center text-xs flex items-center justify-center ">
                        {/***When Cart Is Empty Or Have Items***/}
                        {loading 
                          ? CartItems.length
                          : CartItems.reduce((a: any, c: any) => a + c.qty, 0)}
                      </span>
                      <Link href="/Cart">
                        <CiShoppingCart
                          size="30px"
                          color="#ec462d"
                          className="mt-[5px] mx-auto relative pointer"
                        />
                      </Link>
                    </div>
                    {/*********End Cart Section***********/}
                  
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
