export type TimelineEvent = {
  t: number;
  ev:
    | "ring"
    | "answer"
    | "say"
    | "min"
    | "typing"
    | "mout"
    | "act"
    | "actdone"
    | "end";
  who?: "a" | "c";
  tx?: string;
  dur?: number;
  ic?: string; // icon key for console actions
  done?: boolean;
  pending?: boolean;
};

export type Scenario = {
  type: "call" | "msg";
  ch?: "wa" | "ig" | "sms";
  biz: string;
  clock: string;
  inLbl?: string;
  inCtx?: string;
  chName?: string;
  chBadge?: string;
  chSub?: string;
  chIcon?: string;
  endTitle: string;
  endMsg: string;
  endDur: string;
  tl: TimelineEvent[];
};

export const SCENARIOS: Scenario[] = [
  {
    type: "call",
    biz: "Salão Beleza Pura",
    clock: "14:12",
    inLbl: "Chamada para: Salão Beleza Pura",
    inCtx: "A dona está com uma cliente e não pode atender",
    endTitle: "Chamada terminada",
    endMsg: "Marcação garantida. A dona nem tirou as mãos da cliente.",
    endDur: "DURAÇÃO 0:52 · ATENDIDA EM 2S",
    tl: [
      { t: 0, ev: "ring" },
      { t: 2200, ev: "answer" },
      { t: 2300, ev: "act", ic: "phone", tx: "Chamada recebida · <b>atendida em 2s</b>", done: true },
      { t: 2600, ev: "say", who: "a", tx: "Salão Beleza Pura, boa tarde, fala a Atenda. Em que posso ajudar?", dur: 3400 },
      { t: 2700, ev: "act", ic: "mic", tx: "Voz sintetizada PT-PT · <b>conversa iniciada</b>", done: true },
      { t: 6200, ev: "say", who: "c", tx: "Boa tarde! Queria marcar corte e brushing para esta semana…", dur: 3200 },
      { t: 6600, ev: "act", ic: "brain", tx: "Intenção detetada: <b>nova marcação · corte + brushing</b>", done: true },
      { t: 9600, ev: "act", ic: "cal", tx: "A consultar a agenda…", pending: true },
      { t: 11000, ev: "actdone", tx: "Agenda consultada · <b>sexta 15:00 e sábado 10:30 livres</b>" },
      { t: 9700, ev: "say", who: "a", tx: "Com todo o gosto! Tenho sexta às 15h00 ou sábado às 10h30. Qual prefere?", dur: 3600 },
      { t: 13600, ev: "say", who: "c", tx: "Sexta às 15h dá-me jeito. É a Ana Ferreira.", dur: 2800 },
      { t: 16700, ev: "say", who: "a", tx: "Perfeito, Ana! Fica então corte e brushing, sexta às 15h00. Vai receber a confirmação por WhatsApp. Até sexta!", dur: 4200 },
      { t: 17000, ev: "act", ic: "calok", tx: "Marcação criada · <b>Ana F. · Sexta 15:00 · corte + brushing</b>", done: true },
      { t: 19200, ev: "act", ic: "send", tx: "Confirmação WhatsApp enviada à cliente · <b>entregue ✓</b>", done: true },
      { t: 21200, ev: "act", ic: "note", tx: "Resumo enviado à dona: <b>«Nova marcação, sexta 15h»</b>", done: true },
      { t: 22000, ev: "end" },
    ],
  },
  {
    type: "call",
    biz: "Clínica Sorriso",
    clock: "13:05",
    inLbl: "Chamada para: Clínica Sorriso",
    inCtx: "Hora de almoço — a receção está vazia",
    endTitle: "Chamada terminada",
    endMsg: "Urgência triada e encaixada. Nenhum paciente perdido no almoço.",
    endDur: "DURAÇÃO 0:47 · ATENDIDA EM 2S",
    tl: [
      { t: 0, ev: "ring" },
      { t: 2200, ev: "answer" },
      { t: 2300, ev: "act", ic: "phone", tx: "Chamada recebida · <b>atendida em 2s</b>", done: true },
      { t: 2600, ev: "say", who: "a", tx: "Clínica Sorriso, boa tarde, fala a Atenda. Em que posso ajudar?", dur: 3200 },
      { t: 6000, ev: "say", who: "c", tx: "Boa tarde… partiu-se-me uma coroa e estou com muitas dores. Conseguem ver-me hoje?", dur: 4000 },
      { t: 6400, ev: "act", ic: "brain", tx: "Intenção detetada: <b>URGÊNCIA · coroa partida + dor</b>", done: true },
      { t: 10200, ev: "act", ic: "cal", tx: "A procurar encaixe de urgência…", pending: true },
      { t: 11600, ev: "actdone", tx: "Encaixe encontrado · <b>hoje 16:30 · Dra. Sofia</b>" },
      { t: 10300, ev: "say", who: "a", tx: "Lamento! Isso é uma urgência. A Dra. Sofia tem um espaço hoje às 16h30 — posso reservar já?", dur: 4000 },
      { t: 14600, ev: "say", who: "c", tx: "Sim, por favor! É João Mendes.", dur: 2200 },
      { t: 17100, ev: "say", who: "a", tx: "Reservado, João: urgência hoje às 16h30. Enviei a morada por WhatsApp. As melhoras!", dur: 3800 },
      { t: 17400, ev: "act", ic: "calok", tx: "Urgência marcada · <b>João M. · hoje 16:30</b>", done: true },
      { t: 19300, ev: "act", ic: "send", tx: "WhatsApp com morada e instruções · <b>entregue ✓</b>", done: true },
      { t: 20800, ev: "act", ic: "bell", tx: "Alerta prioritário enviado à Dra. Sofia", done: true },
      { t: 21600, ev: "end" },
    ],
  },
  {
    type: "call",
    biz: "Barbearia Norte",
    clock: "22:47",
    inLbl: "Chamada para: Barbearia Norte",
    inCtx: "A barbearia fechou às 20:00 — sem a Atenda, ia para o voicemail",
    endTitle: "Chamada terminada",
    endMsg: "Cliente marcado às 22h47. O voicemail tinha-o perdido para sempre.",
    endDur: "DURAÇÃO 0:44 · ATENDIDA EM 2S",
    tl: [
      { t: 0, ev: "ring" },
      { t: 2200, ev: "answer" },
      { t: 2300, ev: "act", ic: "phone", tx: "Chamada fora de horas · <b>atendida em 2s</b>", done: true },
      { t: 2600, ev: "say", who: "a", tx: "Barbearia Norte, boa noite, fala a Atenda. Em que posso ajudar?", dur: 3200 },
      { t: 6000, ev: "say", who: "c", tx: "Boas! Sei que já fecharam… dá para marcar corte e barba para amanhã de manhã?", dur: 3800 },
      { t: 6400, ev: "act", ic: "brain", tx: "Intenção: <b>marcação · corte + barba · amanhã AM</b>", done: true },
      { t: 10000, ev: "act", ic: "cal", tx: "A ver a agenda de amanhã…", pending: true },
      { t: 11300, ev: "actdone", tx: "Livre: <b>9:30 (Miguel) e 11:00 (Rui)</b>" },
      { t: 10100, ev: "say", who: "a", tx: "Dá perfeitamente! Amanhã tenho 9h30 com o Miguel ou 11h00 com o Rui.", dur: 3600 },
      { t: 14000, ev: "say", who: "c", tx: "9h30 com o Miguel. Sou o Pedro.", dur: 2200 },
      { t: 16500, ev: "say", who: "a", tx: "Feito, Pedro — corte e barba, 9h30 com o Miguel. Confirmação a caminho. Boa noite!", dur: 3800 },
      { t: 16800, ev: "act", ic: "calok", tx: "Marcação criada · <b>Pedro · 9:30 · Miguel</b>", done: true },
      { t: 18700, ev: "act", ic: "send", tx: "Confirmação WhatsApp · <b>entregue ✓</b>", done: true },
      { t: 20200, ev: "act", ic: "moon", tx: "Registada às <b>22:47</b> — fora do horário de abertura", done: true },
      { t: 21000, ev: "end" },
    ],
  },
  {
    type: "msg",
    ch: "wa",
    biz: "Nail Studio Glam",
    clock: "19:38",
    chName: "Nail Studio Glam",
    chIcon: "sparkles",
    chBadge: "WhatsApp",
    chSub: "online · respondido pela Atenda",
    endTitle: "Conversa resolvida",
    endMsg: "Da mensagem à marcação em 40 segundos — sem tocar no telemóvel.",
    endDur: "WHATSAPP · RESPONDIDO EM 3S",
    tl: [
      { t: 600, ev: "min", tx: "Olá! Tens vaga para gel no sábado de manhã?" },
      { t: 900, ev: "act", ic: "msg", tx: "Mensagem WhatsApp recebida · <b>respondida em 3s</b>", done: true },
      { t: 1400, ev: "act", ic: "brain", tx: "Intenção: <b>marcação · unhas de gel · sábado AM</b>", done: true },
      { t: 1800, ev: "typing" },
      { t: 2600, ev: "act", ic: "cal", tx: "A consultar a agenda de sábado…", pending: true },
      { t: 3800, ev: "actdone", tx: "Livre: <b>sábado 10:00 e 11:00</b>" },
      { t: 4000, ev: "mout", tx: "Olá! Tenho sim: sábado às 10h00 ou às 11h00. Qual preferes?" },
      { t: 6800, ev: "min", tx: "11h é perfeito! Sou a Carla" },
      { t: 7600, ev: "typing" },
      { t: 9200, ev: "mout", tx: "Marcado, Carla! Unhas de gel, sábado às 11h00. Envio lembrete na sexta. Até lá!" },
      { t: 9400, ev: "act", ic: "calok", tx: "Marcação criada · <b>Carla · Sáb 11:00 · gel</b>", done: true },
      { t: 11200, ev: "act", ic: "clock", tx: "Lembrete automático agendado para <b>sexta 18:00</b>", done: true },
      { t: 13000, ev: "act", ic: "note", tx: "Resumo enviado à dona · <b>agenda de sábado cheia</b>", done: true },
      { t: 14200, ev: "end" },
    ],
  },
  {
    type: "msg",
    ch: "ig",
    biz: "Clínica Éclat",
    clock: "21:15",
    chName: "clinica.eclat",
    chIcon: "sparkles",
    chBadge: "Instagram",
    chSub: "DM · respondido pela Atenda",
    endTitle: "Lead convertida",
    endMsg: "Veio de um anúncio, recebeu preço e ficou marcada — sem esperar pela manhã.",
    endDur: "INSTAGRAM DM · RESPONDIDO EM 3S",
    tl: [
      { t: 600, ev: "min", tx: "Olá! Vi o vosso reels. Quanto custa a limpeza de pele profunda?" },
      { t: 900, ev: "act", ic: "ig", tx: "DM Instagram recebida · <b>origem: anúncio reels</b>", done: true },
      { t: 1500, ev: "act", ic: "brain", tx: "Intenção: <b>pergunta de preço · limpeza de pele</b>", done: true },
      { t: 2000, ev: "typing" },
      { t: 2600, ev: "act", ic: "book", tx: "Resposta obtida da <b>tabela de serviços da clínica</b>", done: true },
      { t: 3600, ev: "mout", tx: "Olá! A limpeza de pele profunda custa 45€ e demora cerca de 1h. Esta semana temos quinta às 14h ou sexta às 10h — queres reservar?" },
      { t: 7000, ev: "min", tx: "Sexta às 10h! Sou a Inês Costa" },
      { t: 7800, ev: "typing" },
      { t: 9400, ev: "mout", tx: "Reservado, Inês! Limpeza de pele, sexta às 10h00. Enviei os detalhes por DM. Até sexta!" },
      { t: 9600, ev: "act", ic: "calok", tx: "Marcação criada · <b>Inês C. · Sex 10:00 · 45€</b>", done: true },
      { t: 11400, ev: "act", ic: "target", tx: "Lead do anúncio <b>convertida em cliente</b> · ROI registado", done: true },
      { t: 13200, ev: "end" },
    ],
  },
  {
    type: "msg",
    ch: "sms",
    biz: "Fisio Ativa",
    clock: "08:02",
    chName: "Fisio Ativa",
    chIcon: "activity",
    chBadge: "SMS",
    chSub: "também disponível no Viber",
    endTitle: "Remarcação resolvida",
    endMsg: "Sem chamadas perdidas, sem buracos na agenda — o horário foi logo reaproveitado.",
    endDur: "SMS · TAMBÉM FUNCIONA NO VIBER",
    tl: [
      { t: 600, ev: "min", tx: "Bom dia, não consigo ir à sessão de hoje às 15h. Dá para remarcar? — Rui" },
      { t: 900, ev: "act", ic: "sms", tx: "SMS recebido · <b>resposta a lembrete automático</b>", done: true },
      { t: 1500, ev: "act", ic: "brain", tx: "Intenção: <b>remarcação · sessão de hoje 15:00</b>", done: true },
      { t: 2000, ev: "typing" },
      { t: 2600, ev: "act", ic: "cal", tx: "A libertar 15:00 e procurar alternativas…", pending: true },
      { t: 3900, ev: "actdone", tx: "Alternativas: <b>amanhã 11:00 ou quinta 16:30</b>" },
      { t: 4100, ev: "mout", tx: "Bom dia, Rui! Sem problema. Tenho amanhã às 11h00 ou quinta às 16h30. Qual prefere?" },
      { t: 7200, ev: "min", tx: "Quinta às 16h30, obrigado!" },
      { t: 8000, ev: "typing" },
      { t: 9400, ev: "mout", tx: "Remarcado: quinta às 16h30 com o Dr. Paulo. Boa recuperação!" },
      { t: 9600, ev: "act", ic: "refresh", tx: "Sessão remarcada · <b>quinta 16:30</b> · agenda atualizada", done: true },
      { t: 11400, ev: "act", ic: "mega", tx: "Horário das 15:00 <b>oferecido à lista de espera</b>", done: true },
      { t: 13200, ev: "act", ic: "note", tx: "Resumo enviado ao Dr. Paulo", done: true },
      { t: 14400, ev: "end" },
    ],
  },
];
