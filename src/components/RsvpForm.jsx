import { useState } from "react";
import { m as motion, useReducedMotion } from "framer-motion";
import { Check, ArrowUpRight, Send } from "lucide-react";
import { whatsappUrl } from "../lib/event.js";
import { party } from "../config.js";
import s from "../styles.module.css";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [companion, setCompanion] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const reduced = useReducedMotion();
  const url = whatsappUrl(name, companion);
  function submit(event) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Conta pra gente o seu nome.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }
  if (sent)
    return (
      <motion.div
        className={s.success}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        role="status"
      >
        <motion.div
          className={s.successIcon}
          initial={reduced ? false : { scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          <Check size={27} />
        </motion.div>
        <h3>Mensagem pronta, {name.trim().split(" ")[0]}!</h3>
        <p>Envie a mensagem no WhatsApp para concluir sua confirmação.</p>
        <a
          className={s.textLink}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir WhatsApp novamente
          <ArrowUpRight size={16} />
        </a>
      </motion.div>
    );
  return (
    <form onSubmit={submit} className={s.rsvpForm}>
      <h3>Você vem com a gente?</h3>
      <label htmlFor="guest-name">Seu nome</label>
      <input
        id="guest-name"
        name="name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setError("");
        }}
        placeholder="Como podemos te chamar?"
        maxLength={100}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "name-error" : undefined}
      />
      {error && (
        <p id="name-error" className={s.formError}>
          {error}
        </p>
      )}
      <fieldset>
        <legend>Vai levar acompanhante?</legend>
        <div className={s.radioGroup}>
          {[
            { value: false, label: "Não, só eu" },
            { value: true, label: "Sim, +1" },
          ].map(({ value, label }) => (
            <label key={label}>
              <input
                type="radio"
                name="companion"
                checked={companion === value}
                onChange={() => setCompanion(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <button className={s.primaryButton} type="submit">
        <Send size={17} />
        Confirmar pelo WhatsApp
        <ArrowUpRight size={18} />
      </button>
      <p className={s.formHint}>
        {party.whatsappNumber
          ? "Você só precisa enviar a mensagem que preparamos."
          : "No WhatsApp, escolha o contato de um dos anfitriões e envie."}
      </p>
    </form>
  );
}
