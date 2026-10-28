import { emailTokens } from "../tokens";

interface SenderCardProps {
  name: string;
  email: string;
  dateStr: string;
}

export function renderSenderCard({ name, email, dateStr }: SenderCardProps): string {
  return `
    <table role="presentation" width="100%" style="background-color: ${emailTokens.colors.panel2}; border: ${emailTokens.borders.line}; margin-bottom: 20px;" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background-color: ${emailTokens.colors.blue}; padding: 6px 12px; border-bottom: ${emailTokens.borders.line}; color: ${emailTokens.colors.selInk}; font-family: ${emailTokens.fonts.mono}; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;">
          DATOS DEL REMITENTE
        </td>
      </tr>
      <tr>
        <td style="padding: 16px; font-family: ${emailTokens.fonts.mono}; font-size: 13px; line-height: 1.6; color: ${emailTokens.colors.ink};">
          <p style="margin: 0 0 8px 0;">
            <strong style="color: ${emailTokens.colors.muted};">REMITENTE:</strong> 
            <span style="background-color: ${emailTokens.colors.sun}; padding: 1px 6px; font-weight: bold; color: ${emailTokens.colors.ink};">${name}</span>
          </p>
          <p style="margin: 0 0 8px 0;">
            <strong style="color: ${emailTokens.colors.muted};">CORREO:</strong> 
            <a href="mailto:${email}" style="color: ${emailTokens.colors.blue}; text-decoration: none; font-weight: bold;">${email}</a>
          </p>
          <p style="margin: 0 0 14px 0; color: ${emailTokens.colors.muted}; font-size: 11px;">
            <strong>RECIBIDO:</strong> ${dateStr}
          </p>

          <!-- Direct Reply Action Button -->
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="background-color: ${emailTokens.colors.blue}; border: ${emailTokens.borders.line}; box-shadow: 3px 3px 0 0 ${emailTokens.colors.line};">
                <a href="mailto:${email}" style="display: inline-block; padding: 10px 18px; color: ${emailTokens.colors.selInk}; font-family: ${emailTokens.fonts.mono}; font-size: 11px; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 0.12em;">
                  ✉ RESPONDER AL MENSAJE
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `.trim();
}

