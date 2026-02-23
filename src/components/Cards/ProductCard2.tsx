"use client";

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiShoppingBagFill } from "react-icons/ri";
import { useCart } from "react-use-cart";
import Link from "next/link";
import Picture from "../picture/Picture";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { convertToSlug } from "@constants";

interface ProductCard2Props {
  id: string | number;
  image: string;
  oldAmount?: string;
  newAmount: string;
  description: string;
  boxShadow?: boolean;
}

const ProductCard2 = ({
  id,
  image,
  oldAmount,
  newAmount,
  description,
  boxShadow = true,
}: ProductCard2Props) => {
  const { addItem, removeItem, updateItem, getItem } = useCart();

  const ID = id.toString();
  const cartItem = getItem(ID);
  const quantity = cartItem?.quantity || 0;
  const price = parseInt(newAmount);
  const slugDesc = convertToSlug(description);

  const discount = oldAmount
    ? Math.round(((parseInt(oldAmount) - price) / parseInt(oldAmount)) * 100)
    : 0;

  const addToCart = () => {
    addItem({ id: ID, name: description, price, quantity: 1, image });
  };

  const increase = () => updateItem(ID, { quantity: quantity + 1 });
  const decrease = () => {
    if (quantity <= 1) removeItem(ID);
    else updateItem(ID, { quantity: quantity - 1 });
  };

  return (
    <div
      className={`group relative flex flex-col 
      w-[280px] lg:w-[250px] h-[380px] 
      rounded-lg bg-[#EDEDED] overflow-hidden 
      transition-all duration-300
      ${boxShadow ? "shadow-sm hover:shadow-md" : "border border-gray-200"}`}
    >
      {/* ================= IMAGE SECTION ================= */}
      <Link
        href={`/home-item/product/${slugDesc}-${id}`}
        className="relative p-5 flex items-center justify-center h-[220px] shrink-0"
      >
        {/* Wishlist icon */}
        <div
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm 
                        rounded-full p-2 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                     2 5.42 4.42 3 7.5 3 
                     c1.74 0 3.41.81 4.5 2.09 
                     C13.09 3.81 14.76 3 16.5 3 
                     19.58 3 22 5.42 22 8.5 
                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>

        <Picture
          src={image}
          alt={description}
          className="object-contain max-h-full transition-transform duration-500 group-hover:scale-105"
        />

        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded-md">
            -{discount}%
          </div>
        )}
      </Link>

      {/* ================= CONTENT SECTION ================= */}
      <div className="flex flex-col flex-1 px-4 pb-4">
        {/* Title */}
        <Link
          href={`/home-item/product/${slugDesc}-${id}`}
          className="text-[15px] font-semibold text-gray-800 line-clamp-2 min-h-[40px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Price */}
        <div className="mt-2">
          {oldAmount && (
            <span className="block text-xs line-through text-gray-400">
              <FormatMoney2 value={parseInt(oldAmount)} />
            </span>
          )}
          <span className="text-base font-bold text-gray-900">
            {price ? <FormatMoney2 value={price} /> : "N/A"}
          </span>
        </div>

        {/* PUSH BUTTON / QUANTITY TO BOTTOM */}
        <div className="">
          {quantity === 0 ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart();
              }}
              className="mt-4 w-full bg-gradient-to-r 
                         from-[#6D28D9] to-[#5E1EE5]
                         text-white text-sm font-medium 
                         py-2.5 rounded-md
                         flex items-center justify-center gap-2
                         hover:opacity-90 transition"
            >
              <RiShoppingBagFill size={14} />
              Add to cart
            </button>
          ) : (
            <div
              className="mt-4 flex items-center justify-between 
                            border border-gray-300 rounded-md px-3 py-2 bg-white"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  decrease();
                }}
                className="size-7 flex items-center justify-center 
                           rounded bg-gray-100 hover:bg-gray-200"
              >
                <AiOutlineMinus size={14} />
              </button>

              <span className="text-sm font-semibold">{quantity}</span>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  increase();
                }}
                className="size-7 flex items-center justify-center 
                           rounded bg-[#5E1EE5] text-white hover:opacity-90"
              >
                <AiOutlinePlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 rounded-lg border border-black/5 pointer-events-none" />
    </div>
  );
};

export default ProductCard2;
