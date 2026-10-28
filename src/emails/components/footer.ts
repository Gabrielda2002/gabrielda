import { emailTokens } from "../tokens";

export function renderEmailFooter(date: Date = new Date()): string {
  const currentYear = date.getFullYear();

  return `
    <table role="presentation" width="100%" style="background-color: ${emailTokens.colors.panel2}; border-top: ${emailTokens.borders.dashed}; padding: 12px 16px; font-family: ${emailTokens.fonts.mono}; font-size: 10px; color: ${emailTokens.colors.muted}; letter-spacing: 0.1em; text-transform: uppercase;" cellpadding="0" cellspacing="0">
      <tr>
        <td align="left">
          Transmisión vía Portafolio Web
        </td>
        <td align="right" style="color: ${emailTokens.colors.ink}; font-weight: bold;">
          Gabriel Duarte · ${currentYear}
        </td>
      </tr>
    </table>
  `.trim();
}

