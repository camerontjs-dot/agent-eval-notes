/* Guided tour navigation for agent-eval-public site */
(function () {
  const TOUR = [
    { id: "start", href: "index.html", label: "Start", step: "00" },
    { id: "method", href: "method.html", label: "Methodology", step: "01" },
    { id: "labels", href: "labels.html", label: "How to read labels", step: "02" },
    { id: "r01", href: "report-01.html", label: "H1 rejection", step: "03" },
    { id: "essay", href: "essay.html", label: "Essay", step: "04" },
    { id: "r06", href: "report-06.html", label: "Verify tool ablation", step: "05" },
    { id: "r02", href: "report-02.html", label: "Multi-path coding", step: "06" },
    { id: "r03", href: "report-03.html", label: "Task-family transfer", step: "07" },
    { id: "r04", href: "report-04.html", label: "RAG routes", step: "08" },
    { id: "r05", href: "report-05.html", label: "Agent-as-evaluator", step: "09" },
    { id: "demo", href: "demo.html", label: "Try the method", step: "10" },
    { id: "limits", href: "limitations.html", label: "Limitations", step: "11" },
    { id: "bullets", href: "bullets.html", label: "Proof points", step: "12" }
  ];
  function currentIndex() {
    const page = document.body.dataset.page || "start";
    const idx = TOUR.findIndex((t) => t.id === page);
    return idx < 0 ? 0 : idx;
  }
  function renderNav() {
    const list = document.getElementById("tour-nav");
    if (!list) return;
    const idx = currentIndex();
    list.innerHTML = TOUR.map((item, i) => {
      const active = i === idx ? " is-active" : "";
      const done = i < idx ? " is-done" : "";
      return `<li><a class="${active}${done}" href="${item.href}" data-tour-link>
        <span class="step">Step ${item.step}</span>
        ${item.label}
      </a></li>`;
    }).join("");
  }
  function renderProgress() {
    const idx = currentIndex();
    const pct = Math.round(((idx + 1) / TOUR.length) * 100);
    const fill = document.getElementById("progress-fill");
    const text = document.getElementById("progress-text");
    if (fill) fill.style.width = pct + "%";
    if (text) text.textContent = (idx + 1) + " / " + TOUR.length;
  }
  function renderTourBar() {
    const prev = document.getElementById("tour-prev");
    const next = document.getElementById("tour-next");
    const idx = currentIndex();
    if (prev) {
      if (idx <= 0) {
        prev.classList.add("is-disabled");
        prev.setAttribute("aria-disabled", "true");
        prev.removeAttribute("href");
      } else {
        prev.href = TOUR[idx - 1].href;
        prev.classList.remove("is-disabled");
        prev.removeAttribute("aria-disabled");
      }
    }
    if (next) {
      if (idx >= TOUR.length - 1) {
        next.textContent = "Tour complete";
        next.classList.add("is-disabled");
        next.setAttribute("aria-disabled", "true");
        next.removeAttribute("href");
      } else {
        next.href = TOUR[idx + 1].href;
        next.textContent = "Next →";
        next.classList.remove("is-disabled");
        next.removeAttribute("aria-disabled");
      }
    }
  }
  function wireMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const close = () => document.body.classList.remove("nav-open");
    if (toggle) toggle.addEventListener("click", () => document.body.classList.toggle("nav-open"));
    document.addEventListener("click", (e) => {
      if (!document.body.classList.contains("nav-open")) return;
      const sidebar = document.querySelector(".sidebar");
      if (sidebar && !sidebar.contains(e.target) && e.target.id !== "nav-toggle") close();
    });
    document.querySelectorAll("[data-tour-link]").forEach((a) => a.addEventListener("click", close));
  }
  function wireKeys() {
    document.addEventListener("keydown", (e) => {
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      const idx = currentIndex();
      if (e.key === "ArrowRight" || e.key === "n" || e.key === "N") {
        if (idx < TOUR.length - 1) window.location.href = TOUR[idx + 1].href;
      }
      if (e.key === "ArrowLeft" || e.key === "p" || e.key === "P") {
        if (idx > 0) window.location.href = TOUR[idx - 1].href;
      }
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    renderNav(); renderProgress(); renderTourBar(); wireMobileNav(); wireKeys();
  });
})();
