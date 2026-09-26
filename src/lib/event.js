import { party } from "../config.js";

export function remainingTime(start, now = Date.now()) {
  const total = Math.max(
    0,
    Math.floor((new Date(start).getTime() - now) / 1000),
  );
  return [
    Math.floor(total / 86400),
    Math.floor(total / 3600) % 24,
    Math.floor(total / 60) % 60,
    total % 60,
  ];
}

const escapeIcs = (value) =>
  value
    .replaceAll("\\", "\\\\")
    .replaceAll("\r\n", "\\n")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
const utc = (date) =>
  new Date(date)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
// RFC 5545: fold long lines by UTF-8 octets, never splitting a character.
function foldLine(line) {
  let output = "",
    length = 0;
  for (const char of line) {
    const size = new TextEncoder().encode(char).length;
    if (length + size > 75) {
      output += "\r\n ";
      length = 1;
    }
    output += char;
    length += size;
  }
  return output;
}
export function createCalendar(event = party) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tyga e Lucca//Convite//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:festa-${utc(event.start)}@festatiluca.github.io`,
    `DTSTAMP:${utc(Date.now())}`,
    `DTSTART:${utc(event.start)}`,
    `DTEND:${utc(event.end)}`,
    `SUMMARY:${escapeIcs(`Festa ${event.names}`)}`,
    `LOCATION:${escapeIcs(`${event.venue} — ${event.address}`)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `URL:${event.siteUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ]
    .map(foldLine)
    .join("\r\n");
}
export function downloadCalendar() {
  const url = URL.createObjectURL(
    new Blob([createCalendar()], { type: "text/calendar;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "festa-tyga-lucca.ics";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function whatsappUrl(name, companion, number = party.whatsappNumber) {
  const message = `Oi! Confirmo presença na festa do ${party.names}. Nome: ${name.trim()}. Acompanhante: ${companion ? "Sim" : "Não"}`;
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
