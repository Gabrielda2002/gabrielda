import { emailTokens } from "../tokens";

export function renderEmailHeader(): string {
  return `
    <tr>
      <td style="background-color: ${emailTokens.colors.ink}; padding: 12px 18px; border-bottom: ${emailTokens.borders.line}; font-family: ${emailTokens.fonts.mono};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="left" style="color: ${emailTokens.colors.amber}; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;">
              ★ POKÉ-MAIL // TRANSMISIÓN ENTRANTE
            </td>
            <td align="right" style="color: ${emailTokens.colors.panel}; font-size: 10px; font-weight: 700; letter-spacing: 0.12em;">
              ENLACE · 04
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `.trim();
}

