export async function celebrate(signal) {
  if (
    signal?.aborted ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const { default: confetti } = await import("canvas-confetti");
  if (signal?.aborted) return;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "150",
  });
  document.body.append(canvas);
  const rain = confetti.create(canvas, { resize: true });
  const options = {
    colors: ["#FFFFFF", "#FFFFFF", "#BDBDBD", "#171717"],
    disableForReducedMotion: true,
    particleCount: 4,
    angle: 270,
    spread: 75,
    startVelocity: 4,
    ticks: 180,
    gravity: 0.8,
    scalar: 0.85,
  };
  const started = performance.now();
  function drop() {
    if (performance.now() - started >= 2500) {
      clearInterval(interval);
      return;
    }
    rain({
      ...options,
      drift: (Math.random() - 0.5) * 0.5,
      origin: { x: Math.random(), y: -0.05 },
    });
  }
  const interval = setInterval(drop, 100);
  // Let the last pieces fall, then release the canvas and timers.
  const timeout = setTimeout(stop, 5600);
  function stop() {
    clearInterval(interval);
    clearTimeout(timeout);
    rain.reset();
    canvas.remove();
    signal?.removeEventListener("abort", stop);
  }
  signal?.addEventListener("abort", stop, { once: true });
  drop();
}
