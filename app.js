/* Portfolio interactions: project details, CV dialog. No dependencies. */
(function () {
  "use strict";

  var openId = null;
  var modal = document.getElementById("cv-modal");

  function setOpen(id) {
    openId = openId === id ? null : id;
    document.querySelectorAll("[data-details]").forEach(function (panel) {
      panel.style.display = panel.getAttribute("data-details") === openId ? "block" : "none";
    });
    document.querySelectorAll("[data-toggle]").forEach(function (btn) {
      var on = btn.getAttribute("data-toggle") === openId;
      btn.setAttribute("aria-expanded", String(on));
      btn.textContent = on ? "Hide details" : "Details";
    });
  }

  function setCv(open) {
    if (!modal) return;
    modal.hidden = !open;
    modal.style.display = open ? "flex" : "none";
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      var close = modal.querySelector("[data-cv-close]");
      if (close) close.focus();
    }
  }

  document.addEventListener("click", function (e) {
    var toggle = e.target.closest("[data-toggle]");
    if (toggle) { setOpen(toggle.getAttribute("data-toggle")); return; }
    if (e.target.closest("[data-cv-open]")) { setCv(true); return; }
    if (e.target.closest("[data-cv-close]")) { setCv(false); return; }
    if (modal && !modal.hidden && e.target === modal) setCv(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) setCv(false);
  });

  setOpen(null);
})();
