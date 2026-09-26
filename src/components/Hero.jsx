import { m as motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { imageUrl, party, partyWeekday } from "../config.js";
import Countdown from "./Countdown.jsx";
import RevealButton from "./RevealButton.jsx";
import s from "../styles.module.css";

export default function Hero({ revealed, onReveal }) {
  const reduced = useReducedMotion();
  const names = party.names.split(" & ");
  function glow(event) {
    if (reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--cursor-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--cursor-y",
      `${event.clientY - bounds.top}px`,
    );
  }
  return (
    <section
      className={s.hero}
      onPointerMove={glow}
      aria-labelledby="hero-title"
    >
      <div className={s.heroImage}>
        <img
          src={imageUrl("hero.jpg")}
          alt="Tyga e Lucca juntos em uma balada, com palco e luzes azuis ao fundo"
          width="900"
          height="1600"
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <div className={s.heroOverlay} />
      <div className={s.cursorGlow} aria-hidden="true" />
      <header className={`${s.header} ${s.container}`}>
        <a href="#" className={s.brand} aria-label="T&L. Tyga e Lucca, início">
          T<span>&</span>L<span className={s.brandDot}>.</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#a-festa">A festa</a>
          <button onClick={onReveal}>
            {revealed ? "Ver local" : "Seu convite"}
            <ArrowUpRight size={15} />
          </button>
        </nav>
      </header>
      <div className={`${s.heroContent} ${s.container}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={s.eyebrow}
        >
          <span className={s.statusDot} />
          UMA NOITE. NOSSAS HISTÓRIAS.
        </motion.div>
        <h1 id="hero-title" className={s.heroTitle} aria-label={party.names}>
          {names.map((name, index) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              aria-hidden="true"
            >
              {index > 0 && <em>&</em>}
              {name}
            </motion.span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className={s.heroSubtitle}>
            Você está convidado.
            <br />
            <span>O local é segredo… por enquanto.</span>
          </p>
          <div className={s.heroActions}>
            <RevealButton revealed={revealed} onClick={onReveal} />
            <span className={s.hint}>
              <Sparkles size={13} />A noite começa com uma surpresa.
            </span>
          </div>
          <Countdown />
        </motion.div>
      </div>
      <div className={`${s.heroBottom} ${s.container}`}>
        <a href="#a-festa" className={s.scrollHint}>
          <span className={s.scrollIcon}>
            <ArrowDown size={16} />
          </span>
          VEM SENTIR O CLIMA
        </a>
        <div className={s.heroDate}>
          {party.dateLabel.replaceAll("/", ".")}
          <span>
            {partyWeekday} · {party.timeLabel}
          </span>
        </div>
      </div>
      <span className={s.verticalLabel} aria-hidden="true">
        BOAS COMPANHIAS. GRANDES MEMÓRIAS.
      </span>
    </section>
  );
}
