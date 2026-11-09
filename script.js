const WHATSAPP_NUMBER_RAW = "5519992362891";
const WHATSAPP_NUMBER_DISPLAY = "+55 19 99236-2891";

const PRODUCTS_DATA = {
  aquecimento: {
    title: "Aquecimento e Revestimento",
    image: "assets/diagrama-linha.png",
    description:
      "Soluções de aquecimento por indução para processos de revestimento de aço, incluindo galvanização, galvannealing, estanhamento e secagem de revestimentos. Tecnologia voltada ao controle térmico, à eficiência e à produtividade das linhas industriais."
  },
  laminacao: {
    title: "Laminação IMZ",
    image: "assets/prod-laminacao.png",
    description:
      "Sistemas de aquecimento e reaquecimento por indução multizona para barras e tarugos antes da laminação ou do forjamento. Permitem maior uniformidade de temperatura, controle do processo e potencial de redução do consumo de combustível e da formação de carepa."
  },
  fusao: {
    title: "Fusão de Cátodo de Zinco",
    image: "assets/prod-fusao-zinco.png",
    description:
      "Soluções de fusão por indução para transformar catodos de zinco em metal líquido, além de permitir a manutenção da temperatura e o preparo de ligas. Aplicadas a processos de galvanização e revestimento, oferecem controle e eficiência na operação."
  },
  tempera: {
    title: "Têmpera de Cilindro",
    image: "assets/prod-tempera.png",
    description:
      "Sistemas de aquecimento por indução para tratamento térmico de cilindros utilizados em laminadores. O processo promove o endurecimento superficial do material, aumentando sua resistência ao desgaste e contribuindo para maior vida útil dos cilindros."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initProductCards();
  initPillSelectors();
  initWhatsAppAndForm();
  initSocialLinksChoice();
});

/* =========================================================
   1. INTERACTIVE PRODUCT DESCRIPTIONS
========================================================= */
let currentProductId = null;

function initProductCards() {
  const cards = document.querySelectorAll(".product-card");
  const drawer = document.getElementById("productDetailDrawer");
  const detailImg = document.getElementById("detailProductImg");
  const detailTitle = document.getElementById("detailProductTitle");
  const detailDesc = document.getElementById("detailProductDesc");
  const closeBtn = document.getElementById("closeDetailBtn");
  const detailQuoteBtn = document.getElementById("detailQuoteBtn");
  const detailFormScrollBtn = document.getElementById("detailFormScrollBtn");

  function selectProduct(productId, shouldScroll = false) {
    const data = PRODUCTS_DATA[productId];
    if (!data) return;

    const isSameAndOpen = currentProductId === productId && !drawer.hasAttribute("hidden");
    currentProductId = productId;

    cards.forEach((card) => {
      const isMatch = card.dataset.productId === productId;
      card.classList.toggle("active", isMatch);
      card.setAttribute("aria-selected", isMatch ? "true" : "false");
      const labelEl = card.querySelector(".trigger-label");
      if (labelEl) {
        labelEl.textContent = isMatch ? "Descritivo aberto" : "Ver descritivo";
      }
    });

    detailImg.src = data.image;
    detailImg.alt = data.title;
    detailTitle.textContent = data.title;
    detailDesc.textContent = data.description;
    drawer.removeAttribute("hidden");

    if (shouldScroll && !isSameAndOpen) {
      drawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.productId;
      if (currentProductId === id && !drawer.hasAttribute("hidden")) {
        // Toggle close if clicking the already open card
        drawer.setAttribute("hidden", "");
        card.classList.remove("active");
        card.setAttribute("aria-selected", "false");
        const labelEl = card.querySelector(".trigger-label");
        if (labelEl) labelEl.textContent = "Ver descritivo";
      } else {
        selectProduct(id, true);
      }
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  function closeDrawer() {
    drawer.setAttribute("hidden", "");
    cards.forEach((c) => {
      c.classList.remove("active");
      c.setAttribute("aria-selected", "false");
      const labelEl = c.querySelector(".trigger-label");
      if (labelEl) labelEl.textContent = "Ver descritivo";
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const openCard = document.querySelector(".product-card.active");
      closeDrawer();
      if (openCard) openCard.focus();
    });
  }

  document.addEventListener("keydown", (e) => {
    const modalOpen = !document.getElementById("socialModal")?.hasAttribute("hidden");
    if (e.key === "Escape" && !modalOpen && !drawer.hasAttribute("hidden")) {
      closeDrawer();
    }
  });

  if (detailQuoteBtn) {
    detailQuoteBtn.addEventListener("click", () => {
      const data = PRODUCTS_DATA[currentProductId];
      const msg = [
        `Olá! Vim pelo site da *Inductotherm Group Brasil*`,
        `Gostaria de solicitar um orçamento / falar com um especialista sobre a solução:`,
        `*${data ? data.title : "Linha de Revestimento"}*`
      ].join("\n");
      openWhatsAppDirect(msg);
    });
  }

  if (detailFormScrollBtn) {
    detailFormScrollBtn.addEventListener("click", () => {
      const challengeInput = document.getElementById("mainChallenge");
      const data = PRODUCTS_DATA[currentProductId];
      if (challengeInput && data && !challengeInput.value.trim()) {
        challengeInput.value = `Interesse na solução: ${data.title}. `;
      }
    });
  }
}

/* =========================================================
   2. FORM PILL SELECTORS
========================================================= */
function initPillSelectors() {
  const stacks = document.querySelectorAll(".pill-options-stack");
  stacks.forEach((stack) => {
    const targetInputId = stack.dataset.targetInput;
    const hiddenInput = document.getElementById(targetInputId);
    const buttons = stack.querySelectorAll(".pill-option");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => {
          b.classList.remove("selected");
          b.setAttribute("aria-checked", "false");
        });
        btn.classList.add("selected");
        btn.setAttribute("aria-checked", "true");
        if (hiddenInput) {
          hiddenInput.value = btn.dataset.value;
        }
      });
    });
  });
}

/* =========================================================
   3. DIRECT WHATSAPP & FORM SUBMISSION (+55 19 99236-2891)
========================================================= */
function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(message)}`;
}

function openWhatsAppDirect(message) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

function initWhatsAppAndForm() {
  const triggers = document.querySelectorAll("[data-whatsapp-trigger]");
  const form = document.getElementById("discoveryForm");

  triggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const context = btn.dataset.context || "Solicitação de Orçamento";
      const message = [
        `Olá! Vim pelo site da *Inductotherm Group Brasil*.`,
        `Assunto: *${context}*`,
        `Gostaria de falar com um especialista e solicitar um orçamento.`
      ].join("\n");

      openWhatsAppDirect(message);
    });
  });

  if (form) {
    const requiredFields = [
      { id: "companyName", empty: "Informe o nome da empresa." },
      { id: "personRole", empty: "Informe seu nome e cargo." },
      { id: "workEmail", empty: "Informe seu e-mail profissional.", invalid: "Digite um e-mail válido (ex.: nome@empresa.com.br)." }
    ];

    function validateField(field) {
      const input = document.getElementById(field.id);
      const errorEl = document.getElementById(`${field.id}Error`);
      const value = input.value.trim();
      let message = "";
      if (!value) {
        message = field.empty;
      } else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        message = field.invalid;
      }
      input.setAttribute("aria-invalid", message ? "true" : "false");
      input.classList.toggle("is-invalid", Boolean(message));
      if (errorEl) errorEl.textContent = message;
      return !message;
    }

    requiredFields.forEach((field) => {
      const input = document.getElementById(field.id);
      // Re-validate while typing only after the field was flagged
      input.addEventListener("input", () => {
        if (input.classList.contains("is-invalid")) validateField(field);
      });
      input.addEventListener("blur", () => {
        if (input.value.trim()) validateField(field);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const invalid = requiredFields.filter((field) => !validateField(field));
      if (invalid.length) {
        document.getElementById(invalid[0].id).focus();
        showToast("Preencha os campos obrigatórios para enviar.");
        return;
      }

      const companyName = document.getElementById("companyName").value.trim();
      const personRole = document.getElementById("personRole").value.trim();
      const workEmail = document.getElementById("workEmail").value.trim();
      const companySize = document.getElementById("companySize").value || "Entre 11 e 50";
      const mainChallenge = document.getElementById("mainChallenge").value.trim() || "Otimização e eficiência de linha";
      const startTimeline = document.getElementById("startTimeline").value || "Imediatamente";

      const message = [
        `Olá! Gostaria de solicitar um orçamento com um especialista da *Inductotherm Group Brasil*.`,
        `• *Empresa:* ${companyName}`,
        `• *Nome e Cargo:* ${personRole}`,
        `• *E-mail:* ${workEmail}`,
        `• *Nº de Funcionários:* ${companySize}`,
        `• *Principal Desafio:* ${mainChallenge}`,
        `• *Prazo para Início:* ${startTimeline}`
      ].join("\n");

      openWhatsAppDirect(message);
    });
  }
}

/* =========================================================
   4. SOCIAL MEDIA CHOICE MODAL (COPY NAME OR OPEN LINK)
========================================================= */
function initSocialLinksChoice() {
  const socialBtns = document.querySelectorAll(".social-link-btn");
  const modal = document.getElementById("socialModal");
  const closeBtn = document.getElementById("closeSocialModal");
  const badgeEl = document.getElementById("socialModalBadge");
  const titleEl = document.getElementById("socialModalTitle");
  const profileNameEl = document.getElementById("socialProfileName");
  const copyBtn = document.getElementById("copySocialNameBtn");
  const copyBtnText = document.getElementById("copySocialBtnText");
  const openLinkBtn = document.getElementById("openSocialLinkBtn");

  let activeSocialName = "";
  let lastTrigger = null;

  function closeModal() {
    if (!modal || modal.hasAttribute("hidden")) return;
    modal.setAttribute("hidden", "");
    modal.setAttribute("aria-hidden", "true");
    if (lastTrigger) lastTrigger.focus();
  }

  socialBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const network = btn.dataset.socialNetwork;
      const name = btn.dataset.socialName;
      const url = btn.dataset.socialUrl;

      activeSocialName = name;
      badgeEl.textContent = network;
      titleEl.textContent = `Você quer copiar o nome ou abrir o link do ${network}?`;
      profileNameEl.textContent = name;
      copyBtnText.textContent = `Copiar "${name}"`;
      openLinkBtn.href = url;

      lastTrigger = btn;
      modal.removeAttribute("hidden");
      modal.setAttribute("aria-hidden", "false");
      if (closeBtn) closeBtn.focus();
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      if (!activeSocialName) return;
      copyTextToClipboard(activeSocialName, `Nome "${activeSocialName}" copiado para a área de transferência!`);
    });
  }

  if (openLinkBtn) openLinkBtn.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* =========================================================
   5. CLIPBOARD & TOAST HELPERS
========================================================= */
function copyTextToClipboard(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast(successMsg))
      .catch(() => fallbackCopy(text, successMsg));
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const temp = document.createElement("textarea");
  temp.value = text;
  temp.style.position = "fixed";
  temp.style.opacity = "0";
  document.body.appendChild(temp);
  temp.select();
  try {
    document.execCommand("copy");
    showToast(successMsg);
  } catch (err) {
    showToast(`Copie manualmente: ${text}`);
  }
  document.body.removeChild(temp);
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  if (!toast) return;
  toast.textContent = message;
  toast.removeAttribute("hidden");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.setAttribute("hidden", "");
  }, 3400);
}
