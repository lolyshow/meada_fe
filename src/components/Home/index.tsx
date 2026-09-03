import React from "react";
import Hero from "./Hero/Hero";
import Categories from "./Categories";
import FeaturedProduct from "./FeaturedProducts";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import ShopByCategory from "./ShopByCategory";
import WhyShopWithMaelda from "./WhyShopWithMaelda";
import PopularProducts from "./PopularProducts";

const Home = () => {
  return (
    <main>
      <Hero />
      <ShopByCategory />
      {/* <Categories /> */}
      <FeaturedProduct />
      <PopularProducts />
      {/* <NewArrival /> */}
      <PromoBanner />
      {/* <BestSeller /> */}
      {/* <CounDown /> */}
      {/* <NewArrival /> */}

      <WhyShopWithMaelda/>
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
