import { NextResponse } from "next/server";
import { getMongoClient, DB_NAME } from "@/lib/mongodb";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  business?: string;
  phone?: string;
  email?: string;
  booking_system?: string;
  about?: string;
  website?: string; // honeypot
  utm?: string;
};

const clip = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  // Honeypot: bots preenchem o campo escondido → fingimos sucesso.
  if (body.website) return NextResponse.json({ ok: true });

  const lead = {
    name: clip(body.name, 120),
    business: clip(body.business, 80),
    phone: clip(body.phone, 40),
    email: clip(body.email, 160),
    booking_system: clip(body.booking_system, 80),
    about: clip(body.about, 800),
    utm: clip(body.utm, 500),
    user_agent: clip(req.headers.get("user-agent"), 300),
    source: "landing",
    created_at: new Date(),
  };

  if (!lead.name || !lead.phone) {
    return NextResponse.json(
      { error: "name and phone are required" },
      { status: 400 }
    );
  }

  try {
    const client = await getMongoClient();
    await client.db(DB_NAME).collection("leads").insertOne(lead);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lead insert failed:", err);
    return NextResponse.json(
      { error: "storage unavailable" },
      { status: 503 }
    );
  }
}
