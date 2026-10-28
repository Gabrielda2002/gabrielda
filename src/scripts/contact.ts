import { actions } from "astro:actions";

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
  if (!form) return;

  const nameInput = form.querySelector<HTMLInputElement>("#c-name");
  const emailInput = form.querySelector<HTMLInputElement>("#c-mail");
  const msgInput = form.querySelector<HTMLTextAreaElement>("#c-msg");

  const nameField = form.querySelector<HTMLElement>("#f-name");
  const emailField = form.querySelector<HTMLElement>("#f-mail");
  const msgField = form.querySelector<HTMLElement>("#f-msg");

  const nameErr = form.querySelector<HTMLElement>("#e-name");
  const emailErr = form.querySelector<HTMLElement>("#e-mail");
  const msgErr = form.querySelector<HTMLElement>("#e-msg");

  const statusEl = form.querySelector<HTMLElement>("[data-contact-status]");
  const submitBtn = form.querySelector<HTMLButtonElement>("button[type='submit']");
  const originalBtnHtml = submitBtn?.innerHTML || "Enviar mensaje";

  function clearErrors(): void {
    nameField?.classList.remove("bad");
    emailField?.classList.remove("bad");
    msgField?.classList.remove("bad");
    if (nameErr) nameErr.textContent = "";
    if (emailErr) emailErr.textContent = "";
    if (msgErr) msgErr.textContent = "";
  }

  function setStatus(msg: string, type: "ok" | "err"): void {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.className = `status show ${type}`;
    statusEl.textContent = msg;
  }

  function clearStatus(): void {
    if (!statusEl) return;
    statusEl.hidden = true;
    statusEl.className = "status";
    statusEl.textContent = "";
  }

  // Real-time error dismissal when user interacts
  nameInput?.addEventListener("input", () => {
    nameField?.classList.remove("bad");
    if (nameErr) nameErr.textContent = "";
  });
  emailInput?.addEventListener("input", () => {
    emailField?.classList.remove("bad");
    if (emailErr) emailErr.textContent = "";
  });
  msgInput?.addEventListener("input", () => {
    msgField?.classList.remove("bad");
    if (msgErr) msgErr.textContent = "";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();
    clearStatus();

    const name = nameInput?.value.trim() ?? "";
    const email = emailInput?.value.trim() ?? "";
    const message = msgInput?.value.trim() ?? "";

    let hasClientError = false;

    if (!name || name.length < 2) {
      nameField?.classList.add("bad");
      if (nameErr) nameErr.textContent = "Ingresa tu nombre (mínimo 2 caracteres).";
      hasClientError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailField?.classList.add("bad");
      if (emailErr) emailErr.textContent = "Ingresa un correo electrónico válido.";
      hasClientError = true;
    }

    if (!message || message.length < 10) {
      msgField?.classList.add("bad");
      if (msgErr) msgErr.textContent = "Cuéntame un poco más (mínimo 10 caracteres).";
      hasClientError = true;
    }

    if (hasClientError) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.textContent = "Enviando mensaje...";
    }

    try {
      const { data, error } = await actions.sendContact({ name, email, message });

      if (error) {
        setStatus(error.message || "No se pudo enviar el mensaje. Intenta de nuevo.", "err");
        return;
      }

      if (data?.success) {
        setStatus("¡Mensaje enviado con éxito! Te responderé a la brevedad.", "ok");
        form.reset();
      }
    } catch {
      setStatus("Ocurrió un error inesperado al conectar con el servidor.", "err");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
        submitBtn.innerHTML = originalBtnHtml;
      }
    }
  });
}

