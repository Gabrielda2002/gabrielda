import { emailTokens } from "../tokens";

interface DialogBoxProps {
  speakerName: string;
  formattedMessage: string;
}

export function renderDialogBox({ speakerName, formattedMessage }: DialogBoxProps): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
      <tr>
        <td align="left">
          <span style="display: inline-block; background-color: ${emailTokens.colors.blue}; color: ${emailTokens.colors.selInk}; border: ${emailTokens.borders.line}; border-bottom: none; padding: 5px 14px; font-family: ${emailTokens.fonts.mono}; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;">
            ${speakerName}
          </span>
        </td>
      </tr>
      <tr>
        <td style="background-color: ${emailTokens.colors.panel}; border: ${emailTokens.borders.line}; padding: 20px; font-family: ${emailTokens.fonts.mono}; font-size: 14px; line-height: 1.65; color: ${emailTokens.colors.ink}; box-shadow: 4px 4px 0 0 ${emailTokens.colors.off};">
          <div style="min-height: 80px; white-space: normal;">
            ${formattedMessage}
          </div>
          <!-- DS dialogue caret indicator -->
          <div align="right" style="font-size: 13px; color: ${emailTokens.colors.ink}; font-weight: bold; margin-top: 10px;">
            ▼
          </div>
        </td>
      </tr>
    </table>
  `.trim();
}

