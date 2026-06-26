import React from "react";
import CustomFancyBtn from "./CustomFancyBtn";

function Hero() {
  return (
    <div className="relative md:mt-10 w-[100vw] px-5 h-[50vh] md:h-[80vh] bg">
      <div className="w-[90%] md:w-[80%] mx-auto h-[100%] flex flex-col items-start justify-center">
        <div
          data-aos="fade-right"
          className="text-white mt-4 py-4 font-bold text-[25px] md:text-[30px] lg:text-[40px] uppercase aos-init aos-animate"
        >
          Best Place To Buy Your goods
        </div>
        <p
          data-aos="fade-left"
          data-aos-delay="200"
          className="text-white text-[14px] md:text-[18px] w-[90%] lg:w-[55%] mt-[1rem] md:mt-[0.2rem] mb-[1rem] opacity-75 aos-init aos-animate"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia
          commodi, perferendis libero doloremque est in repellendus? Soluta,
          doloribus ipsum inventore quisquam id vero voluptates harum nulla
          tenetur asperiores unde optio expedita quo laudantium officia aliquam
          neque exercitationem provident placeat tempora!
        </p>
        <CustomFancyBtn
          text  = {"Shop Now"}
        />
      </div>

      <div className="hero-content  flex-col lg:flex-row"></div>
    </div>
  );
}

export default Hero;
