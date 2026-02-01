const buttons = document.querySelectorAll(".toggle-buttons__button");
const activeSpan = document.createElement("span");
activeSpan.classList.add("toggle-buttons__active");
activeSpan.setAttribute("aria-hidden", "true");

// Função para atualizar o botão ativo baseado na seção visível
function updateActiveButton() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".toggle-buttons__button");
  
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `#${current}`) {
      const newItem = link.parentElement;
      if (!document.startViewTransition) {
        newItem.appendChild(activeSpan);
        return;
      }
      document.startViewTransition(() => {
        newItem.appendChild(activeSpan);
      });
    }
  });
}

// Inicializar com o primeiro item ativo
if (buttons.length > 0) {
  const firstItem = buttons[0].parentElement;
  firstItem.appendChild(activeSpan);
}

buttons.forEach((button, index) => {
  button.style.viewTransitionName = `button-${index + 1}`;
  button.setAttribute("aria-pressed", index === 0);

  button.addEventListener("click", (e) => {
    e.preventDefault();
    const href = button.getAttribute("href");
    const target = document.querySelector(href);
    
    if (target) {
      const targetPosition = target.offsetTop - 80;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }

    buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");

    const newItem = button.parentElement;

    if (!document.startViewTransition) {
      newItem.appendChild(activeSpan);
      return;
    }

    document.startViewTransition(() => {
      newItem.appendChild(activeSpan);
    });
  });
});

// Atualizar botão ativo ao fazer scroll
window.addEventListener("scroll", updateActiveButton);
window.addEventListener("load", updateActiveButton);