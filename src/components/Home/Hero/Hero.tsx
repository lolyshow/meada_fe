import React from "react";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#153F2C] via-[#1C5738] to-[#347D4C]">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-32 left-[35%] h-80 w-80 rounded-full bg-green-300/10" />
      <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-lime-300/10" />

      <div className="mx-auto grid min-h-[300px] w-[92%] max-w-[1400px] grid-cols-1 items-center gap-2 py-4 md:min-h-[330px] md:py-5 lg:grid-cols-2 lg:gap-4">

        {/* LEFT CONTENT */}
        <div
          data-aos="fade-right"
          className="relative z-10 flex flex-col items-start"
        >
          <span className="mb-2 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm md:text-xs">
            🌿 Fresh groceries, delivered with care
          </span>

          <h1 className="max-w-[600px] text-3xl font-extrabold leading-[1.05] tracking-tight text-white md:text-4xl lg:text-[48px]">
            Fresh food.
            <br />
            <span className="text-[#AFC946]">Better living.</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="150"
            className="mt-2 max-w-[500px] text-xs leading-5 text-white/80 md:text-sm"
          >
            Shop fresh meat, fish, chicken, vegetables and more. Quality
            groceries selected for your kitchen and delivered right to your
            door.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="250"
            className="mt-3"
          >
            <Link
              href="/shop-without-sidebar"
              className="inline-flex items-center rounded-full bg-[#AFC946] px-6 py-3 text-sm font-bold text-[#173D2A] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C7DC62]"            >
              Shop Now
              <span className="ml-2 text-base">→</span>
            </Link>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="350"
            className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/80 md:text-xs"
          >
            <span className="flex items-center gap-1">
              <span className="font-bold text-[#AFC946]">✓</span>
              Fresh products
            </span>

            <span className="flex items-center gap-1">
              <span className="font-bold text-[#AFC946]">✓</span>
              Quality you can trust
            </span>

            <span className="flex items-center gap-1">
              <span className="font-bold text-[#AFC946]">✓</span>
              Convenient shopping
            </span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          data-aos="fade-left"
          data-aos-delay="150"
          className="relative flex h-[220px] items-center justify-center md:h-[270px] lg:h-[310px]"
        >
          {/* Soft image glow */}
          <div className="absolute h-[230px] w-[230px] rounded-full bg-lime-200/20 blur-2xl md:h-[280px] md:w-[280px]" />

          {/* Decorative circle */}
          <div className="absolute right-[8%] h-[210px] w-[210px] rounded-full bg-lime-100/20 md:h-[250px] md:w-[250px]" />

          {/* Hero image */}
          <div className="relative z-10 h-[220px] w-[220px] overflow-hidden rounded-[42%] border-4 border-white/20 shadow-2xl md:h-[270px] md:w-[270px] lg:h-[300px] lg:w-[300px]">
            <Image
              src="/images/hero-img.png"
              alt="Fresh groceries from MAELDA"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 70vw, 35vw"
            />
          </div>

          {/* Floating card */}
          <div className="absolute bottom-[2%] left-[5%] z-20 rounded-xl border border-white/30 bg-white/95 px-3 py-2 shadow-xl backdrop-blur-md md:px-4 md:py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-base">
                🥬
              </div>

              <div>
                <p className="text-[9px] text-gray-500">
                  Fresh every day
                </p>
                <p className="text-xs font-bold text-gray-900 md:text-sm">
                  Quality groceries
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
