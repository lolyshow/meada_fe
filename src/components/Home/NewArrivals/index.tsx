"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import shopData from "@/components/Shop/shopData";

import {
  useAppDispatch,
  useAppSelector,
  selectProducts,
  selectProductsLoading,
} from "@/redux/store";
import { fetchProducts } from "@/redux/features/products-slice";

const NewArrival = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <section className="overflow-hidden pt-8">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* <!-- section title --> */}
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                Fresh And Frozen
              </h2>
            </div>

            <Link
              href="/shop-with-sidebar"
              className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
            {/* <!-- New Arrivals item --> */}
            {products.map((item, key) => (
              <ProductItem item={item} key={key} />
            ))}
          </div>
        </div>
      </section>
      
    </>
  );
};

export default NewArrival;
