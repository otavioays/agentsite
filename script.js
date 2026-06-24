const CONFIG = {
  // Troque pelo número comercial no formato DDI + DDD + número, somente dígitos.
  // Exemplo para Foz do Iguaçu: 5545999999999
  whatsappNumber: "5545999999999",
};

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
  });
});

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll("details[open]").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay || 0);
      window.setTimeout(() => entry.target.classList.add("visible"), delay);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.getElementById("current-year").textContent = new Date().getFullYear();

function createWhatsappUrl(message) {
  const encodedMessage = encodeURIComponent(message);

  if (!CONFIG.whatsappNumber || /9{7,}/.test(CONFIG.whatsappNumber)) {
    return `https://api.whatsapp.com/send?text=${encodedMessage}`;
  }

  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
}

const genericMessage = [
  "Olá! Vi o site da Agent Sites e quero entender como seria um projeto para minha empresa.",
  "Podemos conversar?",
].join("\n\n");

const whatsappFloat = document.getElementById("whatsapp-float");
if (whatsappFloat) whatsappFloat.href = createWhatsappUrl(genericMessage);

const simulator = document.getElementById("site-simulator");
const simulatorSteps = [...document.querySelectorAll(".sim-step")];
const progressBars = [...document.querySelectorAll(".simulator-progress span")];
const resultPanel = document.getElementById("sim-result");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const resultFeatures = document.getElementById("result-features");
const resultWhatsapp = document.getElementById("result-whatsapp");
const restartButton = document.getElementById("restart-simulator");

let currentStep = 0;

function selectedValue(name) {
  return simulator?.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

function showStep(stepIndex) {
  currentStep = Math.max(0, Math.min(stepIndex, simulatorSteps.length - 1));

  simulatorSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
    const error = step.querySelector(".form-error");
    if (error) error.textContent = "";
  });

  progressBars.forEach((bar, index) => {
    bar.classList.toggle("active", index <= currentStep);
  });
}

function validateStep(stepIndex) {
  const fieldNames = ["business", "goal", "style"];
  const currentField = fieldNames[stepIndex];
  const step = simulatorSteps[stepIndex];
  const error = step?.querySelector(".form-error");

  if (!selectedValue(currentField)) {
    if (error) error.textContent = "Escolha uma opção para continuar.";
    return false;
  }

  if (error) error.textContent = "";
  return true;
}

document.querySelectorAll(".sim-next").forEach((button) => {
  button.addEventListener("click", () => {
    if (validateStep(currentStep)) showStep(currentStep + 1);
  });
});

document.querySelectorAll(".sim-back").forEach((button) => {
  button.addEventListener("click", () => showStep(currentStep - 1));
});

const recommendations = {
  "Clínica ou consultório": {
    title: "Um site que transmite cuidado antes da consulta.",
    intro: "Sua clínica precisa facilitar a decisão, reduzir dúvidas e tornar o agendamento óbvio.",
    features: ["Serviços e especialidades", "Equipe profissional", "Mapa e horários", "Agendamento no WhatsApp"],
  },
  "Restaurante ou delivery": {
    title: "Um site que abre o apetite e encurta o pedido.",
    intro: "Seu cardápio, localização e canais de pedido devem aparecer sem ruído e com personalidade.",
    features: ["Cardápio visual", "Pedidos rápidos", "Horários atualizados", "Localização integrada"],
  },
  "Construção ou arquitetura": {
    title: "Um portfólio digital à altura dos seus projetos.",
    intro: "Uma apresentação forte transforma obras e projetos em prova concreta de competência.",
    features: ["Portfólio de projetos", "Antes e depois", "Serviços e diferenciais", "Solicitação de orçamento"],
  },
  "Serviço profissional": {
    title: "Autoridade digital para vender conhecimento e confiança.",
    intro: "Seu site deve explicar com clareza o que você resolve, para quem e por que escolher seu trabalho.",
    features: ["Apresentação profissional", "Serviços organizados", "Depoimentos", "Contato direto"],
  },
  "Loja ou comércio": {
    title: "Uma vitrine online que leva o cliente até a compra.",
    intro: "Produtos, diferenciais e canais de atendimento precisam trabalhar juntos para gerar movimento.",
    features: ["Vitrine de produtos", "Ofertas em destaque", "WhatsApp comercial", "Endereço e horários"],
  },
  "Outro tipo de negócio": {
    title: "Uma presença digital desenhada para o seu modelo.",
    intro: "A estrutura será criada ao redor do comportamento do seu cliente e do objetivo principal da empresa.",
    features: ["Estrutura personalizada", "Identidade da marca", "Conversão por WhatsApp", "Experiência mobile"],
  },
};

function buildResult() {
  const business = selectedValue("business");
  const goal = selectedValue("goal");
  const style = selectedValue("style");
  const recommendation = recommendations[business] || recommendations["Outro tipo de negócio"];

  resultTitle.textContent = recommendation.title;
  resultDescription.textContent = `${recommendation.intro} A direção visual recomendada é ${style.toLowerCase()}, com foco em ${goal.toLowerCase()}.`;
  resultFeatures.innerHTML = recommendation.features.map((feature) => `<span>✓ ${feature}</span>`).join("");

  const message = [
    "Olá! Fiz a simulação no site da Agent Sites e quero solicitar uma demonstração.",
    `Tipo de negócio: ${business}`,
    `Objetivo principal: ${goal}`,
    `Estilo preferido: ${style}`,
    "Gostaria de conversar sobre o projeto e o plano de R$ 99/mês.",
  ].join("\n\n");

  resultWhatsapp.href = createWhatsappUrl(message);
  simulator.style.display = "none";
  resultPanel.classList.add("active");
  resultPanel.focus?.();
}

simulator?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateStep(2)) buildResult();
});

restartButton?.addEventListener("click", () => {
  simulator.reset();
  simulator.style.display = "block";
  resultPanel.classList.remove("active");
  showStep(0);
});

simulator?.querySelectorAll("input").forEach((input) => {
  input.addEventListener("change", () => {
    const error = input.closest("fieldset")?.querySelector(".form-error");
    if (error) error.textContent = "";
  });
});
