import React, { useEffect, useRef } from "react";
import { site as fallbackSite } from "../../../config";
import type { FormFieldLabels } from "../../../lib/cms/types";

type Props = {
  phone?: string;
  email?: string;
  heading?: string;
  description?: string;
  submitLabel?: string;
  fieldLabels?: FormFieldLabels;
};

const FormSection = ({
  phone = fallbackSite.phone,
  email = fallbackSite.email,
  heading = "¿Cómo podemos ayudarte?",
  submitLabel = "ENVIAR",
  fieldLabels = {},
}: Props) => {
  const sectionRef = useRef<HTMLElement>(null);

  const labels = {
    firstName: fieldLabels.firstName || "Nombre *",
    lastName: fieldLabels.lastName || "Apellido *",
    email: fieldLabels.email || "Correo electrónico *",
    phone: fieldLabels.phone || "Número de celular",
    comments: fieldLabels.comments || "Comentarios, preguntas? *",
  };

  useEffect(() => {
    if (!sectionRef.current) return;
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden font-sans pb-16 md:pb-24 lg:pb-32" aria-label="Información de contacto y formulario">
      <div className="relative w-full py-16 md:py-24 lg:py-32 bg-background flex items-center justify-center overflow-hidden">
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-32">
          <div className="flex flex-col items-center text-center" data-animate="fade-up">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-2 font-serif">Número de celular:</h2>
            <a href={`tel:${phone}`} className="text-muted-foreground uppercase text-sm md:text-base hover:text-foreground transition-colors">
              {phone}
            </a>
          </div>
          <div className="flex flex-col items-center text-center" data-animate="fade-up" data-animate-delay="200">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-2 font-serif">Correo electrónico:</h2>
            <a href={`mailto:${email}`} className="text-muted-foreground text-sm md:text-base hover:text-foreground transition-colors">
              {email}
            </a>
          </div>
        </div>
      </div>

      <div className="relative py-16 md:py-24 lg:py-32 bg-primary max-w-7xl w-full mx-auto">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16" data-animate="fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl text-primary-foreground mb-4 md:mb-6 font-serif" id="contact-form-title">
              {heading}
            </h2>
          </div>

          <form className="w-full max-w-3xl mx-auto flex flex-col gap-6 md:gap-10" data-animate="fade-up" data-animate-delay="200" aria-labelledby="contact-form-title" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <input type="text" id="firstName" name="firstName" placeholder={labels.firstName} required autoComplete="given-name" className="w-full bg-transparent border-0 border-b border-primary-foreground/50 py-2 text-primary-foreground placeholder-primary-foreground text-sm md:text-base focus:outline-none" />
              <input type="text" id="lastName" name="lastName" placeholder={labels.lastName} required autoComplete="family-name" className="w-full bg-transparent border-0 border-b border-primary-foreground/50 py-2 text-primary-foreground placeholder-primary-foreground text-sm md:text-base focus:outline-none" />
              <input type="email" id="email" name="email" placeholder={labels.email} required autoComplete="email" className="w-full bg-transparent border-0 border-b border-primary-foreground/50 py-2 text-primary-foreground placeholder-primary-foreground text-sm md:text-base focus:outline-none" />
              <input type="tel" id="phone" name="phone" placeholder={labels.phone} autoComplete="tel" className="w-full bg-transparent border-0 border-b border-primary-foreground/50 py-2 text-primary-foreground placeholder-primary-foreground text-sm md:text-base focus:outline-none" />
            </div>
            <textarea id="comments" name="comments" placeholder={labels.comments} required rows={1} className="w-full bg-transparent border-0 border-b border-white/50 py-2 text-white placeholder-white text-sm md:text-base focus:outline-none" />
            <div className="flex justify-center mt-4">
              <button type="submit" className="border border-primary-foreground text-primary-foreground text-sm md:text-base uppercase font-medium tracking-wide px-5 py-2.5 md:px-6 md:py-3 hover:bg-primary-foreground hover:text-primary transition-colors duration-300">
                {submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
