import { m as motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, LockKeyhole, MapPin } from "lucide-react";
import { useState } from "react";
import s from "../styles.module.css";

export default function RevealButton({ revealed, onClick, className = "" }) {
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  function move(event) {
    if (
      reduced ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - rect.left - rect.width / 2) * 0.055,
      y: (event.clientY - rect.top - rect.height / 2) * 0.08,
    });
  }
  const Icon = revealed ? MapPin : LockKeyhole;
  return (
    <motion.button
      type="button"
      className={`${s.primaryButton} ${className}`}
      onClick={onClick}
      onPointerMove={move}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      animate={reduced ? {} : offset}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
    >
      <Icon size={17} />
      <span>{revealed ? "Ver local" : "Revelar local"}</span>
      <ArrowUpRight size={19} />
    </motion.button>
  );
}
