import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Mic2,
  ShieldAlert,
  Compass,
  Users,
  Building2,
  UserCheck,
  Newspaper,
  Target,
  MessageSquare,
  Brain,
  Camera,
  Share2,
  Eye,
  CheckCircle2,
  Award,
  Sparkles,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";

import heroAsset from "@/assets/felipe-seated.jpg.asset.json";
import felipeAsset from "@/assets/felipe-portrait.jpg.asset.json";
import clarissaImg from "@/assets/clarissa.jpg";

const heroImg = heroAsset.url;
const felipeImg = felipeAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Papyrus Comunicação | Media Training e Gestão de Crises" },
      {
        name: "description",
        content:
          "Consultoria de comunicação estratégica: Media Training, Gestão de Crises e Posicionamento Institucional para líderes e organizações.",
      },
      { property: "og:title", content: "Papyrus Comunicação" },
      {
        property: "og:description",
        content:
          "Preparamos porta-vozes, fortalecemos marcas e protegemos reputações.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

const WHATSAPP_FELIPE = "5586999763189";
const WHATSAPP_CLARISSA = "5586981442229";
const WA_MSG = encodeURIComponent(
  "Olá! Vim pelo site da Papyrus e gostaria de saber mais sobre os serviços.",
);
const waLink = (n: string) => `https://wa.me/${n}?text=${WA_MSG}`;

/* ---------------- Reveal on scroll ---------------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${shown ? "animate-fade-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------- Logo ---------------- */
function Logo({ light = false }: { light?: boolean }) {
  const color = light ? "text-white" : "text-primary";
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${color}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="4" y="6" width="28" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <path d="M11 14h14M11 20h14M11 26h9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-wider">PAPYRUS</span>
        <span className={`text-[10px] tracking-[0.28em] ${light ? "text-white/70" : "text-muted-foreground"}`}>
          GESTÃO DE COMUNICAÇÃO
        </span>
      </div>
    </a>
  );
}

/* ---------------- Nav ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#media-training", label: "Media Training" },
    { href: "#especialistas", label: "Especialistas" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 shadow-[0_1px_0_var(--border)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink(WHATSAPP_FELIPE)}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-dark"
          >
            Fale Conosco
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </nav>
        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-foreground"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <div className="container-px mx-auto flex max-w-7xl flex-col gap-4 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink(WHATSAPP_FELIPE)}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Fale no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-surface pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="container-px relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              Comunicação Estratégica · Desde 2004
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-bold leading-[1.02] text-ink text-balance">
              Sua reputação é construída em segundos.{" "}
              <span className="text-primary">Nós ajudamos você a protegê-la.</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Especialistas em <strong className="text-foreground">Media Training</strong>,{" "}
              <strong className="text-foreground">Gestão de Crises</strong> e{" "}
              <strong className="text-foreground">Posicionamento Estratégico</strong> para
              líderes, empresas e instituições.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              A Papyrus une a experiência do jornalismo profissional à estratégia da
              comunicação institucional para preparar porta-vozes, fortalecer marcas e
              proteger reputações.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#contato"
                className="group inline-flex items-center gap-2 bg-primary px-7 py-4 text-sm font-semibold tracking-wide text-primary-foreground shadow-elegant transition-all hover:bg-primary-dark hover:-translate-y-0.5"
                style={{ boxShadow: "var(--shadow-elegant)" }}
              >
                Solicitar Diagnóstico
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={waLink(WHATSAPP_FELIPE)}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 border border-foreground/15 px-7 py-4 text-sm font-semibold tracking-wide text-foreground transition-all hover:border-primary hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={520}>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8 max-w-lg">
              {[
                { n: "20+", l: "Anos de experiência" },
                { n: "100%", l: "Atendimento personalizado" },
                { n: "30d", l: "Mentoria pós-treinamento" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold text-primary">{s.n}</div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <div className="relative">
              <div
                className="relative aspect-[4/5] overflow-hidden bg-primary/5"
                style={{ transform: `translateY(${scrollY * -0.05}px)` }}
              >
                <img
                  src={heroImg}
                  alt="Felipe Pereira e Clarissa Castelo Branco, sócios da Papyrus"
                  className="h-full w-full object-cover"
                  width={1280}
                  height={1600}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "var(--gradient-overlay)" }}
                />
              </div>
              {/* decorative corner */}
              <div className="absolute -left-4 -top-4 hidden h-24 w-24 border-l-2 border-t-2 border-primary md:block" />
              <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 border-b-2 border-r-2 border-primary md:block" />

              {/* badge */}
              <div className="absolute -bottom-6 left-6 right-6 md:left-10 md:-bottom-8 md:right-auto md:max-w-xs bg-primary p-5 text-primary-foreground shadow-elegant">
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 shrink-0" />
                  <div>
                    <div className="font-display text-2xl font-bold leading-none">+20 ANOS</div>
                    <div className="mt-1.5 text-xs leading-snug text-white/85">
                      de experiência em comunicação e telejornalismo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sobre ---------------- */
function Sobre() {
  const highlights = [
    { icon: Compass, label: "Posicionamento Estratégico" },
    { icon: Mic2, label: "Media Training" },
    { icon: ShieldAlert, label: "Gestão de Crises" },
    { icon: Building2, label: "Comunicação Institucional" },
    { icon: UserCheck, label: "Treinamento de Porta-Vozes" },
    { icon: Users, label: "Consultoria Executiva" },
  ];
  return (
    <section id="sobre" className="bg-white py-24 lg:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">A Papyrus</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink md:text-5xl text-balance">
                Comunicação Estratégica para quem precisa ser ouvido
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                A Papyrus Comunicação é uma consultoria especializada em posicionamento
                estratégico, treinamento de porta-vozes e gerenciamento de crises.
                Combinamos técnica jornalística, visão estratégica e experiência prática para
                ajudar líderes e organizações a se comunicarem com{" "}
                <strong className="text-foreground">clareza, segurança e credibilidade</strong>.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h, i) => (
                <Reveal key={h.label} delay={i * 60}>
                  <div className="group flex h-full items-center gap-3 bg-white p-5 transition-colors hover:bg-surface">
                    <div className="grid h-10 w-10 shrink-0 place-items-center bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <h.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{h.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Serviços ---------------- */
function Servicos() {
  const services = [
    {
      icon: Mic2,
      title: "Media Training",
      desc: "Preparação completa para entrevistas, pronunciamentos públicos, coletivas de imprensa e aparições institucionais.",
      items: [
        "Desenvolvimento de mensagens-chave",
        "Linguagem corporal",
        "Tom de voz",
        "Segurança diante das câmeras",
        "Simulações de entrevistas",
        "Posicionamento em redes sociais",
      ],
    },
    {
      icon: ShieldAlert,
      title: "Gestão de Crises",
      desc: "Estratégias para proteger reputações e conduzir comunicações em momentos de alta exposição.",
      items: [
        "Planejamento de crise",
        "Comunicação emergencial",
        "Posicionamento institucional",
        "Gestão de imagem",
        "Relacionamento com imprensa",
      ],
    },
    {
      icon: Compass,
      title: "Posicionamento Estratégico",
      desc: "Construção de autoridade e fortalecimento da imagem pública de líderes e organizações.",
      items: [
        "Definição de narrativa",
        "Construção de reputação",
        "Comunicação institucional",
        "Relacionamento com stakeholders",
      ],
    },
  ];

  return (
    <section id="servicos" className="bg-surface py-24 lg:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">Nossos Serviços</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink md:text-5xl text-balance">
              Como podemos ajudar sua organização
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <article
                className="group flex h-full flex-col bg-white p-8 transition-all duration-500 hover:-translate-y-1"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-14 w-14 place-items-center bg-primary text-primary-foreground transition-transform group-hover:scale-105">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-5xl font-bold text-primary/10">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-2xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Media Training detail ---------------- */
function MediaTraining() {
  const benefits = [
    { icon: Target, label: "Construção de mensagens de impacto" },
    { icon: Brain, label: "Superação do medo de falar em público" },
    { icon: Award, label: "Desenvolvimento de credibilidade" },
    { icon: MessageSquare, label: "Comunicação clara e objetiva" },
    { icon: Eye, label: "Melhoria da linguagem corporal" },
    { icon: Share2, label: "Uso estratégico das redes sociais" },
    { icon: Camera, label: "Orientação de imagem e aparência" },
    { icon: Newspaper, label: "Preparação para entrevistas difíceis" },
  ];

  const timeline = [
    "Diagnóstico",
    "Preparação Estratégica",
    "Treinamento Presencial",
    "Simulações Reais",
    "Feedback Especializado",
    "Mentoria Pós-Treinamento",
  ];

  return (
    <section id="media-training" className="bg-white py-24 lg:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">Media Training</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink md:text-5xl text-balance">
              O treinamento que transforma porta-vozes em referências
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.label} delay={i * 60}>
              <div className="group flex h-full flex-col gap-4 border border-border bg-white p-6 transition-all hover:border-primary hover:shadow-[var(--shadow-card)]">
                <b.icon className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
                <p className="text-sm font-medium leading-snug text-foreground">{b.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <Reveal>
            <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">
              A jornada do treinamento
            </h3>
          </Reveal>
          <div className="mt-10 relative">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-border lg:block" />
            <ol className="grid gap-8 lg:grid-cols-6 lg:gap-4">
              {timeline.map((step, i) => (
                <Reveal key={step} delay={i * 100}>
                  <li className="relative">
                    <div className="relative z-10 grid h-10 w-10 place-items-center bg-primary font-display text-sm font-bold text-primary-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-4">
                      <div className="font-display text-base font-bold uppercase tracking-wide text-ink">
                        {step}
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Diferenciais ---------------- */
function Diferenciais() {
  const items = [
    {
      icon: Newspaper,
      title: "Experiência Jornalística",
      desc: "Mais de duas décadas de atuação em televisão e comunicação.",
    },
    {
      icon: Target,
      title: "Método Prático",
      desc: "Treinamentos baseados em situações reais.",
    },
    {
      icon: UserCheck,
      title: "Atendimento Personalizado",
      desc: "Cada cliente recebe uma estratégia exclusiva.",
    },
    {
      icon: Headphones,
      title: "Mentoria Pós-Treinamento",
      desc: "Acompanhamento durante 30 dias após o treinamento.",
    },
  ];
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">Diferenciais</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink md:text-5xl text-balance">
                Por que escolher a Papyrus?
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Combinamos prática, técnica e estratégia em um método que entrega resultado
                real para porta-vozes, executivos e instituições.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {items.map((it, i) => (
                <Reveal key={it.title} delay={i * 100}>
                  <div className="flex h-full flex-col gap-4 bg-white p-8 transition-colors hover:bg-surface">
                    <it.icon className="h-8 w-8 text-primary" />
                    <h3 className="font-display text-xl font-bold text-ink">{it.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Especialistas ---------------- */
function Especialistas() {
  const people = [
    {
      name: "Felipe Pereira",
      role: "Sócio · Jornalista",
      bio: "Jornalista com mais de 20 anos de experiência em comunicação e telejornalismo.",
      img: felipeImg,
      wa: WHATSAPP_FELIPE,
      phone: "(86) 99976-3189",
    },
    {
      name: "Clarissa Castelo Branco",
      role: "Sócia · Jornalista",
      bio: "Jornalista com mais de 20 anos de experiência em comunicação, posicionamento institucional e relacionamento com a mídia.",
      img: clarissaImg,
      wa: WHATSAPP_CLARISSA,
      phone: "(86) 98144-2229",
    },
  ];
  return (
    <section id="especialistas" className="bg-white py-24 lg:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">Especialistas</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink md:text-5xl text-balance">
              Quem está por trás da Papyrus
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:gap-14">
          {people.map((p, i) => (
            <Reveal key={p.name} delay={i * 150}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <img
                    src={p.img}
                    alt={`Retrato de ${p.name}`}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={1000}
                  />
                </div>
                <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                  <div className="min-w-0">
                    <div className="eyebrow">{p.role}</div>
                    <h3 className="mt-2 font-display text-2xl font-bold text-ink">{p.name}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {p.bio}
                    </p>
                  </div>
                  <a
                    href={waLink(p.wa)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`WhatsApp ${p.name}`}
                    className="shrink-0 inline-flex items-center gap-2 border border-foreground/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Resultados ---------------- */
function Resultados() {
  const items = [
    "Comunicação mais segura",
    "Mais credibilidade pública",
    "Melhor desempenho em entrevistas",
    "Redução de riscos reputacionais",
    "Posicionamento estratégico fortalecido",
  ];
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Resultados</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink md:text-5xl text-balance">
                Prepare sua liderança para qualquer cenário
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Cada projeto é desenhado para gerar impacto mensurável na forma como sua
                organização se comunica e é percebida.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {items.map((it, i) => (
                <Reveal key={it} delay={i * 80}>
                  <li className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-white">
                    <div className="flex min-w-0 items-center gap-5">
                      <span className="font-display text-sm font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl font-bold uppercase tracking-wide text-ink md:text-2xl">
                        {it}
                      </span>
                    </div>
                    <Sparkles className="h-5 w-5 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA / Form ---------------- */
function CTA() {
  const [form, setForm] = useState({ nome: "", empresa: "", email: "", msg: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const txt = encodeURIComponent(
      `Olá! Sou ${form.nome}${form.empresa ? ` (${form.empresa})` : ""}.\nE-mail: ${form.email}\n\n${form.msg}`,
    );
    window.open(`https://wa.me/${WHATSAPP_FELIPE}?text=${txt}`, "_blank");
  };

  return (
    <section
      id="contato"
      className="relative overflow-hidden py-24 lg:py-32 text-primary-foreground"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="container-px relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              Vamos Conversar
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-balance">
              Pronto para fortalecer sua comunicação?
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">
              Agende uma conversa estratégica e descubra como a Papyrus pode preparar sua
              organização para comunicar com clareza, autoridade e segurança.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 space-y-4 border-t border-white/15 pt-8">
              <a
                href={waLink(WHATSAPP_FELIPE)}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-white/10 pb-4 transition-colors hover:text-white"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60">Felipe Pereira</div>
                  <div className="mt-1 font-display text-lg font-semibold">(86) 99976-3189</div>
                </div>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={waLink(WHATSAPP_CLARISSA)}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-white/10 pb-4 transition-colors hover:text-white"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60">Clarissa Castelo Branco</div>
                  <div className="mt-1 font-display text-lg font-semibold">(86) 98144-2229</div>
                </div>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <form
            onSubmit={onSubmit}
            className="bg-white p-8 text-foreground shadow-elegant md:p-10"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          >
            <h3 className="font-display text-2xl font-bold text-ink">Solicitar Proposta</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Preencha o formulário e receba contato direto via WhatsApp.
            </p>
            <div className="mt-7 space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Nome *
                </label>
                <input
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="mt-2 w-full border-0 border-b border-border bg-transparent py-2.5 text-base text-foreground outline-none transition-colors focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Empresa
                </label>
                <input
                  value={form.empresa}
                  onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                  className="mt-2 w-full border-0 border-b border-border bg-transparent py-2.5 text-base text-foreground outline-none transition-colors focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  E-mail *
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 w-full border-0 border-b border-border bg-transparent py-2.5 text-base text-foreground outline-none transition-colors focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Mensagem
                </label>
                <textarea
                  rows={3}
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent py-2.5 text-base text-foreground outline-none transition-colors focus:border-primary"
                  placeholder="Como podemos ajudar?"
                />
              </div>
            </div>
            <button
              type="submit"
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary-dark"
            >
              Enviar via WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-ink py-16 text-white" style={{ backgroundColor: "var(--ink)" }}>
      <div className="container-px mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo light />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
            Gestão de Comunicação, Media Training e Gerenciamento de Crises.
          </p>
        </div>
        <div className="lg:col-span-4">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            Contatos
          </div>
          <ul className="mt-5 space-y-4">
            <li>
              <div className="text-sm font-semibold text-white">Felipe Pereira</div>
              <a
                href={waLink(WHATSAPP_FELIPE)}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" /> (86) 99976-3189
              </a>
            </li>
            <li>
              <div className="text-sm font-semibold text-white">Clarissa Castelo Branco</div>
              <a
                href={waLink(WHATSAPP_CLARISSA)}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" /> (86) 98144-2229
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            Redes
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { icon: MessageCircle, href: waLink(WHATSAPP_FELIPE), label: "WhatsApp" },
              { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:contato@papyrus.com.br", label: "E-mail" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center border border-white/15 text-white/80 transition-all hover:border-white hover:text-white"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container-px mx-auto mt-14 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/45">
        © {new Date().getFullYear()} Papyrus Comunicação · Todos os direitos reservados.
      </div>
    </footer>
  );
}

/* ---------------- Floating WhatsApp ---------------- */
function FloatingWA() {
  return (
    <a
      href={waLink(WHATSAPP_FELIPE)}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-elegant transition-all hover:scale-110 hover:bg-primary-dark"
      style={{ boxShadow: "var(--shadow-elegant)" }}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

function LandingPage() {
  return (
    <div className="bg-background">
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <MediaTraining />
        <Diferenciais />
        <Especialistas />
        <Resultados />
        <CTA />
      </main>
      <Footer />
      <FloatingWA />
    </div>
  );
}
