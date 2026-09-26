import { party } from "../config.js";
import s from "../styles.module.css";
export default function Footer() {
  return (
    <footer className={`${s.footer} ${s.container}`}>
      <span>
        {party.names} · {new Date(party.start).getFullYear()}
      </span>
      <span>
        Feito para virar memória.<span className={s.brandDot}> ✳</span>
      </span>
    </footer>
  );
}
