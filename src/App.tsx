import { FormEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  FilePenLine,
  Menu,
  MessageCircle,
  MousePointer2,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

type FormData = {
  name: string;
  phone: string;
  email: string;
  documentType: "CPF" | "CNPJ";
  document: string;
};

const plans: Plan[] = [
  {
    name: "Essencial",
    price: "49",
    description: "Para quem quer tirar as propostas do improviso.",
    features: ["Até 20 propostas/mês", "Modelos personalizados", "Assinatura digital", "Suporte por e-mail"],
  },
  {
    name: "Profissional",
    price: "89",
    description: "Para negócios que querem vender mais, com mais controle.",
    features: ["Propostas ilimitadas", "Dashboard de resultados", "Notificações em tempo real", "Identidade visual", "Suporte prioritário"],
    featured: true,
  },
  {
    name: "Equipe",
    price: "149",
    description: "Para times comerciais que precisam ganhar escala.",
    features: ["Tudo do Profissional", "Até 5 usuários", "Gestão de permissões", "Relatórios por vendedor", "Onboarding assistido"],
  },
];

const faqs = [
  ["Preciso cadastrar cartão para testar?", "Não. Você pode começar o período de teste sem cadastrar cartão e decide depois se quer continuar."],
  ["Consigo usar a minha identidade visual?", "Sim. Você personaliza cores, logo, dados da empresa e deixa cada proposta com a cara do seu negócio."],
  ["O cliente precisa instalar alguma coisa?", "Não. Ele recebe um link, abre a proposta em qualquer dispositivo e pode aprovar de forma simples e segura."],
  ["Posso cancelar quando quiser?", "Sim. Não há fidelidade ou multa. Você gerencia seu plano com total autonomia."],
];

const initialForm: FormData = {
  name: "",
  phone: "",
  email: "",
  documentType: "CPF",
  document: "",
};

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`logo ${light ? "logo-light" : ""}`} href="#inicio" aria-label="Proposta Express — início">
      <span className="logo-mark"><FilePenLine size={19} strokeWidth={2.4} /></span>
      <span>proposta<span>express</span></span>
    </a>
  );
}

function App() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[1]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = modalOpen || mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen, mobileOpen]);

  const openSignup = (plan = plans[1]) => {
    setSelectedPlan(plan);
    setSubmitted(false);
    setModalOpen(true);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, "") || "";
    const message = [
      "Olá! Novo cadastro de teste no Proposta Express:",
      "",
      `Plano: ${selectedPlan.name}`,
      `Nome: ${form.name}`,
      `Telefone: ${form.phone}`,
      `E-mail: ${form.email}`,
      `${form.documentType}: ${form.document}`,
    ].join("\n");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const reveal = useMemo(() => ({
    initial: reduceMotion ? {} : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: .55, ease: [0.22, 1, 0.36, 1] as const },
  }), [reduceMotion]);

  return (
    <main>
      <header className="nav-shell">
        <nav className="nav container" aria-label="Navegação principal">
          <Logo />
          <div className="nav-links">
            <a href="#como-funciona">Como funciona</a>
            <a href="#recursos">Recursos</a>
            <a href="#planos">Planos</a>
            <a href="#duvidas">Dúvidas</a>
          </div>
          <div className="nav-actions">
            <a className="login-link" href="#login">Entrar</a>
            <button className="button button-dark button-sm" onClick={() => openSignup()}>
              Testar grátis <ArrowRight size={16} />
            </button>
          </div>
          <button className="mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <Menu />
          </button>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid-bg" />
        <div className="container hero-grid">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
            <div className="eyebrow"><span><Sparkles size={13} /></span> Sua proposta. Seu próximo sim.</div>
            <h1>Propostas que<br />chegam <em>longe.</em></h1>
            <p>Crie propostas profissionais, envie em segundos e acompanhe cada visualização — tudo em um só lugar.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => openSignup()}>
                Começar meu teste <ArrowRight size={18} />
              </button>
              <a className="text-link" href="#como-funciona"><span><MousePointer2 size={16} /></span> Ver como funciona</a>
            </div>
            <div className="hero-trust">
              <div className="avatar-stack" aria-hidden="true">
                <span>AM</span><span>RS</span><span>JC</span><span>+</span>
              </div>
              <div><strong>+1.200 negócios</strong><small>já enviam propostas melhores</small></div>
            </div>
          </motion.div>

          <motion.div className="hero-visual" initial={{ opacity: 0, x: 35, rotate: 1 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: .75, delay: .15 }}>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <DashboardMockup />
            <motion.div className="floating-card approved-card" animate={reduceMotion ? {} : { y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}>
              <span className="success-icon"><Check size={17} /></span>
              <div><small>Proposta #0042</small><strong>Aprovada!</strong></div>
            </motion.div>
            <motion.div className="floating-card view-card" animate={reduceMotion ? {} : { y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}>
              <span className="pulse-dot" />
              <div><strong>Cliente visualizando</strong><small>agora</small></div>
            </motion.div>
          </motion.div>
        </div>
        <div className="hero-marquee">
          <div>PROPOSTAS MAIS RÁPIDAS <span>✦</span> MAIS PROFISSIONALISMO <span>✦</span> MAIS NEGÓCIOS FECHADOS <span>✦</span> PROPOSTAS MAIS RÁPIDAS <span>✦</span></div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container stats-grid">
          <div><strong>12 min</strong><span>para criar uma proposta</span></div>
          <div><strong>3,2×</strong><span>mais respostas de clientes</span></div>
          <div><strong>68%</strong><span>de economia no processo</span></div>
          <div className="rated"><strong>4.9 <span>★★★★★</span></strong><span>avaliação dos usuários</span></div>
        </div>
      </section>

      <section className="section how-section" id="como-funciona">
        <div className="container">
          <motion.div className="section-heading centered" {...reveal}>
            <span className="section-kicker">Simples de verdade</span>
            <h2>Do zero ao <em>fechado</em><br />em três passos.</h2>
            <p>Sem planilhas, arquivos perdidos ou aquela dúvida se o cliente abriu o PDF.</p>
          </motion.div>
          <div className="steps-grid">
            {[
              [FilePenLine, "01", "Crie", "Escolha um modelo, personalize e monte sua proposta em poucos minutos."],
              [Send, "02", "Envie", "Compartilhe um link elegante por WhatsApp, e-mail ou onde preferir."],
              [BarChart3, "03", "Acompanhe", "Saiba quando o cliente abriu, visualizou e aprovou a proposta."],
            ].map(([Icon, number, title, text], index) => (
              <motion.article className="step-card" key={String(title)} {...reveal} transition={{ ...reveal.transition, delay: index * .1 }}>
                <div className="step-top"><span className="step-icon"><Icon size={24} /></span><span className="step-number">{number as string}</span></div>
                <h3>{title as string}</h3>
                <p>{text as string}</p>
                {index < 2 && <span className="step-arrow"><ArrowRight /></span>}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section features-section" id="recursos">
        <div className="container">
          <motion.div className="section-heading split-heading" {...reveal}>
            <div><span className="section-kicker dark">Tudo no lugar certo</span><h2>Menos operação.<br /><em>Mais fechamento.</em></h2></div>
            <p>Ferramentas pensadas para deixar sua rotina comercial mais simples, organizada e convincente.</p>
          </motion.div>
          <div className="bento-grid">
            <SpotlightCard className="bento-card bento-large">
              <div className="card-tag"><Zap size={14} /> Agilidade</div>
              <h3>Propostas prontas<br />em minutos.</h3>
              <p>Use modelos inteligentes, blocos reutilizáveis e salve seus produtos para nunca começar do zero.</p>
              <ProposalBuilderMockup />
            </SpotlightCard>
            <SpotlightCard className="bento-card bento-orange">
              <div className="card-tag light"><Clock3 size={14} /> Em tempo real</div>
              <h3>Você sabe.<br />Na hora.</h3>
              <p>Receba uma notificação assim que seu cliente abrir ou aprovar.</p>
              <div className="notification-demo">
                <span><Check size={18} /></span>
                <div><strong>Proposta visualizada</strong><small>Studio Aurora • agora</small></div>
              </div>
            </SpotlightCard>
            <SpotlightCard className="bento-card">
              <div className="card-tag"><ShieldCheck size={14} /> Confiança</div>
              <h3>Aprovação simples<br />e segura.</h3>
              <p>Seu cliente aprova online, de qualquer dispositivo. Sem imprimir nada.</p>
              <div className="signature-demo">
                <span>Assinatura do cliente</span>
                <strong>Marina Costa</strong>
                <div><span><Check size={14} /> Assinado digitalmente</span><small>22 jul, 14:32</small></div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="container testimonial-wrap">
          <Quote size={50} strokeWidth={1.2} />
          <motion.blockquote {...reveal}>
            “Antes eu levava quase uma hora para montar uma proposta. Hoje faço em dez minutos e ainda sei exatamente quando o cliente abriu.”
          </motion.blockquote>
          <div className="testimonial-author"><span>LC</span><div><strong>Lucas Campos</strong><small>Fundador, Norte Arquitetura</small></div></div>
        </div>
      </section>

      <section className="section pricing-section" id="planos">
        <div className="container">
          <motion.div className="section-heading centered" {...reveal}>
            <span className="section-kicker">Planos sem complicação</span>
            <h2>Escolha seu ritmo.<br /><em>Comece agora.</em></h2>
            <p>7 dias grátis em qualquer plano. Sem cartão de crédito, sem pegadinha.</p>
          </motion.div>
          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <motion.article className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.name} {...reveal} transition={{ ...reveal.transition, delay: index * .08 }}>
                {plan.featured && <span className="popular-badge"><Sparkles size={13} /> Mais escolhido</span>}
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <div className="price"><span>R$</span><strong>{plan.price}</strong><small>/mês</small></div>
                <button className={`button ${plan.featured ? "button-primary" : "button-outline"}`} onClick={() => openSignup(plan)}>
                  Testar este plano <ArrowRight size={17} />
                </button>
                <ul>
                  {plan.features.map(feature => <li key={feature}><span><Check size={14} /></span>{feature}</li>)}
                </ul>
              </motion.article>
            ))}
          </div>
          <div className="pricing-note"><ShieldCheck size={16} /> Cancele quando quiser. Seus dados estão sempre seguros.</div>
        </div>
      </section>

      <section className="section faq-section" id="duvidas">
        <div className="container faq-layout">
          <div className="faq-intro">
            <span className="section-kicker dark">Dúvidas frequentes</span>
            <h2>Você pergunta.<br /><em>A gente responde.</em></h2>
            <p>Ficou com outra dúvida?</p>
            <a href="https://wa.me/" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Fale com a gente</a>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => {
              const open = activeFaq === index;
              return (
                <div className={`faq-item ${open ? "open" : ""}`} key={question}>
                  <button onClick={() => setActiveFaq(open ? null : index)} aria-expanded={open}>
                    <span>{String(index + 1).padStart(2, "0")}</span>{question}<ChevronDown size={20} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{answer}</p></motion.div>}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-glow" />
        <div className="container final-cta-inner">
          <span className="section-kicker light">Seu próximo negócio começa aqui</span>
          <h2>Chega de proposta<br />que fica no <em>vácuo.</em></h2>
          <p>Crie sua conta em menos de 2 minutos.<br />O próximo “sim” pode estar mais perto do que parece.</p>
          <button className="button button-white" onClick={() => openSignup()}>
            Começar grátis agora <ArrowRight size={18} />
          </button>
          <small><CheckCircle2 size={14} /> 7 dias grátis &nbsp; <CheckCircle2 size={14} /> Sem cartão &nbsp; <CheckCircle2 size={14} /> Cancele quando quiser</small>
        </div>
      </section>

      <footer>
        <div className="container footer-main">
          <div><Logo light /><p>Propostas mais profissionais.<br />Negócios que avançam.</p></div>
          <div><strong>Produto</strong><a href="#recursos">Recursos</a><a href="#planos">Planos</a><a href="#como-funciona">Como funciona</a></div>
          <div><strong>Ajuda</strong><a href="#duvidas">Central de ajuda</a><a href="#duvidas">Fale conosco</a><a href="#duvidas">Termos de uso</a></div>
          <div className="footer-newsletter"><strong>Dicas que ajudam a fechar</strong><p>Conteúdo prático, direto no seu e-mail.</p><div><input type="email" placeholder="seu@email.com" aria-label="Seu e-mail" /><button aria-label="Cadastrar e-mail"><ArrowRight size={18} /></button></div></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Proposta Express. Todos os direitos reservados.</span><span>Feito com intenção no Brasil 🇧🇷</span></div>
      </footer>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mobile-menu-top"><Logo /><button onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X /></button></div>
            <div className="mobile-links">
              {["Como funciona", "Recursos", "Planos", "Dúvidas"].map((label, index) => <a key={label} href={["#como-funciona", "#recursos", "#planos", "#duvidas"][index]} onClick={() => setMobileOpen(false)}>{label}<ArrowRight /></a>)}
            </div>
            <button className="button button-primary" onClick={() => { setMobileOpen(false); openSignup(); }}>Começar teste grátis</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && (
          <SignupModal
            plan={selectedPlan}
            form={form}
            submitted={submitted}
            setForm={setForm}
            onSubmit={handleSubmit}
            onClose={() => setModalOpen(false)}
            onReset={() => { setForm(initialForm); setSubmitted(false); setModalOpen(false); }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };
  return <article className={`spotlight-card ${className || ""}`} onMouseMove={handleMove}>{children}</article>;
}

function DashboardMockup() {
  return (
    <div className="dashboard">
      <aside>
        <span className="mini-logo"><FilePenLine size={15} /></span>
        {[0,1,2,3,4].map(i => <i key={i} className={i === 1 ? "active" : ""} />)}
      </aside>
      <div className="dashboard-main">
        <div className="dash-head"><div><small>Visão geral</small><strong>Olá, Mariana 👋</strong></div><span>MC</span></div>
        <div className="dash-cards">
          <div><small>Propostas enviadas</small><strong>48</strong><em>+12%</em></div>
          <div><small>Taxa de aprovação</small><strong>72%</strong><em>+8%</em></div>
          <div><small>Em negociação</small><strong>R$ 38,4k</strong></div>
        </div>
        <div className="dash-content">
          <div className="dash-chart">
            <div className="dash-title"><strong>Desempenho</strong><small>Últimos 7 dias</small></div>
            <svg viewBox="0 0 390 140" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff5b3a" stopOpacity=".3"/><stop offset="100%" stopColor="#ff5b3a" stopOpacity="0"/></linearGradient></defs>
              <path d="M0 120 C45 115,55 70,95 88 S145 110,180 60 S230 75,265 38 S330 70,390 22 L390 140 L0 140Z" fill="url(#area)" />
              <path d="M0 120 C45 115,55 70,95 88 S145 110,180 60 S230 75,265 38 S330 70,390 22" fill="none" stroke="#ff5b3a" strokeWidth="3" />
            </svg>
          </div>
          <div className="dash-list">
            <div className="dash-title"><strong>Recentes</strong><small>Ver todas</small></div>
            {["Studio Aurora", "Octa Engenharia", "Café do Norte"].map((name, i) => <div className="proposal-row" key={name}><span>{name[0]}</span><div><strong>{name}</strong><small>Proposta #{44 - i}</small></div><em className={i === 2 ? "waiting" : ""}>{i === 0 ? "Aprovada" : i === 1 ? "Visualizada" : "Enviada"}</em></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProposalBuilderMockup() {
  return (
    <div className="builder-mockup">
      <div className="builder-bar"><i /><i /><i /><span>Nova proposta</span></div>
      <div className="builder-body">
        <div className="builder-tools"><span className="selected" /><span /><span /><span /></div>
        <div className="builder-page">
          <div className="builder-logo" /><div className="builder-lines"><i /><i /></div>
          <div className="builder-hero-line" />
          <div className="builder-columns"><span /><span /><span /></div>
        </div>
      </div>
    </div>
  );
}

type SignupProps = {
  plan: Plan;
  form: FormData;
  submitted: boolean;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (event: FormEvent) => void;
  onClose: () => void;
  onReset: () => void;
};

function SignupModal({ plan, form, submitted, setForm, onSubmit, onClose, onReset }: SignupProps) {
  const update = (field: keyof FormData, value: string) => setForm(current => ({ ...current, [field]: value }));
  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-title" initial={{ opacity: 0, y: 28, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={20} /></button>
        <div className="modal-side">
          <Logo light />
          <div>
            <span className="modal-kicker">Seu plano</span>
            <h3>{plan.name}</h3>
            <div className="modal-price"><span>R$</span><strong>{plan.price}</strong><small>/mês</small></div>
            <ul>{plan.features.slice(0, 4).map(item => <li key={item}><Check size={14} /> {item}</li>)}</ul>
          </div>
          <small><ShieldCheck size={15} /> 7 dias grátis. Sem cartão.</small>
        </div>
        <div className="modal-form-area">
          {!submitted ? (
            <>
              <div className="modal-heading">
                <span>Leva menos de 2 minutos</span>
                <h2 id="signup-title">Comece seu teste grátis.</h2>
                <p>Preencha seus dados e continue pelo WhatsApp.</p>
              </div>
              <form onSubmit={onSubmit}>
                <label><span>Nome completo</span><input required autoFocus value={form.name} onChange={e => update("name", e.target.value)} placeholder="Como podemos te chamar?" /></label>
                <div className="form-row">
                  <label><span>Telefone</span><input required type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="(00) 00000-0000" /></label>
                  <label><span>E-mail</span><input required type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="voce@empresa.com" /></label>
                </div>
                <label><span>Identificação</span><div className="document-input"><select value={form.documentType} onChange={e => update("documentType", e.target.value)} aria-label="Tipo de documento"><option>CPF</option><option>CNPJ</option></select><input required value={form.document} onChange={e => update("document", e.target.value)} placeholder={form.documentType === "CPF" ? "000.000.000-00" : "00.000.000/0000-00"} /></div></label>
                <button className="button button-primary submit-button" type="submit">Continuar pelo WhatsApp <MessageCircle size={18} /></button>
                <small className="privacy-copy">Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.</small>
              </form>
            </>
          ) : (
            <motion.div className="success-state" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <span><Check size={28} /></span>
              <h2>Tudo certo, {form.name.split(" ")[0]}!</h2>
              <p>A conversa foi aberta no WhatsApp com seus dados e o plano <strong>{plan.name}</strong>. É só enviar a mensagem para nosso time.</p>
              <button className="button button-dark" onClick={onReset}>Concluir <ArrowRight size={17} /></button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;
