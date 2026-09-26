import { m as motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Shirt,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { imageUrl, party, partyWeekday } from "../config.js";
import s from "../styles.module.css";

export default function PartyInfo({ revealed, onReveal }) {
  const reduced = useReducedMotion();
  const cards = [
    {
      Icon: CalendarDays,
      label: "MARCA NA AGENDA",
      value: party.dateLabel,
      detail: partyWeekday,
    },
    {
      Icon: Clock3,
      label: "SEM PRESSA",
      value: party.timeLabel,
      detail: "A noite é nossa",
    },
    {
      Icon: Shirt,
      label: "DRESS CODE",
      value: party.dressCode,
      detail: "Vista sua melhor versão",
    },
  ];
  return (
    <section id="a-festa" className={s.party} aria-labelledby="party-title">
      <img
        className={s.partyBackground}
        src={imageUrl("foto2.jpg")}
        alt="Retrato de Lucca em frente a uma parede clara e uma janela"
        width="1075"
        height="1075"
        loading="lazy"
        decoding="async"
      />
      <div className={s.partyOverlay} />
      <motion.div
        className={`${s.container} ${s.partyInner}`}
        initial={{ opacity: 0, y: reduced ? 0 : 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <div className={s.sectionHeading}>
          <span className={s.eyebrow}>01 / A FESTA</span>
          <span className={s.tinyStar} aria-hidden="true">
            ✳
          </span>
        </div>
        <div className={s.partyIntro}>
          <h2 id="party-title">
            A gente faz a festa.
            <br />
            <span>Você faz parte.</span>
          </h2>
          <div>
            <p>{party.intro}</p>
            <p>{party.invite}</p>
          </div>
        </div>
        <div className={s.infoGrid}>
          {cards.map(({ Icon, label, value, detail }, index) => (
            <motion.div
              className={s.infoCard}
              key={label}
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduced ? 0 : index * 0.1 }}
            >
              <Icon className={s.cardIcon} size={23} />
              <span className={s.microLabel}>{label}</span>
              <h3>{value}</h3>
              <p>{detail}</p>
            </motion.div>
          ))}
          <motion.button
            onClick={onReveal}
            className={`${s.infoCard} ${s.secretCard}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: reduced ? 0 : 0.3 }}
            aria-label={
              revealed ? `Ver local: ${party.venue}` : "Revelar o local secreto"
            }
          >
            <MapPin className={s.cardIcon} size={23} />
            <span className={s.microLabel}>O PONTO DE ENCONTRO</span>
            <h3 className={revealed ? "" : s.secretText}>
              {revealed ? party.venue : "???"}
            </h3>
            <p>
              {revealed ? "Ver os detalhes" : "Nosso pequeno segredo"}
              <ArrowUpRight size={15} />
            </p>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
