const TYPEWRITER_SPEED_MS = 42;

function buildLines(senderName: string): string[] {
  return [
    `¡${senderName} envió el mensaje!`,
    "El mensaje llegó sano y salvo a su destino.",
    "Gabriel te responderá a la brevedad.",
  ];
}

export function showSuccessDialog(form: HTMLFormElement, senderName: string): void {
  const overlay = form.querySelector<HTMLElement>("[data-contact-dialog]");
  const typedEl = overlay?.querySelector<HTMLElement>("#cd-typed");
  const caretEl = overlay?.querySelector<HTMLElement>(".cd-caret");
  const advanceBtn = overlay?.querySelector<HTMLButtonElement>(".cd-advance");

  if (!overlay || !typedEl || !caretEl || !advanceBtn) return;
  if (!overlay.hidden) return; // already open — prevent stacking

  const lines = buildLines(senderName);
  let lineIndex = 0;
  let isTyping = false;
  let typeInterval: ReturnType<typeof setInterval> | null = null;

  function showCaret(): void {
    caretEl!.classList.add("cd-caret--on");
  }

  function hideCaret(): void {
    caretEl!.classList.remove("cd-caret--on");
  }

  function typeLine(line: string): void {
    typedEl!.textContent = "";
    hideCaret();
    isTyping = true;
    let i = 0;
    typeInterval = setInterval(() => {
      typedEl!.textContent += line[i++];
      if (i >= line.length) {
        clearInterval(typeInterval!);
        typeInterval = null;
        isTyping = false;
        showCaret();
      }
    }, TYPEWRITER_SPEED_MS);
  }

  function showFullLine(line: string): void {
    if (typeInterval) { clearInterval(typeInterval); typeInterval = null; }
    typedEl!.textContent = line;
    isTyping = false;
    showCaret();
  }

  function advance(): void {
    if (isTyping) {
      showFullLine(lines[lineIndex - 1]);
      return;
    }
    if (lineIndex < lines.length) {
      typeLine(lines[lineIndex++]);
    } else {
      cleanup();
    }
  }


  function onKeyDown(e: KeyboardEvent): void {
    if (["Tab", "Shift", "Control", "Alt", "Meta"].includes(e.key)) return;
    e.preventDefault();
    advance();
  }

  function cleanup(): void {
    overlay!.hidden = true;
    advanceBtn!.removeEventListener("click", advance);
    document.removeEventListener("keydown", onKeyDown);
    form.reset();
  }

  advanceBtn.addEventListener("click", advance);
  document.addEventListener("keydown", onKeyDown);

  overlay.hidden = false;
  typeLine(lines[lineIndex++]);
}

