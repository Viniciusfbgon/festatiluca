import { useRef } from "react";
import { m as motion, useReducedMotion, useInView } from "framer-motion";
import { imageUrl } from "../config.js";
import RevealButton from "./RevealButton.jsx";
import s from "../styles.module.css";

export default function FinalCTA({ revealed, onReveal }) {
  const reduced = useReducedMotion();
  const section = useRef(null);
  const nearby = useInView(section, { once: true, margin: "200px" });
  return (
    <section
      ref={section}
      className={s.finalSection}
      aria-labelledby="final-title"
    >
      <div className={`${s.container} ${s.finalContainer}`}>
        <div className={s.finalImage}>
          {nearby && (
            <img
              src={imageUrl("foto3.jpg")}
              alt="Tyga ao ar livre em um jardim de flores sob o céu azul"
              width="1079"
              height="1439"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <div className={s.finalOverlay} />
        <motion.div
          className={s.finalContent}
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={s.eyebrow}>02 / O PRÓXIMO PASSO É SEU</span>
          <h2 id="final-title">
            Pronto pra descobrir
            <br />
            <span>onde vai ser?</span>
          </h2>
          <p>
            O melhor da noite é quem está nela.
            <br />E a sua presença já faz toda a diferença.
          </p>
          <RevealButton revealed={revealed} onClick={onReveal} />
        </motion.div>
        <span className={s.finalNote}>NOS VEMOS LÁ ↗</span>
      </div>
    </section>
  );
}
