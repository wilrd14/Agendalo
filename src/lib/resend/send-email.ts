import { Resend } from "resend";

// Remitente configurable: el dominio debe estar verificado en Resend.
const DEFAULT_FROM = "Agendalo <notifications@wilrd14.dev>";

function createResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Falta la variable de entorno RESEND_API_KEY");
  }
  return new Resend(apiKey);
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const resend = createResend();
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || DEFAULT_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Error enviando email:", error);
      return { ok: false as const, error };
    }

    return { ok: true as const, data };
  } catch (err) {
    console.error("Error de Resend:", err);
    return {
      ok: false as const,
      error: err instanceof Error ? err.message : "Error desconocido",
    };
  }
}