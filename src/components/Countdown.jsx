import { useEffect, useState } from "react";
import { party } from "../config.js";
import { remainingTime } from "../lib/event.js";
import s from "../styles.module.css";

export default function Countdown() {
  const [time, setTime] = useState(() => remainingTime(party.start));
  useEffect(() => {
    const id = setInterval(() => setTime(remainingTime(party.start)), 1000);
    return () => clearInterval(id);
  }, []);
  const started = time.every((value) => value === 0);
  const ended = Date.now() >= new Date(party.end).getTime();
  return (
    <div className={s.countdownWrap}>
      <p className={s.microLabel}>
        {started
          ? ended
            ? "Uma noite para guardar na memória"
            : "Chegou a nossa noite!"
          : "A contagem para uma noite inesquecível"}
      </p>
      <div
        className={s.countdown}
        role="timer"
        aria-label="Contagem regressiva para a festa"
        aria-live="off"
      >
        {["dias", "horas", "min", "seg"].map((label, index) => (
          <div className={s.timeCard} key={label}>
            <span>{String(time[index]).padStart(2, "0")}</span>
            <small>{label}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
