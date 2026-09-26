import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  LazyMotion,
  domAnimation,
} from "framer-motion";
import { party } from "./config.js";
import { celebrate } from "./lib/celebrate.js";
import Hero from "./components/Hero.jsx";
import PartyInfo from "./components/PartyInfo.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";
import RevealModal from "./components/RevealModal.jsx";
import s from "./styles.module.css";

export default function App() {
  const [revealed, setRevealed] = useState(() => {
    try {
      return localStorage.getItem(party.storageKey) === "true";
    } catch {
      return false;
    }
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    celebrate(controller.signal).catch(() => {});
    return () => controller.abort();
  }, [open]);
  const close = useCallback(() => setOpen(false), []);
  function reveal() {
    setOpen(true);
    setRevealed(true);
    try {
      localStorage.setItem(party.storageKey, "true");
    } catch {
      /* Private browsing must not block the invitation. */
    }
  }
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <a className={s.skipLink} href="#a-festa">
          Pular para os detalhes da festa
        </a>
        <main>
          <Hero revealed={revealed} onReveal={reveal} />
          <PartyInfo revealed={revealed} onReveal={reveal} />
          <FinalCTA revealed={revealed} onReveal={reveal} />
        </main>
        <Footer />
        <AnimatePresence>
          {open && <RevealModal onClose={close} />}
        </AnimatePresence>
      </LazyMotion>
    </MotionConfig>
  );
}
