
(function(){
  const root = document.documentElement;

  const saved = localStorage.getItem("cv_theme");
  if (saved) root.setAttribute("data-theme", saved);

  const themeBtn = document.getElementById("themeBtn");
  themeBtn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("cv_theme", next);

    const i = themeBtn.querySelector("i");
    if (i) {
      i.classList.toggle("fa-moon", next === "dark");
      i.classList.toggle("fa-sun", next === "light");
    }
  });

  document.getElementById("printBtn")?.addEventListener("click", () => window.print());

  const y = new Date().getFullYear();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = `© ${y} · Actualiza enlaces y datos en index.html`;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const items = Array.from(document.querySelectorAll(".skill"));

  function setFilter(group){
    if (!group){
      items.forEach(i => i.style.display = "");
      return;
    }
    items.forEach(i => {
      const g = i.getAttribute("data-group");
      i.style.display = (g === group) ? "" : "none";
    });
  }

  document.getElementById("showAllBtn")?.addEventListener("click", () => setFilter(null));
  document.getElementById("filterQaBtn")?.addEventListener("click", () => setFilter("qa"));
  document.getElementById("filterDevBtn")?.addEventListener("click", () => setFilter("dev"));



  // Toggle certificados: grilla <-> lista
  const certGrid = document.getElementById("certGrid");
  const toggleCert = document.getElementById("toggleCertView");
  let certList = false;
  toggleCert?.addEventListener("click", (e) => {
    e.preventDefault();
    if (!certGrid) return;
    certList = !certList;
    certGrid.classList.toggle("certs--list", certList);
  });

  const topBtn = document.getElementById("toTopBtn");
  topBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();
