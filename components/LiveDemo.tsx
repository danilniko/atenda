"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Phone,
  PhoneIncoming,
  PhoneOff,
  Mic,
  Brain,
  CalendarDays,
  CalendarCheck,
  Send,
  FileText,
  Bell,
  Moon,
  Clock,
  RefreshCw,
  Megaphone,
  Instagram,
  Mail,
  Target,
  BookOpen,
  MessageCircle,
  User,
  Bot,
  Check,
  Signal,
  Sparkles,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { SCENARIOS, type Scenario } from "@/lib/scenarios";

const ACT_ICONS: Record<string, LucideIcon> = {
  phone: Phone,
  mic: Mic,
  brain: Brain,
  cal: CalendarDays,
  calok: CalendarCheck,
  send: Send,
  note: FileText,
  bell: Bell,
  moon: Moon,
  clock: Clock,
  refresh: RefreshCw,
  mega: Megaphone,
  ig: Instagram,
  sms: Mail,
  target: Target,
  book: BookOpen,
  msg: MessageCircle,
};

const CH_ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  activity: Activity,
};

type Act = { ic: string; tx: string; done: boolean; pending: boolean };
type Cap = { who: "a" | "c"; tx: string };
type Msg = { dir: "in" | "out"; tx: string };
type Stage = "incoming" | "incall" | "msg" | "ended";

const TABS: { demo: number; label: string; Icon: LucideIcon }[] = [
  { demo: 3, label: "WhatsApp", Icon: MessageCircle },
  { demo: 4, label: "Instagram", Icon: Instagram },
  { demo: 5, label: "SMS", Icon: Mail },
  { demo: 0, label: "Salão", Icon: Phone },
  { demo: 1, label: "Urgência", Icon: Phone },
  { demo: 2, label: "22h47", Icon: Phone },
];

export default function LiveDemo() {
  const [idx, setIdx] = useState(3);
  const [stage, setStage] = useState<Stage>("incoming");
  const [caps, setCaps] = useState<Cap[]>([]);
  const [talking, setTalking] = useState<"a" | "c" | null>(null);
  const [acts, setActs] = useState<Act[]>([]);
  const [chat, setChat] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [foot, setFoot] = useState<React.ReactNode>("A aguardar conversa…");
  const [started, setStarted] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
  }, []);

  const S: Scenario = SCENARIOS[idx];

  // start when the section scrolls into view
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // timeline engine
  useEffect(() => {
    if (!started) return;
    clearAll();
    const s = SCENARIOS[idx];
    setStage(s.type === "call" ? "incoming" : "msg");
    setCaps([]);
    setActs([]);
    setChat([]);
    setTyping(false);
    setTalking(null);
    setSeconds(0);
    setFoot(
      s.type === "msg" ? (
        <>Canal: <b>{s.chBadge}</b> · mesma agenda, mesma IA</>
      ) : (
        "A aguardar conversa…"
      )
    );

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // static final state
      if (s.type === "call") {
        setStage("incall");
        setCaps(
          s.tl
            .filter((e) => e.ev === "say")
            .slice(-4)
            .map((e) => ({ who: e.who!, tx: e.tx! }))
        );
      } else {
        setChat(
          s.tl
            .filter((e) => e.ev === "min" || e.ev === "mout")
            .map((e) => ({ dir: (e.ev === "min" ? "in" : "out") as "in" | "out", tx: e.tx! }))
        );
      }
      setActs(
        s.tl
          .filter((e) => e.ev === "act")
          .map((e) => ({ ic: e.ic!, tx: e.tx!, done: true, pending: false }))
      );
      setFoot(<>Resultado: <b>marcação criada e confirmada</b></>);
      return;
    }

    s.tl.forEach((e) => {
      timers.current.push(
        setTimeout(() => {
          switch (e.ev) {
            case "ring":
              setStage("incoming");
              break;
            case "answer": {
              setStage("incall");
              const start = Date.now();
              tick.current = setInterval(
                () => setSeconds(Math.floor((Date.now() - start) / 1000)),
                500
              );
              setFoot(<>Estado: <b>em chamada</b> · latência de resposta ~600ms</>);
              break;
            }
            case "say":
              setTalking(e.who!);
              setCaps((c) => [...c, { who: e.who!, tx: e.tx! }].slice(-4));
              timers.current.push(
                setTimeout(() => setTalking(null), e.dur ?? 3000)
              );
              break;
            case "min":
              setTyping(false);
              setChat((c) => [...c, { dir: "in" as const, tx: e.tx! }].slice(-5));
              break;
            case "typing":
              setTyping(true);
              break;
            case "mout":
              setTyping(false);
              setChat((c) => [...c, { dir: "out" as const, tx: e.tx! }].slice(-5));
              break;
            case "act":
              setActs((a) => [
                ...a,
                { ic: e.ic!, tx: e.tx!, done: !!e.done, pending: !!e.pending },
              ]);
              break;
            case "actdone":
              setActs((a) => {
                const n = [...a];
                for (let i = n.length - 1; i >= 0; i--) {
                  if (n[i].pending) {
                    n[i] = { ...n[i], pending: false, done: true, tx: e.tx! };
                    break;
                  }
                }
                return n;
              });
              break;
            case "end":
              if (tick.current) clearInterval(tick.current);
              setStage("ended");
              setFoot(
                <>Resultado: <b>marcação criada e confirmada</b> · resumo entregue</>
              );
              timers.current.push(
                setTimeout(
                  () => setIdx((i) => (i + 1) % SCENARIOS.length),
                  4600
                )
              );
              break;
          }
        }, e.t)
      );
    });

    return clearAll;
  }, [idx, started, clearAll]);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const ChIcon = S.chIcon ? CH_ICONS[S.chIcon] ?? Sparkles : Sparkles;

  return (
    <div ref={rootRef}>
      <div className="rv">
        <div className="tabs" role="tablist" aria-label="Exemplos de conversas">
          {TABS.map((t, i) => (
            <span key={t.demo} style={{ display: "contents" }}>
              {i === 3 && <span className="tab-sep" aria-hidden />}
              <button
                role="tab"
                aria-selected={idx === t.demo}
                className={`tab${idx === t.demo ? " on" : ""}`}
                onClick={() => {
                  setStarted(true);
                  setIdx(t.demo);
                }}
              >
                <t.Icon size={14} /> {t.label}
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="sim-band rv">
        <div className="sim">
          {/* PHONE */}
          <div className="phone">
            <div className="notch" />
            <div className="statusbar">
              <span>{S.clock}</span>
              <span className="sig">
                <Signal size={12} /> 5G
              </span>
            </div>

            {/* incoming */}
            <div className={`stage incoming${stage === "incoming" ? " on" : ""}`}>
              <span className="lbl">{S.inLbl}</span>
              <div className="big-avatar">
                <PhoneIncoming size={34} />
              </div>
              <h4>+351 934 ··· ···</h4>
              <div className="num">Número desconhecido</div>
              <div className="ringing">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--mint)",
                    display: "inline-block",
                  }}
                />
                A TOCAR…
              </div>
              <div className="ctx">{S.inCtx}</div>
              <div className="answer-btn">
                <Phone size={24} />
              </div>
            </div>

            {/* in call */}
            <div className={`stage incall${stage === "incall" ? " on" : ""}`}>
              <div className="call-head">
                <h4>{S.biz}</h4>
                <div>
                  <span className="timer">
                    <i />
                    EM CHAMADA · {fmt(seconds)}
                  </span>
                </div>
              </div>
              <div className="speakers">
                <div className={`spk${talking === "c" ? " talking" : ""}`}>
                  <div className="av">
                    <User size={26} />
                  </div>
                  <div className="nm">Cliente</div>
                  <div className="vu">
                    <span /><span /><span /><span /><span />
                  </div>
                </div>
                <div className={`spk${talking === "a" ? " talking" : ""}`}>
                  <div className="av">
                    <Bot size={26} />
                  </div>
                  <div className="nm">Atenda · IA</div>
                  <div className="vu">
                    <span /><span /><span /><span /><span />
                  </div>
                </div>
              </div>
              <div className="captions">
                {caps.map((c, i) => (
                  <div
                    key={i}
                    className={`cap ${c.who}${i === caps.length - 1 ? " now" : ""}`}
                  >
                    <span className="cw">
                      {c.who === "a" ? "Atenda · IA" : "Cliente"}
                    </span>
                    {c.tx}
                  </div>
                ))}
              </div>
              <div className="end-bar">
                <div className="hang">
                  <PhoneOff size={20} />
                </div>
              </div>
            </div>

            {/* messaging */}
            <div
              className={`stage msgstage ${S.ch ?? ""}${stage === "msg" ? " on" : ""}`}
            >
              <div className="ch-head">
                <div className="cav">
                  <ChIcon size={20} />
                </div>
                <div>
                  <div className="cn">{S.chName}</div>
                  <div className="cs">{S.chSub}</div>
                </div>
                <span className="cbadge">{S.chBadge}</span>
              </div>
              <div className="chatbody">
                {chat.map((m, i) => (
                  <div key={i} className={`mb ${m.dir}`}>
                    <span className="mt">
                      {m.dir === "out" ? "Atenda · IA" : "Cliente"}
                    </span>
                    {m.tx}
                  </div>
                ))}
                <div className={`typing${typing ? " on" : ""}`}>
                  <i /><i /><i />
                </div>
              </div>
              <div className="chatinput">
                Mensagem… <Mic size={15} />
              </div>
            </div>

            {/* ended */}
            <div className={`stage ended${stage === "ended" ? " on" : ""}`}>
              <div className="ok">
                <Check size={34} />
              </div>
              <h4>{S.endTitle}</h4>
              <p>{S.endMsg}</p>
              <div className="dur">{S.endDur}</div>
            </div>
          </div>

          {/* AI CONSOLE */}
          <div className="console">
            <div className="console-head">
              <span>Atenda · bastidores da conversa</span>
              <span className="live">
                <i />
                ao vivo
              </span>
            </div>
            <div className="acts">
              {acts.map((a, i) => {
                const Icon = ACT_ICONS[a.ic] ?? Phone;
                return (
                  <div key={i} className={`act show${a.done ? " done" : ""}`}>
                    <div className="ic">
                      <Icon size={16} />
                    </div>
                    <div className="tx">
                      {a.pending && <span className="spin" />}
                      <span dangerouslySetInnerHTML={{ __html: a.tx }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="console-foot">{foot}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
