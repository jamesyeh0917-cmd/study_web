// ===== 深淺色切換 =====
(function theme() {
  const root = document.documentElement;
  try { const saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const label = () => (btn.textContent = isDark() ? "淺色" : "深色");
  label();
  btn.addEventListener("click", () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    label();
  });
})();

// ===== 搜尋：輸入框的 data-filter 指定要篩選哪些群組，群組裡沒有符合的就整組隱藏 =====
document.querySelectorAll(".search[data-filter]").forEach((input) => {
  const groups = () => document.querySelectorAll(input.dataset.filter);
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    groups().forEach((g) => {
      let any = false;
      g.querySelectorAll("li").forEach((li) => {
        const hit = !q || li.textContent.toLowerCase().includes(q);
        li.hidden = !hit;
        if (hit) any = true;
      });
      g.hidden = !any;
      if (q && any && g.tagName === "DETAILS") g.open = true;
    });
  });
});
