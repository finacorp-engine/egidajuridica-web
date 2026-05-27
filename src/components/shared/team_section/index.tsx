import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { TeamMemberItem } from "../../../lib/cms/types";

const defaultMembers: TeamMemberItem[] = [];

type Props = {
  members?: TeamMemberItem[];
  introTitle?: string;
  introText?: string;
};

export const TeamSection = ({
  members = defaultMembers,
  introTitle = "Un equipo jurídico a tu lado",
  introText = "Contamos con un equipo de abogados especializados que combinan experiencia, formación continua y un enfoque estratégico para ofrecer soluciones jurídicas eficaces.",
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

  if (!mounted || members.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative w-full bg-background py-24 md:py-32 overflow-hidden font-sans" aria-label="Nuestro equipo jurídico">
      <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[10%] w-full text-center flex justify-center">
          <span className="text-[30vw] sm:text-[25vw] md:text-[28vw] lg:text-[26vw] font-serif text-muted tracking-widest uppercase opacity-80 whitespace-nowrap" style={{ fontFamily: "'Times New Roman', serif", lineHeight: 0.7 }}>
            EQUIPO
          </span>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-foreground mb-4" style={{ fontFamily: "'Times New Roman', serif" }} data-animate="fade-up" id="team-carousel-title">
            {introTitle}
          </h2>
          {introText && (
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto" data-animate="fade-up" data-animate-delay="200">
              {introText}
            </p>
          )}
        </div>

        <div className="relative w-full max-w-475 mx-auto flex items-center justify-center" data-animate="fade-up" data-animate-delay="400" role="region" aria-roledescription="carrusel" aria-labelledby="team-carousel-title">
          <button className="swiper-button-prev-team hidden xl:flex absolute -left-16 z-20 w-12 h-12 rounded-full border border-gold text-foreground items-center justify-center hover:bg-gold hover:text-background transition-colors cursor-pointer bg-background" aria-label="Miembro anterior del equipo">
            <ArrowLeft size={20} strokeWidth={1} aria-hidden="true" />
          </button>

          <div className="w-full px-4 xl:px-8">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={20}
              loop={members.length > 1}
              navigation={{ prevEl: ".swiper-button-prev-team", nextEl: ".swiper-button-next-team" }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 32 },
              }}
              className="w-full relative"
            >
              {members.map((member) => (
                <SwiperSlide key={member.id} role="group" aria-roledescription="diapositiva" aria-label={`${member.name}, ${member.role}`}>
                  <div className="group relative h-125 sm:h-150 overflow-hidden bg-primary">
                    <img src={member.image} alt={`Fotografía de ${member.name}`} className="absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent z-10" aria-hidden="true" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 text-center flex flex-col justify-end items-center">
                      <h3 className="text-primary-foreground text-2xl md:text-[28px] leading-tight font-serif mb-2" style={{ fontFamily: "'Times New Roman', serif" }}>
                        {member.name}
                      </h3>
                      <p className="text-primary-foreground/80 text-sm md:text-base italic tracking-normal">{member.role}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button className="swiper-button-next-team hidden xl:flex absolute -right-16 z-20 w-12 h-12 rounded-full border border-gold text-foreground items-center justify-center hover:bg-gold hover:text-background transition-colors cursor-pointer bg-background" aria-label="Siguiente miembro del equipo">
            <ArrowRight size={20} strokeWidth={1} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
