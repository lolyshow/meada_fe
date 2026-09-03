"use client";

import {
  FiFeather,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";

const benefits = [
  {
    icon: FiFeather,
    title: "Fresh",
    description:
      "We carefully select fresh food products so you can enjoy quality ingredients in every meal.",
  },
  {
    icon: FiCheckCircle,
    title: "Quality",
    description:
      "From meat and fish to chicken and vegetables, we focus on products you can trust.",
  },
  {
    icon: FiTruck,
    title: "Convenience",
    description:
      "Shop from the comfort of your home and have your groceries brought right to your door.",
  },
];

const WhyShopWithMaelda = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            The MAELDA difference
          </span>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Why Shop With MAELDA?
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-gray-600">
            We make it easier to get the fresh, quality food you love without
            the stress of shopping.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="group rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white">
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="mt-3 leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyShopWithMaelda;
