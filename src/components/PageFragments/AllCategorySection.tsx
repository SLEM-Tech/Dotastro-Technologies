"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { heroBg } from "@public/images";
import HeroCarousel from "../Cards/HeroCarousel";
import Image from "next/image";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  //@ts-ignore
  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0
                  ? response?.data[0]?.images[0]?.src
                  : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      {/* Hero Concept inspired by the image */}
      <div className="relative bg-[#060809] overflow-hidden">
        <div className="max-w-[1350px] mx-auto px-2 lg:px-0 min-h-screen flex items-center">
          {/* Main Flex */}
          <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
            {/* ================= LEFT CONTENT ================= */}
            <div className="max-w-[800px] text-left mt-[-65px] md:mt-0 ">
              <h1
                className=" max-w-[686px] text-[22px]  sm:text-[44px] lg:text-[50px] 
                       font-bold text-white leading-[1.1] tracking-[-0.5px]"
              >
                Sophisticated Accessories For Your Computer
              </h1>

              <p className="mt-2 md:mt-6 text-gray-400 text-[14px] sm:text-[18px] leading-relaxed max-w-[560px]">
                Elegant Designs, Exceptional Results, Elevating Your Computer
                Experience.
              </p>

              <div className="mt-10">
                <Link
                  href="/category"
                  className="inline-flex items-center gap-2 
                       bg-[#5E1EE5] hover:bg-[#4c16c7]
                       text-white font-semibold 
                       px-4 py-2 md:px-8 md:py-4 rounded-full
                       transition-all duration-300
                       shadow-lg hover:shadow-xl mb-4 md:mb-0"
                >
                  Get started
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </div>

            {/* ================= RIGHT IMAGES ================= */}
            <div className="relative w-full max-w-[620px] h-[370px] sm:h-[400px] lg:h-[400px] md:mt-[60px] mt-8 ">
              {/* Back Card */}
              <div
                className="z-20 relative  md:absolute top-[15%] right-0 md:right-[5%] w-full md:w-[85%] h-[80%] 
                        rounded-[28px] overflow-hidden 
                        shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              >
                <img
                  src="/images/bgImage1.png"
                  alt="Dual monitor setup"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Front Card */}
              <div
                className="z-10 hidden lg:block  md:absolute bottom-[-10%] left-[-35%] w-[85%] h-[80%] 
                        rounded-[28px] overflow-hidden 
                        shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
              >
                <img
                  src="/images/bgImage2.png"
                  alt="Laptop and keyboard setup"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="max-w-[1350px] mx-auto px-4 lg:px-0 mt-[50px]">
        <h2 className="text-gray-900 font-bold text-[25px] sm:text-[32px] lg:text-[48px] tracking-tight mb-8">
          Best selling
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {categories
            ?.filter((category: CategoryType) => category?.count > 0)
            ?.slice(0, 5)
            .map((cat: any) => {
              const productImage = categoryProductsMap[cat?.id];
              return (
                <Link
                  key={cat.id}
                  href={`/category/${convertToSlug(cat.name)}-${cat.id}`}
                  className="group block w-full h-full"
                >
                  <div className="h-full flex flex-col bg-[#EDEDED] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    {/* IMAGE SECTION */}
                    <div className="relative p-3 flex-shrink-0">
                      {/* Wishlist Icon */}
                      <button
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:scale-105 transition z-10"
                        aria-label="Add to wishlist"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 c1.74 0 3.41.81 4.5 2.09 C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>

                      {/* Category Image */}
                      <div className="w-full aspect-square flex items-center justify-center bg-gray-100">
                        <img
                          src={cat.image?.src ?? productImage}
                          alt={cat.image?.name}
                          width={220}
                          height={220}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* INFO SECTION */}
                    <div className="flex-1 px-3 py-4 flex flex-col justify-end">
                      <button className="w-full bg-gradient-to-r from-[#6D28D9] to-[#5E1EE5] text-white text-xs sm:text-sm font-medium py-2 sm:py-2.5 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E1EE5] transition text-center line-clamp-2">
                        {cat?.name}
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

      {/* </Carousel> */}
    </>
  );
};

export default AllCategorySection;
