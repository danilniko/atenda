"use client";

import { useEffect, useState } from "react";
import { Hourglass, PartyPopper } from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [spots, setSpots] = useState(7);

  useEffect(() => {
    try {
      let n = Number(localStorage.getItem("atenda_spots"));
      if (!n) {
        n = 5 + Math.floor(Math.random() * 4);
        localStorage.setItem("atenda_spots", String(n));
      }
      setSpots(n);
    } catch {}
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setBusy(true);
    setErr("");
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      business: String(fd.get("business") || ""),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      booking_system: String(fd.get("booking_system") || ""),
      about: String(fd.get("about") || "").trim(),
      website: String(fd.get("website") || ""), // honeypot
      utm: typeof window !== "undefined" ? window.location.search : "",
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }
      setSent(true);
    } catch {
      setErr("Não foi possível enviar. Tente novamente, por favor.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="form-ok">
        <div className="big">
          <PartyPopper size={40} />
        </div>
        <h3>Lugar reservado!</h3>
        <p>
          Vamos contactá-lo nas próximas 24 horas úteis. Fique atento ao
          telemóvel — pode ser a Atenda a ligar.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <h3>Reservar o meu lugar</h3>
      <p className="fsub">Respondemos em menos de 24 horas úteis.</p>

      <div className="field">
        <label htmlFor="f-name">Nome</label>
        <input id="f-name" name="name" type="text" placeholder="Maria Santos" required />
      </div>

      <div className="field">
        <label htmlFor="f-biz">Negócio</label>
        <select id="f-biz" name="business" required defaultValue="">
          <option value="" disabled>Escolha uma opção</option>
          <option>Salão de cabeleireiro</option>
          <option>Barbearia</option>
          <option>Clínica dentária</option>
          <option>Clínica de estética</option>
          <option>Fisioterapia / Osteopatia</option>
          <option>Clínica veterinária</option>
          <option>Nail studio</option>
          <option>Restaurante</option>
          <option>Outro</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="f-phone">Telemóvel / WhatsApp</label>
        <input id="f-phone" name="phone" type="tel" placeholder="+351 912 345 678" required />
      </div>

      <div className="field">
        <label htmlFor="f-email">Email (opcional)</label>
        <input id="f-email" name="email" type="email" placeholder="maria@osalao.pt" />
      </div>

      <div className="field">
        <label htmlFor="f-sys">Como gere as marcações hoje? (opcional)</label>
        <select id="f-sys" name="booking_system" defaultValue="">
          <option value="" disabled>Escolha uma opção</option>
          <option>Caderno / papel</option>
          <option>Google Calendar</option>
          <option>Fresha</option>
          <option>Excel</option>
          <option>Outro software</option>
          <option>WhatsApp / memória</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="f-about">
          Fale-nos do seu negócio e do que gostaria de melhorar nas marcações (opcional)
        </label>
        <textarea
          id="f-about"
          name="about"
          maxLength={800}
          placeholder="Ex.: Tenho um salão com 3 cadeiras. Perdemos chamadas quando estamos a atender e as DMs do Instagram ficam horas sem resposta…"
        />
      </div>

      {/* honeypot — invisível para humanos */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
        aria-hidden="true"
      />

      <label className="consent">
        <input type="checkbox" required />
        <span>
          Aceito ser contactado(a) pela Atenda sobre este pedido. Dados usados
          só para este fim, apagados a pedido (RGPD).
        </span>
      </label>

      <button type="submit" className="pill pill-cta pill-lg form-btn" disabled={busy}>
        {busy ? "A enviar…" : "Quero a demonstração →"}
      </button>
      {err && <p className="form-err">{err}</p>}
      <p className="spots">
        <Hourglass size={13} /> <b>{spots}</b> vagas restantes nesta fase
      </p>
    </form>
  );
}
