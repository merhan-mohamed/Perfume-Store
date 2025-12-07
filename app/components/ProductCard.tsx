"use client";

import { useState, useEffect } from "react";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { products } from "@/types";
import Image from "next/image";
import PaginationSection from "./Pagination";
import AddToCart from "./AddToCart";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";




export function ProductCard({ results }: any) {
  const [productDetails, setProductDetails] = useState<products[]>([]);
  {/***********Pagination State****************/}
  const [currentpage, setCurrentPage] = useState(1);
  const [itemperpage, setItemPerPage] = useState(4);
  const LastItemIndex = currentpage * itemperpage;
  const FirstItemIndex = LastItemIndex - itemperpage;
  const CurrentItems = productDetails.slice(FirstItemIndex, LastItemIndex);
  {/*******************************************/}


   // Query for Search
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
  
    //URL Search as Server Side
    function HandleSearch(term: string) {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    }

  //Fetch Data From API
  useEffect(() => {
    async function FetchData() {
      try {
        const response = await fetch(`/api/AllProducts`);
        if (!response.ok) throw new Error("Failed To Fetch");
        const data = await response.json();
        if (results.length > 0) {
          setProductDetails(results);
        } else {
          setProductDetails(data);
        }
      } catch (error: any) {
        throw new Error(error);
      }
    }
    FetchData();
  }, [results.length]);
  return (
    <>
      {/* Search Bar  */}
      <div className="container">
      <div className="mb-14 mt-10 md:w-[35rem] mx-auto xs:w-[18rem]">
        <InputGroup className=" bg-[#F3F4F7] ">
          <InputGroupInput
            placeholder="Search for Products..."
            className=""
            onChange={(e) => HandleSearch(e.target.value)}
            defaultValue={searchParams.get("query")?.toString()}
          />
        </InputGroup>
      </div>
      

      {/***************Cards************************/}
      <div className="grid grid-rows-1 xl:grid-cols-4 gap-4 xl:w-[75rem] md:w-[40rem] md:grid-cols-2 mx-auto">
        {CurrentItems.map((item) => (
          <Card className="group w-full overflow-hidden" key={item.Name}>
            <CardContent className="p-4">
              <div className="aspect-square rounded-md mb-3 relative overflow-hidden">
                <Link href={`/ProductDetails/${item.id}`}>
                  <Image
                    src={item.Image}
                    width={1000}
                    height={1000}
                    alt={item.Name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              </div>

              <CardTitle className="text-lg font-bold mb-1 h-12 line-clamp-2 font-semibold">
                {item.Name}
              </CardTitle>

              {/* Description: Removed unnecessary line-clamp */}
              <CardDescription className="text-xs mb-2 font-bold w-50">
                {item.Brand} Since from {item.Year} made in {item.Country}
              </CardDescription>

              <div className="flex items-center space-x-1 mb-2">
                <span className="text-xs text-muted-foreground">
                  {item.rating} Review
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#D51243]">
                  ${item.Price}
                </span>
              </div>

            {/***********Add To Cart Component***************/}
              <div className="qty flex flex-col items-stretch mt-5">
                <AddToCart showqty={true} item={item} increasePerClick={true} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/**********************Pagination**********************************/}
      <PaginationSection
        totalItems={productDetails.length}
        itemperpage={itemperpage}
        CurrentPage={currentpage}
        setCurrentPage={setCurrentPage}
      />
      </div>
    </>
  );
}

export default ProductCard;
