import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "../App.jsx";
import { party } from "../config.js";
vi.mock("../lib/celebrate.js", () => ({
  celebrate: vi.fn().mockResolvedValue(),
}));

beforeEach(() => {
  localStorage.clear();
});
describe("Persistência da revelação", () => {
  it("salva o local revelado e recupera na visita seguinte", () => {
    const { unmount } = render(<App />, {
      container:
        document.getElementById("root") ||
        document.body.appendChild(
          Object.assign(document.createElement("div"), { id: "root" }),
        ),
    });
    fireEvent.click(
      screen.getAllByRole("button", { name: "Revelar local" })[0],
    );
    expect(localStorage.getItem(party.storageKey)).toBe("true");
    expect(screen.getByRole("dialog")).toBeTruthy();
    unmount();
    cleanup();
    render(<App />);
    expect(screen.getAllByRole("button", { name: "Ver local" })).toHaveLength(
      3,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("continua funcionando com localStorage indisponível", () => {
    const read = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("Blocked");
      });
    const write = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("Blocked");
      });
    const root =
      document.getElementById("root") ||
      document.body.appendChild(
        Object.assign(document.createElement("div"), { id: "root" }),
      );
    render(<App />, { container: root });
    fireEvent.click(
      screen.getAllByRole("button", { name: "Revelar local" })[0],
    );
    expect(screen.getByRole("dialog")).toBeTruthy();
    read.mockRestore();
    write.mockRestore();
  });
});
