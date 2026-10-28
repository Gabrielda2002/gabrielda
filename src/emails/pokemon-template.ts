import { emailTokens } from "./tokens";
import { renderEmailHeader } from "./components/header";
import { renderSenderCard } from "./components/sender-card";
import { renderDialogBox } from "./components/dialog-box";
import { renderEmailFooter } from "./components/footer";

export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
  sentAt?: Date;
}

export function renderPokemonContactEmail({
  name,
  email,
  message,
  sentAt = new Date(),
}: ContactEmailPayload): { html: string; text: string } {
  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const formattedMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const formattedDate = sentAt.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const text = `
[★] NUEVO MENSAJE DE CONTACTO - PORTAFOLIO GABRIEL DUARTE
----------------------------------------------------------
Remitente: ${name}
Correo: ${email}
Fecha: ${formattedDate}

MENSAJE:
"${message}"
----------------------------------------------------------
Gabriel Duarte · ${sentAt.getFullYear()}
Responder directamente a este correo para contactar con ${name}.
  `.trim();


  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo mensaje de ${safeName}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: ${emailTokens.colors.bg}; font-family: ${emailTokens.fonts.mono}; color: ${emailTokens.colors.ink};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <!-- Main Game Frame -->
        <table role="presentation" width="100%" style="max-width: 580px; background-color: ${emailTokens.colors.panel}; border: ${emailTokens.borders.frame}; box-shadow: 6px 6px 0 0 ${emailTokens.colors.line};" cellpadding="0" cellspacing="0">
          ${renderEmailHeader()}
          <tr>
            <td style="padding: 20px;">
              ${renderSenderCard({ name: safeName, email: safeEmail, dateStr: formattedDate })}
              ${renderDialogBox({ speakerName: safeName, formattedMessage })}
              ${renderEmailFooter(sentAt)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return { html, text };
}

