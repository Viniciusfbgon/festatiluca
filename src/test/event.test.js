import { describe, it, expect } from "vitest";
import { remainingTime, createCalendar, whatsappUrl } from "../lib/event.js";
import { party } from "../config.js";

describe("Horário, agenda e WhatsApp", () => {
  it("calcula o início em Brasília e zera depois da festa", () => {
    expect(
      remainingTime(party.start, Date.parse("2026-09-26T22:00:00Z")),
    ).toEqual([0, 1, 0, 0]);
    expect(
      remainingTime(party.start, Date.parse("2026-09-28T00:00:00Z")),
    ).toEqual([0, 0, 0, 0]);
  });
  it("gera agenda UTC com término às 3h do dia seguinte", () => {
    const calendar = createCalendar();
    expect(calendar).toContain("DTSTART:20260926T230000Z");
    expect(calendar).toContain("DTEND:20260927T060000Z");
    expect(calendar).toContain("SUMMARY:Festa Tyga & Lucca");
    expect(calendar.endsWith("END:VCALENDAR\r\n")).toBe(true);
    expect(
      calendar
        .split("\r\n")
        .every((line) => new TextEncoder().encode(line).length <= 75),
    ).toBe(true);
  });
  it("escapa pontuação e quebras de linha na agenda", () => {
    const calendar = createCalendar({ ...party, venue: "Salão, A; B\nCentro" });
    expect(calendar).toContain("LOCATION:Salão\\, A\\; B\\nCentro");
  });
  it("prepara a mensagem com acentos, nome e acompanhante", () => {
    const url = new URL(whatsappUrl("  João & Ana  ", true));
    expect(url.pathname).toBe("/5531975746400");
    expect(url.searchParams.get("text")).toBe(
      "Oi! Confirmo presença na festa do Tyga & Lucca. Nome: João & Ana. Acompanhante: Sim",
    );
    expect(
      new URL(whatsappUrl("Luísa", false)).searchParams.get("text"),
    ).toContain("Acompanhante: Não");
  });
});
