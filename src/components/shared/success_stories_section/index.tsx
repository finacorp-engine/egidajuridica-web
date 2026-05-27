import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import type { StoryItem } from "../../../lib/cms/types";

type Props = {
  stories?: StoryItem[];
  title?: string;
};

export const SuccessStoriesSection = ({
  stories = [],
  title = "Historias de éxito",
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

  if (!mounted || stories.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative w-full min-h-[70vh] md:min-h-screen flex flex-col justify-center bg-primary py-16 md:py-24 lg:py-32 overflow-hidden z-10 font-sans" aria-label="Historias de éxito de nuestros clientes">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-primary-foreground text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif tracking-wide mb-4 md:mb-6" data-animate="fade-up" id="stories-carousel-title">
          {title}
        </h2>

        <div role="region" aria-roledescription="carrusel" aria-labelledby="stories-carousel-title">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            loop={stories.length > 1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, bulletClass: "swiper-bullet-custom", bulletActiveClass: "swiper-bullet-active-custom" }}
            className="w-full pb-16"
          >
            {stories.map((story, index) => (
              <SwiperSlide key={index} role="group" aria-roledescription="diapositiva" aria-label={`Testimonio ${index + 1} de ${stories.length}: ${story.author}`}>
                <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">
                  <blockquote>
                    <p className="text-primary-foreground/80 text-base md:text-lg lg:text-xl leading-relaxed text-center mb-6 md:mb-8 px-2 sm:px-4 md:px-16">{story.text}</p>
                    <footer className="text-primary-foreground font-semibold text-sm md:text-base mb-6 md:mb-10 pb-4">
                      <cite className="not-italic">{story.author}</cite>
                    </footer>
                  </blockquote>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .swiper-bullet-custom { width: 20px; height: 2px; display: inline-block; background: var(--color-primary-foreground); opacity: 0.3; margin: 0 4px; cursor: pointer; }
        .swiper-bullet-active-custom { background: var(--color-gold) !important; opacity: 1; }
      `,
        }}
      />
    </section>
  );
};

export default SuccessStoriesSection;
