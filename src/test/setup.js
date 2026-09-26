import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
);
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi
    .fn()
    .mockImplementation((query) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
});
afterEach(() => cleanup());
