"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    tag: "Fresh Daily",
    discount: "20%",
    discountLabel: "Off",
    title: "Farm Fresh Chicken, Delivered to Your Door",
    description:
      "Drumsticks, whole thighs, front legs & more — cleaned and ready to cook. Order before 12pm for same-day delivery.",
    cta: "Shop Chicken",
    href: "/products?category=Chicken",
    emoji: "🐔",
    bg: "from-orange-50 to-amber-100",
    accent: "bg-orange-500",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    tag: "Best Seller",
    discount: "Fresh",
    discountLabel: "Today",
    title: "Tilapia, Catfish & Dried Fish — Straight From the Market",
    description:
      "Fresh Tilapia, Fresh Catfish, Dried Tilapia & Dried Catfish. Head, intestine, shaki, and more available.",
    cta: "Shop Fish",
    href: "/products?category=Fish",
    emoji: "🐟",
    bg: "from-blue-50 to-cyan-100",
    accent: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    tag: "100% Natural",
    discount: "Top",
    discountLabel: "Quality",
    title: "Fresh Vegetables — Okra, Tomato, Pepper & More",
    description:
      "Freshly sourced vegetables including Okra, Tomato Pepper, Cucumber, and Fresh Leafy Vegetables. Delivered fresh.",
    cta: "Shop Vegetables",
    href: "/products?category=Vegetables",
    emoji: "🥦",
    bg: "from-green-50 to-emerald-100",
    accent: "bg-green-600",
    badge: "bg-green-100 text-green-700",
  },
  {
    tag: "Premium Cuts",
    discount: "Grade",
    discountLabel: "A",
    title: "Quality Beef & Lamb — Fresh Cuts Every Day",
    description:
      "Carefully selected beef and lamb cuts. Fresh, clean, and ready for your pot. Bulk orders welcome.",
    cta: "Shop Meat",
    href: "/products?category=Beef",
    emoji: "🥩",
    bg: "from-red-50 to-rose-100",
    accent: "bg-red-600",
    badge: "bg-red-100 text-red-700",
  },
];

const HeroCarousel = () => {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      className="hero-carousel"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className={`flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row bg-gradient-to-br ${slide.bg} min-h-[320px] sm:min-h-[380px]`}>
            
            {/* ── Text Content ── */}
            <div className="max-w-[420px] py-10 sm:py-15 lg:py-16 pl-4 sm:pl-7.5 lg:pl-12.5 pr-4">
              
              {/* badge */}
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${slide.badge}`}>
                {slide.tag}
              </span>

              {/* discount / label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="block font-bold text-heading-3 sm:text-heading-1 text-dark">
                  {slide.discount}
                </span>
                <span className="block text-dark-4 text-sm sm:text-custom-1 sm:leading-[24px] font-medium">
                  {slide.discountLabel}
                </span>
              </div>

              {/* title */}
              <h1 className="font-bold text-dark text-xl sm:text-2xl lg:text-3xl mb-3 leading-snug">
                <Link href={slide.href}>{slide.title}</Link>
              </h1>

              {/* description */}
              <p className="text-dark-4 text-sm sm:text-base leading-relaxed mb-8">
                {slide.description}
              </p>

              {/* CTA */}
              <Link
                href={slide.href}
                className={`inline-flex items-center gap-2 font-semibold text-white text-sm rounded-lg ${slide.accent} py-3 px-8 ease-out duration-200 hover:opacity-90 hover:shadow-lg`}
              >
                {slide.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* ── Emoji / Image ── */}
            <div className="flex-1 flex items-center justify-center py-8 sm:py-0">
              <div className="relative">
                {/* decorative circle */}
                <div className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px] rounded-full bg-white/60 flex items-center justify-center shadow-inner">
                  <span className="text-[90px] sm:text-[120px] lg:text-[140px] select-none">
                    {slide.emoji}
                  </span>
                </div>
                {/* floating delivery badge */}
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-3 py-1.5 shadow-md flex items-center gap-1.5">
                  <span className="text-green-500 text-sm">●</span>
                  <span className="text-xs font-semibold text-dark">Fresh Today</span>
                </div>
              </div>
            </div>

          </div>
        </SwiperSlide>
      ))}

      {/* custom pagination styles */}
      <style jsx global>{`
        .hero-carousel .swiper-slide {
          opacity: 0 !important;
          pointer-events: none;
        }
        .hero-carousel .swiper-slide-active {
          opacity: 1 !important;
          pointer-events: auto;
        }
        .hero-carousel .swiper-pagination {
          bottom: 16px;
        }
        .hero-carousel .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
        }
        .hero-carousel .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #3C50E0;
        }
      `}</style>
    </Swiper>
  );
};

export default HeroCarousel;
