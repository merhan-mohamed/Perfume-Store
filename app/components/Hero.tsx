"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hero = () => {
//Caurousal Fun
    const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  //ImageURL Items
  const ArrayItem = [
    { id : 1,
      ImageURL: "/images/slider2.jpg"
    },
    {
      id : 2,
      ImageURL: "/images/slider1.jpg"
    }
  ]
  return (
    <div className="Hero container mt-10">
        {/*************Carousal********************/}
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-330 mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {ArrayItem.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="relative">
                    <Card className="h-full border-0 p-0">
                      <CardContent className="bgImage h-[620px] border-0 bg-center bg-no-repeat position-center" 
                      style={{ backgroundImage:`url(${item.ImageURL})`}}>
                      </CardContent>
                      <div className="description pt-20 pl-20 mb-1 absolute">
                          <h1 className="font-bold text-6xl mb-1 text-white">
                           Take <span className="text-[#D51243]">Perfume</span> <br/> In Style
                          </h1>
                          <p className="mb-3 mt-3 text-white">It is a long established fact <br/> that reader will be distracted</p>

                          <div className="ShopBTN bg-white py-3 px-5 w-32 cursor-pointer">
                            Shop Now 
                          </div>
                        </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="previous lg:hidden"/>
            <CarouselNext  className="next lg:hidden"/>
          </Carousel>
    </div>
  )
}

export default Hero
