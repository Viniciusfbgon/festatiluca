import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { m as motion, useReducedMotion } from "framer-motion";
import {
  X,
  MapPin,
  CalendarPlus,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";
import { party, partyDate } from "../config.js";
import { downloadCalendar } from "../lib/event.js";
import RsvpForm from "./RsvpForm.jsx";
import s from "../styles.module.css";

export default function RevealModal({ onClose }) {
  const reduced = useReducedMotion();
  const dialog = useRef(null);
  const [rsvp, setRsvp] = useState(false);
  useEffect(() => {
    const previous = document.activeElement;
    const root = document.getElementById("root");
    const oldInert = root.inert;
    const overflow = document.body.style.overflow;
    root.inert = true;
    document.body.style.overflow = "hidden";
    dialog.current.querySelector("button").focus();
    function keydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key !== "Tab") return;
      const elements = [...dialog.current.querySelectorAll("*")].filter(
        (element) => element.tabIndex >= 0 && !element.disabled,
      );
      const first = elements[0],
        last = elements.at(-1);
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          !dialog.current.contains(document.activeElement))
      ) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !dialog.current.contains(document.activeElement))
      ) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      root.inert = oldInert;
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", keydown);
      previous?.focus();
    };
  }, [onClose]);
  return createPortal(
    <motion.div
      className={s.modalBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialog}
        className={s.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="venue-address"
        initial={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={
          reduced
            ? { duration: 0.2 }
            : { type: "spring", damping: 25, stiffness: 280 }
        }
      >
        <button
          className={s.closeButton}
          aria-label="Fechar convite"
          onClick={onClose}
        >
          <X size={21} />
        </button>
        <div className={s.modalSymbol}>
          <MapPin size={29} />
        </div>
        <span className={s.eyebrow}>
          <Sparkles size={13} />
          SEGREDO COMPARTILHADO
        </span>
        <h2 id="modal-title">O local foi revelado!</h2>
        <p className={s.venue} aria-label={party.venue}>
          {[...party.venue].map((letter, index) => (
            <motion.span
              aria-hidden="true"
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : 0.25 + index * 0.045 }}
            >
              {letter}
            </motion.span>
          ))}
        </p>
        <p id="venue-address" className={s.address}>
          {party.address}
        </p>
        <div className={s.modalDetails}>
          <span>
            <CalendarDays size={16} />
            {partyDate}
          </span>
          <span>
            <Clock3 size={16} />
            {party.timeLabel}
          </span>
        </div>
        <div className={s.modalActions}>
          {party.mapsUrl ? (
            <a
              href={party.mapsUrl}
              className={s.secondaryButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={16} />
              Abrir no mapa
              <ArrowUpRight size={15} />
            </a>
          ) : (
            <button
              disabled
              className={s.secondaryButton}
              title="O mapa ficará disponível quando o local for definido."
            >
              <MapPin size={16} />
              Mapa em breve
            </button>
          )}
          <button className={s.secondaryButton} onClick={downloadCalendar}>
            <CalendarPlus size={16} />
            Adicionar à agenda
          </button>
        </div>
        {!rsvp ? (
          <button
            className={`${s.primaryButton} ${s.rsvpButton}`}
            onClick={() => setRsvp(true)}
          >
            Confirmar presença
            <ArrowUpRight size={18} />
          </button>
        ) : (
          <RsvpForm />
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
