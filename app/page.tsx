import {
  Instagram,
  MessageCircle,
  Phone,
  Mail,
  Smartphone,
  Globe,
  PhoneIncoming,
  Sparkles,
  Scissors,
  Activity,
  Stethoscope,
  Link2,
  CalendarClock,
  Magnet,
  TrendingDown,
  TrendingUp,
  Check,
  Star,
  MapPin,
  Users,
  Gift,
  ArrowRight,
  Play,
} from "lucide-react";
import LiveDemo from "@/components/LiveDemo";
import LeadForm from "@/components/LeadForm";
import { Rail, Reveal } from "@/components/Effects";

const Stars = () => (
  <div className="stars" aria-label="5 estrelas">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} fill="currentColor" />
    ))}
  </div>
);

const LogoMark = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="15" fill="var(--iris)" />
    <rect
      x="10" y="11" width="33" height="24" rx="9.5"
      fill="none" stroke="#fff" strokeWidth="5"
      strokeLinecap="round" strokeLinejoin="round"
    />
    <rect
      x="23" y="29" width="31" height="21" rx="9.5"
      fill="#fff" stroke="var(--iris)" strokeWidth="3.5"
    />
    <circle cx="33" cy="39.5" r="2.2" fill="var(--iris)" />
    <circle cx="39" cy="39.5" r="2.2" fill="var(--iris)" />
    <circle cx="45" cy="39.5" r="2.2" fill="var(--iris)" />
  </svg>
);

export default function Page() {
  return (
    <>
      <nav className="bar">
        <a className="logo" href="#s1">
          <LogoMark />
          Atenda
        </a>
        <a className="pill pill-nav" href="#s6">
          Acesso antecipado
        </a>
      </nav>

      <Rail />
      <Reveal />

      <main className="deck" id="deck">
        {/* ============ S1 · HERO ============ */}
        <section className="slide" id="s1">
          <div className="inner">
            <div className="center rv">
              <span className="eyebrow">
                <b>NOVO</b> A funcionária de IA para negócios em Portugal
                <ArrowRight size={13} />
              </span>
            </div>
            <h1 className="rv">
              Nenhuma mensagem sem resposta.
              <br />
              Nenhum cliente <span className="hl">perdido.</span>
            </h1>
            <p className="lead rv">
              A Atenda responde no Instagram e WhatsApp em segundos, atende o
              telefone com voz natural e marca diretamente na sua agenda — em
              português e em até 30 idiomas. 24/7, enquanto você trabalha.
            </p>
            <div className="channels rv">
              <span className="ch-chip ig"><Instagram size={14} /> Instagram</span>
              <span className="ch-chip wa"><MessageCircle size={14} /> WhatsApp</span>
              <span className="ch-chip call"><Phone size={14} /> Chamadas</span>
              <span className="ch-chip sms"><Mail size={14} /> SMS</span>
              <span className="ch-chip vb"><Smartphone size={14} /> Viber</span>
              <span className="ch-chip lang"><Globe size={14} /> Até 30 idiomas</span>
            </div>
            <div className="hero-ctas rv">
              <a className="pill pill-cta pill-lg" href="#s2">
                <Play size={16} /> Ver ao vivo
              </a>
              <a className="pill pill-ghost pill-lg" href="#s6">
                Pedir demonstração
              </a>
            </div>
            <p className="hero-meta rv">
              <b>5 min</b> de configuração · mantém o seu número · sem
              fidelização
            </p>
            <p className="hero-meta rv" style={{ marginTop: 8 }}>
              Em piloto com os primeiros salões e clínicas do <b>Porto</b> ·
              programa de fundadores limitado a <b>20 negócios</b>
            </p>

            <div className="band rv">
              <div className="fan">
                <div className="mini">
                  <div className="from">WhatsApp · Nail Studio Glam</div>
                  <div className="avatar"><Sparkles size={22} /></div>
                  <h4>«Tens vaga sábado?»</h4>
                  <span className="state">
                    <Check size={12} /> Respondido · marcada 11h00
                  </span>
                </div>
                <div className="mini center-card">
                  <div className="from">Chamada · Salão Beleza Pura · agora</div>
                  <div className="avatar ring"><PhoneIncoming size={22} /></div>
                  <h4>+351 934 ··· ···</h4>
                  <span className="state">Atenda a atender… 2s</span>
                </div>
                <div className="mini">
                  <div className="from">Instagram · Clínica Éclat</div>
                  <div className="avatar"><Instagram size={22} /></div>
                  <h4>DM vindo de um anúncio</h4>
                  <span className="state ig">
                    <Check size={12} /> Preço enviado · lead marcada
                  </span>
                </div>
              </div>
              <div className="band-foot">
                <Instagram size={14} /> DM no Instagram → <MessageCircle size={14} />{" "}
                mensagem no WhatsApp → <Phone size={14} /> chamada no dia
                seguinte: a Atenda <b>sabe que é a mesma cliente</b> — uma
                conversa, uma agenda, zero leads perdidos.
              </div>
            </div>
          </div>
        </section>

        {/* ============ S2 · AO VIVO ============ */}
        <section className="slide band-linen" id="s2">
          <div className="inner">
            <div className="center rv">
              <span className="eyebrow">
                <b>AO VIVO</b> do toque — ou da mensagem — à marcação
              </span>
            </div>
            <h2 className="rv">
              Veja a Atenda a conduzir
              <br />
              cada conversa até à <span className="hl">marcação.</span>
            </h2>
            <LiveDemo />
          </div>
        </section>

        {/* ============ S3 · COMO FUNCIONA ============ */}
        <section className="slide" id="s3">
          <div className="inner">
            <div className="center rv">
              <span className="eyebrow"><b>SETUP</b> pronto em 5 minutos</span>
            </div>
            <h2 className="rv">
              Como funciona o atendimento automático.
              <br />
              <span className="hl-lav">Sem mudar de número.</span>
            </h2>
            <div className="how-row">
              <div className="how rv">
                <span className="n">PASSO 01</span>
                <div className="tile"><Link2 size={20} /></div>
                <h3>Ligue os seus canais</h3>
                <p>
                  Instagram e WhatsApp Business em minutos, SMS e Viber, e
                  desvio de chamadas para a voz. Tudo reversível.
                </p>
              </div>
              <div className="how rv" style={{ transitionDelay: ".1s" }}>
                <span className="n">PASSO 02</span>
                <div className="tile"><CalendarClock size={20} /></div>
                <h3>Ligue a sua agenda</h3>
                <p>
                  A Atenda integra-se com a sua agenda ou CRM e vê os horários
                  livres em tempo real — por isso marca, remarca e cancela
                  sozinha, sem passar por ninguém.
                </p>
              </div>
              <div className="how rv" style={{ transitionDelay: ".2s" }}>
                <span className="n">PASSO 03</span>
                <div className="tile"><Magnet size={20} /></div>
                <h3>Nenhum lead se perde</h3>
                <p>
                  Resposta em segundos em qualquer canal, lembretes que reduzem
                  faltas, cancelamentos oferecidos à lista de espera — e um
                  resumo diário para si.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ S4 · NÚMEROS ============ */}
        <section className="slide band-linen" id="s4">
          <div className="inner">
            <div className="center rv">
              <span className="eyebrow"><b>DADOS</b> porque importa</span>
            </div>
            <h2 className="rv">
              Cada conversa perdida
              <br />
              tem um <span className="hl">preço.</span>
            </h2>
            <div className="nums">
              <div className="num-card rv">
                <div className="v">78%</div>
                <span className="chip bad">
                  <TrendingDown size={12} /> clientes perdidos
                </span>
                <p>
                  dos clientes que caem no voicemail desligam sem deixar
                  mensagem
                </p>
              </div>
              <div className="num-card rv" style={{ transitionDelay: ".1s" }}>
                <div className="v">40%</div>
                <span className="chip bad">
                  <TrendingDown size={12} /> leads a arrefecer
                </span>
                <p>
                  das mensagens no Instagram e WhatsApp chegam fora do horário —
                  e quem responde primeiro, ganha
                </p>
              </div>
              <div className="num-card rv" style={{ transitionDelay: ".2s" }}>
                <div className="v">2s</div>
                <span className="chip good">
                  <TrendingUp size={12} /> com a Atenda
                </span>
                <p>
                  é quanto demora a responder — em qualquer canal. Também ao
                  domingo às 23h.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SREV · PILOTO ============
            ⚠️ Os testemunhos abaixo são PLACEHOLDERS — substituir por
            citações reais do piloto antes de publicar (lei UE + Meta). */}
        <section className="slide" id="srev">
          <div className="inner">
            <div className="center rv">
              <span className="eyebrow">
                <b>PILOTO</b> os primeiros negócios já estão a testar
              </span>
            </div>
            <h2 className="rv">
              Em piloto com salões e clínicas
              <br />
              do <span className="hl">Porto.</span>
            </h2>
            <p className="lead rv">
              Estamos a abrir a Atenda a um grupo restrito de 20 negócios. Quem
              entra agora define o produto — e fica com o preço de fundador para
              sempre.
            </p>

            <div className="proof-strip rv">
              <span className="proof">
                <span className="pic"><Phone size={16} /></span>
                <span><b>Chamadas e mensagens</b> atendidas todos os dias no piloto</span>
              </span>
              <span className="proof">
                <span className="pic"><Users size={16} /></span>
                <span><b>Programa de fundadores</b> · 20 vagas, preço bloqueado</span>
              </span>
              <span className="proof">
                <span className="pic"><MapPin size={16} /></span>
                <span><b>Feito no Porto</b> · suporte em português, na hora</span>
              </span>
            </div>

            <div className="quotes">
              <div className="quote rv">
                <Stars />
                <p>
                  «No primeiro fim de semana a Atenda apanhou três marcações que
                  iam direitinhas para o voicemail. Uma delas às onze da noite
                  de sábado.»
                </p>
                <div className="who">
                  <div className="qav"><Scissors size={18} /></div>
                  <div>
                    <div className="qn">Sandra Oliveira</div>
                    <div className="qr">Dona de salão · Porto</div>
                  </div>
                  <span className="qtag call"><Phone size={11} /> Chamadas</span>
                </div>
              </div>
              <div className="quote rv" style={{ transitionDelay: ".1s" }}>
                <Stars />
                <p>
                  «O Instagram enchia-se de DMs a perguntar preços e eu só
                  respondia à noite. Agora respondem-se sozinhas — e saem
                  marcações de lá.»
                </p>
                <div className="who">
                  <div className="qav"><Sparkles size={18} /></div>
                  <div>
                    <div className="qn">Mariana Costa</div>
                    <div className="qr">Clínica de estética · V. N. de Gaia</div>
                  </div>
                  <span className="qtag ig"><Instagram size={11} /> Instagram</span>
                </div>
              </div>
              <div className="quote rv" style={{ transitionDelay: ".2s" }}>
                <Stars />
                <p>
                  «O que mais me surpreendeu foi as remarcações: o cliente
                  desmarca por SMS e o horário é logo oferecido a outro. Deixei
                  de ter buracos na agenda.»
                </p>
                <div className="who">
                  <div className="qav"><Activity size={18} /></div>
                  <div>
                    <div className="qn">Ricardo Pinto</div>
                    <div className="qr">Fisioterapeuta · Matosinhos</div>
                  </div>
                  <span className="qtag wa"><MessageCircle size={11} /> WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ S5 · PREÇO ============ */}
        <section className="slide band-linen" id="s5">
          <div className="inner">
            <div className="center rv">
              <span className="eyebrow"><b>PREÇO</b> simples e previsível</span>
            </div>
            <h2 className="rv">
              Contrate a melhor funcionária
              <br />
              que o seu negócio já teve. <span className="hl">€89/mês.</span>
            </h2>
            <div className="price-card rv">
              <div className="from">Um plano · todos os canais</div>
              <div className="val">€89<span>/mês</span></div>
              <div className="per">
                responde 24/7 · não adoece · não se atrasa · sem fidelização
              </div>
              <ul className="price-list">
                <li><Check size={16} /> Instagram, WhatsApp, SMS, Viber e chamadas de voz — tudo incluído</li>
                <li><Check size={16} /> Português de Portugal + até 30 idiomas (inglês, francês, espanhol, alemão…)</li>
                <li><Check size={16} /> Integração com a sua agenda e CRM: vê os slots livres e marca sozinha</li>
                <li><Check size={16} /> Reconhece a mesma cliente em todos os canais — zero leads perdidos</li>
                <li><Check size={16} /> Lembretes automáticos + cancelamentos oferecidos à lista de espera</li>
                <li><Check size={16} /> Resumo de cada conversa + transferência de urgências para si</li>
                <li><Check size={16} /> RGPD: aviso na chamada, dados na UE</li>
              </ul>
              <span className="promo">
                <Gift size={14} /> Primeiros 20 negócios → 50% no 1.º mês
              </span>
            </div>
          </div>
        </section>

        {/* ============ SFAQ ============ */}
        <section className="slide" id="sfaq">
          <div className="inner">
            <div className="center rv">
              <span className="eyebrow"><b>FAQ</b> perguntas frequentes</span>
            </div>
            <h2 className="rv">
              Tudo o que nos <span className="hl-lav">perguntam.</span>
            </h2>
            <div className="faq rv">
              <details>
                <summary>Como responder mensagens automaticamente no WhatsApp do meu negócio?</summary>
                <p>
                  Liga o seu WhatsApp Business à Atenda em minutos. A partir
                  daí, a IA responde automaticamente 24/7 em português: preços,
                  horários, moradas — e converte a conversa numa marcação na sua
                  agenda, com lembrete automático antes da hora.
                </p>
              </details>
              <details>
                <summary>É possível responder automaticamente às DMs do Instagram?</summary>
                <p>
                  Sim. A Atenda liga-se à conta de Instagram do negócio e
                  responde às DMs em segundos — incluindo as que chegam dos
                  anúncios e reels, à noite e ao fim de semana — transformando
                  seguidores em marcações.
                </p>
              </details>
              <details>
                <summary>A Atenda faz marcações automáticas na minha agenda?</summary>
                <p>
                  Sim, e é isso que a distingue de um chatbot: integra-se com a
                  sua agenda e CRM, vê os horários livres em tempo real e marca,
                  remarca ou cancela sozinha — sem passar por si nem pela
                  receção.
                </p>
              </details>
              <details>
                <summary>Como funciona o atendimento automático de chamadas?</summary>
                <p>
                  Ativa o desvio de chamadas do seu número atual (demora um
                  minuto e é reversível). A Atenda atende em 2 segundos com voz
                  natural em português de Portugal, responde às perguntas e
                  fecha a marcação diretamente na sua agenda durante a
                  chamada — como faria uma funcionária na receção. Urgências
                  são transferidas para o seu telemóvel.
                </p>
              </details>
              <details>
                <summary>E se um cliente escrever no Instagram e depois ligar?</summary>
                <p>
                  A Atenda reconhece que é a mesma pessoa. A conversa continua
                  de onde ficou, em qualquer canal — sem repetir perguntas, sem
                  marcações em duplicado, sem leads perdidos entre caixas de
                  entrada.
                </p>
              </details>
              <details>
                <summary>Em que idiomas é que a Atenda atende?</summary>
                <p>
                  Em português de Portugal por defeito — e em até 30 idiomas,
                  incluindo inglês, francês, espanhol, alemão e ucraniano. A
                  Atenda deteta o idioma do cliente automaticamente e muda a
                  meio da conversa se for preciso. Ideal para zonas turísticas e
                  clientes estrangeiros.
                </p>
              </details>
              <details>
                <summary>Quanto custa?</summary>
                <p>
                  Um único plano desde €89/mês com todos os canais incluídos —
                  chamadas, WhatsApp, Instagram, SMS e Viber. Sem custos de
                  instalação, sem fidelização. Os primeiros 20 negócios têm 50%
                  de desconto no primeiro mês.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* ============ S6 · REGISTO ============ */}
        <section className="slide band-linen" id="s6">
          <div className="inner">
            <div className="center rv">
              <span className="eyebrow">
                <b>VAGAS</b> acesso antecipado · 20 lugares
              </span>
            </div>
            <div className="form-grid">
              <div className="form-left rv">
                <h2>
                  A partir de hoje, nenhum cliente
                  <br />
                  fica <span className="hl">sem resposta.</span>
                </h2>
                <p className="lead">
                  Deixe o contacto e em 24h mostramos a Atenda a trabalhar no
                  seu negócio — a responder no Instagram e WhatsApp e a atender
                  uma chamada ao vivo, com os seus serviços e preços.
                </p>
                <ul className="checks">
                  <li><Check size={16} /> Demonstração ao vivo em todos os canais, sem slides</li>
                  <li><Check size={16} /> Integração com a sua agenda ou sistema de marcações</li>
                  <li><Check size={16} /> 50% de desconto no primeiro mês</li>
                  <li><Check size={16} /> Configuração feita por nós · sem compromisso</li>
                </ul>
              </div>
              <div className="rv" style={{ transitionDelay: ".1s" }}>
                <LeadForm />
              </div>
            </div>
            <footer>© 2026 Atenda · Porto, Portugal · ola@atenda.pt</footer>
          </div>
        </section>
      </main>
    </>
  );
}
