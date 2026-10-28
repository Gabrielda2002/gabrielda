import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

export const server = {
  sendContact: defineAction({
    accept: "json",
    input: z.object({
      name: z.string().trim().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
      email: z.string().trim().pipe(z.email({ message: "Ingresa un correo electrónico válido." })),
      message: z.string().trim().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
    }),
    
    handler: async ({ name, email, message }) => {
      const apiKey = import.meta.env.PUBLIC_API_KEY_RESEND;
      const receiver = import.meta.env.PUBLIC_CONTACT_RECEIVER_EMAIL;

      if (!apiKey) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "El servicio de correo no está configurado.",
        });
      }

      const resend = new Resend(apiKey);

      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [receiver],
        replyTo: email,
        subject: `Nuevo mensaje de ${name} [Portafolio]`,
        html: `
          <h2>Nuevo mensaje de contacto desde el Portafolio</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email remitente:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <blockquote style="background: #f4f4f5; padding: 12px; border-left: 4px solid #10240c; font-family: sans-serif; white-space: pre-wrap;">
            ${message}
          </blockquote>
        `,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message || "Error al enviar el correo a través de Resend.",
        });
      }

      return { success: true, id: data?.id };
    },
  }),
};
