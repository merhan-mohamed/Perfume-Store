"use client";
import { AllProducts } from "@/lib/AllProducts";
import ProductCard from "../components/ProductCard";
import { products } from "@/types";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideloading } from "../Redux/slices/CartSlice";
import SideBarCart from "../components/SideBarCart";


function fetchData(query: any) {
  if (!query) {
    console.log("q", query);
    return AllProducts;
  }
  const filteredItems = AllProducts.filter((item) =>
    item.Name.toLowerCase().includes(query.toLowerCase())
  );
  console.log("fI", filteredItems);
  return filteredItems;
}

const AllProductsCard = () => {
  const SearchParams = useSearchParams();
  const queryURL = SearchParams.get("query") || "";
  console.log("q", queryURL);
  const results: products[] = fetchData(queryURL);
  const dispatch = useDispatch()

  useEffect(() => {
     dispatch(hideloading())
    }, [dispatch])

  return (
    
    <div>
      <>
       <Suspense>
        <Navbar/>
        <SideBarCart/>
        <ProductCard results={results} />
        <Footer/>
        </Suspense>
      </>
    </div>
  );
};

export default AllProductsCard;
