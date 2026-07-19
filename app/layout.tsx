import type { Metadata } from "next";
import "@fontsource-variable/inter";
import Script from "next/script";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://atenda.pt";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title:
    "Atendimento Automático 24/7 no WhatsApp, Instagram e Telefone | Marcações Automáticas — Atenda",
  description:
    "Responda mensagens automaticamente no WhatsApp e Instagram, atenda chamadas com voz de IA e faça marcações automáticas na sua agenda — 24/7, em português e até 30 idiomas. Nenhum cliente fica sem resposta. Desde €89/mês.",
  keywords: [
    "atendimento automático",
    "responder mensagens automaticamente",
    "chatbot whatsapp portugal",
    "marcações automáticas",
    "automatizar whatsapp",
    "responder dms instagram",
    "atender chamadas automaticamente",
    "assistente virtual para clínicas",
    "chatbot para salões",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "/",
    siteName: "Atenda",
    title: "Nenhuma mensagem sem resposta. Nenhuma chamada perdida. — Atenda",
    description:
      "A funcionária de IA que responde no Instagram, WhatsApp, SMS e ao telefone, e marca diretamente na sua agenda. 24/7, em português.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Atenda",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Atendimento automático omnicanal com IA para pequenos negócios em Portugal: responde no WhatsApp, Instagram, SMS e chamadas telefónicas, e faz marcações automáticas na agenda.",
  offers: {
    "@type": "Offer",
    price: "89",
    priceCurrency: "EUR",
    priceValidUntil: "2026-12-31",
  },
  inLanguage: "pt-PT",
  areaServed: "PT",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Como responder mensagens automaticamente no WhatsApp do meu negócio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Com a Atenda, liga o WhatsApp Business do seu negócio em minutos e a IA passa a responder automaticamente 24/7 em português: responde a perguntas sobre preços e horários, faz marcações na agenda e envia lembretes.",
      },
    },
    {
      "@type": "Question",
      name: "É possível responder automaticamente às DMs do Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. A Atenda liga-se à conta de Instagram do negócio e responde às DMs em segundos — incluindo mensagens vindas de anúncios — e converte-as em marcações.",
      },
    },
    {
      "@type": "Question",
      name: "A Atenda faz marcações automáticas na minha agenda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. A Atenda integra-se com a sua agenda e sistema de marcações, vê os horários livres em tempo real e marca, remarca ou cancela sem intervenção humana.",
      },
    },
    {
      "@type": "Question",
      name: "Como funciona o atendimento automático de chamadas telefónicas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ativa o desvio de chamadas do seu número atual e a Atenda atende em 2 segundos com voz natural em português de Portugal, responde a perguntas e fecha a marcação durante a chamada.",
      },
    },
    {
      "@type": "Question",
      name: "Em que idiomas é que a Atenda atende?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Em português de Portugal por defeito e em até 30 idiomas — incluindo inglês, francês, espanhol e alemão — com deteção automática do idioma do cliente. Ideal para negócios em zonas turísticas.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto custa o atendimento automático da Atenda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Um único plano desde €89/mês com todos os canais incluídos: chamadas, WhatsApp, Instagram, SMS e Viber. Sem instalação e sem fidelização.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        {/* Marca html.js antes do primeiro paint para evitar "flash" de conteúdo
            invisível: o hero e restantes .rv só ficam ocultos se houver JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        {pixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');fbq('track','PageView');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
