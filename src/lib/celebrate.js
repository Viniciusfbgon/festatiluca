export async function celebrate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { default: confetti } = await import("canvas-confetti");
  const options = {
    colors: ["#3B82F6", "#FFFFFF", "#A78BFA", "#D9B76F"],
    disableForReducedMotion: true,
    zIndex: 150,
    ticks: 110,
    gravity: 1.1,
    scalar: 0.85,
  };
  confetti({
    ...options,
    particleCount: 30,
    angle: 60,
    spread: 50,
    origin: { x: 0, y: 0.88 },
  });
  confetti({
    ...options,
    particleCount: 30,
    angle: 120,
    spread: 50,
    origin: { x: 1, y: 0.88 },
  });
  setTimeout(
    () =>
      confetti({
        ...options,
        particleCount: 38,
        spread: 75,
        startVelocity: 28,
        origin: { x: 0.5, y: 0.7 },
      }),
    450,
  );
}
