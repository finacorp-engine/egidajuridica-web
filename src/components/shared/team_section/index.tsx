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
  // Contenido destacado entre el título y el carrusel (p. ej. el fundador)
  children?: React.ReactNode;
};

export const TeamSection = ({
  members = defaultMembers,
  introTitle = "Un equipo jurídico a tu lado",
  introText = "Contamos con un equipo de abogados especializados que combinan experiencia, formación continua y un enfoque estratégico para ofrecer soluciones jurídicas eficaces.",
  children,
}: Props) => {
  const [mounted, setMounted] = useState(false);
  // Con contenido destacado (fundador) la sección tiene dos paneles: primero el fundador
  // y, al deslizar, el carrusel del equipo en el mismo espacio
  const hasLead = Boolean(children);
  const [view, setView] = useState<"lead" | "team">("lead");
  // En celular no hay hover: al tocar una foto se muestra a color
  const [activeId, setActiveId] = useState<TeamMemberItem["id"] | null>(null);
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

  const carousel = (
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
              <div className="group relative h-125 sm:h-150 overflow-hidden bg-primary cursor-pointer" onClick={() => setActiveId((current) => (current === member.id ? null : member.id))}>
                <img src={member.image} alt={`Fotografía de ${member.name}`} className={`absolute inset-0 w-full h-full object-cover object-top filter contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 ${activeId === member.id ? "grayscale-0 scale-105" : "grayscale"}`} loading="lazy" />
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
  );

  const tabs: { id: "lead" | "team"; label: string }[] = [
    { id: "lead", label: "Nuestro fundador" },
    { id: "team", label: "Nuestro equipo" },
  ];

  return (
    <section ref={sectionRef} className={`relative w-full bg-background overflow-clip font-sans ${hasLead ? "py-20 md:py-24" : "py-24 md:py-32"}`} aria-label="Nuestro equipo jurídico">
      <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[10%] w-full text-center flex justify-center">
          <span className="text-[30vw] sm:text-[25vw] md:text-[28vw] lg:text-[26vw] font-serif text-muted tracking-widest uppercase opacity-80 whitespace-nowrap" style={{ fontFamily: "'Times New Roman', serif", lineHeight: 0.7 }}>
            EQUIPO
          </span>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className={`text-center ${hasLead ? "mb-10 md:mb-12" : "mb-16 md:mb-24"}`}>
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-foreground mb-4" style={{ fontFamily: "'Times New Roman', serif" }} data-animate="fade-up" id="team-carousel-title">
            {introTitle}
          </h2>
          {introText && (
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto" data-animate="fade-up" data-animate-delay="200">
              {introText}
            </p>
          )}

          {hasLead && (
            <div className="mt-8 md:mt-10 inline-flex items-center gap-6 md:gap-10" role="tablist" aria-label="Fundador y equipo" data-animate="fade-up" data-animate-delay="300">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={view === tab.id}
                  aria-controls={`team-panel-${tab.id}`}
                  onClick={() => setView(tab.id)}
                  className={`pb-2 border-b-2 text-xs md:text-sm uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer ${view === tab.id ? "border-gold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {hasLead ? (
          // overflow-x-clip (no hidden): con hidden el navegador desplaza el contenedor al enfocar y descuadra los paneles
          <div className="relative overflow-x-clip">
            <div
              className="flex w-[200%] items-center transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
              style={{ transform: view === "team" ? "translateX(-50%)" : "translateX(0)" }}
            >
              <div id="team-panel-lead" role="tabpanel" className="w-1/2 shrink-0" aria-hidden={view !== "lead"} inert={view !== "lead"}>
                {children}
                <div className="mt-10 md:mt-12 flex justify-center lg:justify-end max-w-6xl mx-auto px-4 xl:px-8">
                  <button
                    type="button"
                    onClick={() => setView("team")}
                    className="group/next inline-flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.2em] text-foreground cursor-pointer"
                  >
                    Conoce a nuestro equipo
                    <span className="w-12 h-12 rounded-full border border-gold flex items-center justify-center transition-colors group-hover/next:bg-gold group-hover/next:text-background">
                      <ArrowRight size={20} strokeWidth={1} aria-hidden="true" />
                    </span>
                  </button>
                </div>
              </div>

              <div id="team-panel-team" role="tabpanel" className="w-1/2 shrink-0 xl:px-16" aria-hidden={view !== "team"} inert={view !== "team"}>
                {carousel}
                <div className="mt-10 md:mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setView("lead")}
                    className="group/back inline-flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.2em] text-foreground cursor-pointer"
                  >
                    <span className="w-12 h-12 rounded-full border border-gold flex items-center justify-center transition-colors group-hover/back:bg-gold group-hover/back:text-background">
                      <ArrowLeft size={20} strokeWidth={1} aria-hidden="true" />
                    </span>
                    Volver al fundador
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          carousel
        )}
      </div>
    </section>
  );
};

export default TeamSection;
