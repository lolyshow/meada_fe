"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
// import { SingleGridItem } from "./SingleGridItem";
import CustomSelect from "../ShopWithSidebar/CustomSelect";
import { Product } from "@/types/product";
import { getShopProducts } from "@/lib/api/products";
import SingleGridItem from "../Shop/SingleGridItem";

const ShopPage = () => {
  const searchParams = useSearchParams();

  // Gets "Meat" from /shop?category=Meat
  const category = searchParams.get("category") || "";

  const [productStyle, setProductStyle] = useState("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [sort, setSort] = useState("");

  const options = [
    { label: "Latest Products", value: "-createdAt" },
    { label: "Price: Low to High", value: "price" },
    { label: "Price: High to Low", value: "-price" },
  ];

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getShopProducts({
        category: category || undefined,
        page,
        limit: 12,
        sort: sort || undefined,
      });

      setProducts(data.products);
      setTotalProducts(data.pagination.totalProducts);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Product loading error:", error);
      setProducts([]);
      setTotalProducts(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset to page 1 whenever category changes
    setPage(1);
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [category, page, sort]);

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  return (
    <>
      <Breadcrumb
        title={category || "All Products"}
        pages={["shop", "/", category || "all products"]}
      />

      <section className="relative overflow-hidden bg-[#f3f4f6] pb-20 pt-5 ">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">

          {/* Toolbar */}
          <div className="mb-6 rounded-lg bg-white px-3 py-2.5 shadow-1">
            <div className="flex items-center justify-between">

              <div className="flex flex-wrap items-center gap-4">
                <CustomSelect
                  options={options}
                  onChange={handleSortChange}
                />

                <p>
                  Showing{" "}
                  <span className="text-dark">
                    {products.length}
                  </span>{" "}
                  of{" "}
                  <span className="text-dark">
                    {totalProducts}
                  </span>{" "}
                  Products
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setProductStyle("grid")}
                >
                  Grid
                </button>

                <button
                  onClick={() => setProductStyle("list")}
                >
                  List
                </button>
              </div>

            </div>
          </div>

          {/* Products */}
          {loading ? (
            <div className="py-20 text-center">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center">
              <h2>No products found</h2>

              <p>
                There are currently no products
                {category ? ` in ${category}` : ""}.
              </p>
            </div>
          ) : (
            <div
              className={
                productStyle === "grid"
                  ? "grid grid-cols-1 gap-x-7.5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4"
                  : "flex flex-col gap-7.5"
              }
            >
              {products.map((product) => (
                <SingleGridItem
                  item={product}
                  key={product._id}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-15 flex justify-center">
              <div className="rounded-md bg-white p-2 shadow-1">
                <div className="flex items-center gap-1">

                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    ←
                  </button>

                  <span className="px-4">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    →
                  </button>

                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default ShopPage;