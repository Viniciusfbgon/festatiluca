import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import RevealModal from "../components/RevealModal.jsx";

let root;
beforeEach(() => {
  root = document.createElement("div");
  root.id = "root";
  document.body.append(root);
});
afterEach(() => {
  cleanup();
  root.remove();
  vi.restoreAllMocks();
});
describe("Convite acessível", () => {
  it("prende o foco, fecha com Escape e devolve o foco ao botão anterior", () => {
    const trigger = document.createElement("button");
    root.append(trigger);
    trigger.focus();
    const close = vi.fn();
    const { unmount } = render(<RevealModal onClose={close} />);
    const closeButton = screen.getByRole("button", { name: "Fechar convite" });
    expect(document.activeElement).toBe(closeButton);
    expect(root.inert).toBe(true);
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: /Confirmar presença/ }),
    );
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(closeButton);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(close).toHaveBeenCalledOnce();
    unmount();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe("");
  });
  it("não fecha ao clicar dentro e fecha pelo X ou fundo", () => {
    const close = vi.fn();
    render(<RevealModal onClose={close} />);
    fireEvent.click(screen.getByRole("dialog"));
    expect(close).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("dialog").parentElement);
    expect(close).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Fechar convite" }));
    expect(close).toHaveBeenCalledTimes(2);
  });
  it("abre o WhatsApp correto e solicita o envio, sem afirmar confirmação automática", () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<RevealModal onClose={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /Confirmar presença/ }));
    fireEvent.change(screen.getByLabelText("Seu nome"), {
      target: { value: "Vinícius" },
    });
    fireEvent.click(screen.getByLabelText("Sim, +1"));
    fireEvent.click(
      screen.getByRole("button", { name: /Confirmar pelo WhatsApp/ }),
    );
    expect(open).toHaveBeenCalledOnce();
    expect(open.mock.calls[0][0]).toContain(
      "https://wa.me/5531975746400?text=",
    );
    expect(decodeURIComponent(open.mock.calls[0][0])).toContain(
      "Nome: Vinícius. Acompanhante: Sim",
    );
    expect(screen.getByRole("status").textContent).toContain(
      "Envie a mensagem no WhatsApp",
    );
  });
});
