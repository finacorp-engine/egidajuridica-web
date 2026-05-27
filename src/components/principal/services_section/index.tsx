import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { site } from "../../../config";
import type { ServiceSlide } from "../../../lib/cms/types";

const defaultSlides: ServiceSlide[] = [
  {
    id: "01",
    subtitle: "Derecho laboral",
    title: "Asesoramiento en relaciones laborales",
    description:
      "Asesoramos y representamos tanto a trabajadores como a empresas en conflictos laborales, despidos, reclamaciones, contratos y protección de derechos laborales.",
    buttonText: "VER SERVICIO",
    buttonHref: site.whatsapp,
    image: "https://images.pexels.com/photos/7222955/pexels-photo-7222955.jpeg",
  },
];

type Props = {
  slides?: ServiceSlide[];
  introTitle?: string;
};

export const ServicesSection = ({
  slides = defaultSlides,
  introTitle = "Especialistas en áreas clave del derecho",
}: Props) => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted || slides.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#111] pt-24 pb-32 md:pt-44 md:pb-44 overflow-hidden z-10 font-sans"
      aria-label="Áreas de especialización jurídica"
    >
      <div className="absolute inset-0 z-0 opacity-40" aria-hidden="true">
        <img
          src="https://images.pexels.com/photos/10849040/pexels-photo-10849040.jpeg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/70 mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full mb-32 flex flex-col items-center">
        <h2
          className="text-white text-4xl sm:text-5xl lg:text-7xl font-serif tracking-tight mb-6 text-center"
          data-animate="fade-up"
          id="services-carousel-title"
        >
          {introTitle}
        </h2>
        <div
          className="h-px w-full max-w-32 bg-white"
          data-animate="line-grow"
          data-animate-delay="200"
          aria-hidden="true"
        />
      </div>

      <div
        className="relative z-10 w-full max-w-400 mx-auto group pl-4 md:pl-0"
        data-animate="fade-up"
        data-animate-delay="300"
        role="region"
        aria-roledescription="carrusel"
        aria-labelledby="services-carousel-title"
      >
        <Swiper
          modules={[Navigation, EffectCreative]}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={40}
          loop={slides.length > 1}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          breakpoints={{
            640: { spaceBetween: 60 },
            1024: { spaceBetween: 100 },
            1280: { spaceBetween: 120 },
          }}
          className="w-full pb-16 pt-24 overflow-visible!"
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={slide.id || index}
              className="w-[90vw]! sm:w-[80vw]! md:w-[1000px]! flex justify-center transition-all duration-500"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${slide.id} de ${slides.length}: ${slide.subtitle}`}
            >
              {({ isActive }) => (
                <div
                  className={`relative w-full flex items-center justify-end py-8 md:py-12 lg:py-16 max-w-5xl transition-all duration-700 mx-auto ${
                    isActive ? "opacity-100 scale-100" : "opacity-50 lg:opacity-60 scale-95"
                  }`}
                >
                  <div className="absolute -top-12 -left-6 md:-top-20 md:-left-12 lg:-top-36 lg:-left-24 z-20 font-serif pointer-events-none select-none font-light!" aria-hidden="true">
                    <span
                      className="text-[120px] md:text-[180px] lg:text-[220px] leading-none font-light"
                      style={{
                        background: "linear-gradient(180deg, #D4AF37 0%, var(--color-gold) 40%, #8C6A49 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        opacity: 0.9,
                      }}
                    >
                      {slide.id}
                    </span>
                  </div>

                  <div className="absolute inset-0 z-10 overflow-hidden pr-0 lg:pr-16">
                    <img src={slide.image} alt={`Imagen representativa de ${slide.subtitle}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>

                  <div
                    className={`relative z-30 w-[85%] sm:w-[65%] md:w-[50%] lg:w-[45%] bg-white p-8 md:p-12 shadow-2xl transition-all duration-700 delay-100 ${
                      isActive ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col items-start text-left space-y-4 md:space-y-6">
                      <span className="text-gold italic text-lg tracking-wide">{slide.subtitle}</span>
                      <h3 className="text-zinc-900 font-serif text-3xl md:text-4xl lg:text-[42px] tracking-wide">{slide.title}</h3>
                      <p className="text-zinc-500 font-sans text-sm md:text-base">{slide.description}</p>
                      <a
                        href={slide.buttonHref}
                        className="mt-4 px-6 py-3 border border-zinc-900 text-sm font-medium uppercase text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-500"
                      >
                        {slide.buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute top-1/2 -translate-y-1/2 z-20" style={{ left: "max(1rem, calc(50% - 588px))" }}>
          <button className="swiper-button-prev-custom w-10 h-10 md:w-14 md:h-14 rounded-full border border-gold/50 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all cursor-pointer opacity-70" aria-label="Servicio anterior">
            <ArrowLeft size={18} strokeWidth={1} aria-hidden="true" />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 z-20" style={{ right: "max(1rem, calc(50% - 588px))" }}>
          <button className="swiper-button-next-custom w-10 h-10 md:w-14 md:h-14 rounded-full border border-gold/50 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all cursor-pointer opacity-70" aria-label="Siguiente servicio">
            <ArrowRight size={18} strokeWidth={1} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
