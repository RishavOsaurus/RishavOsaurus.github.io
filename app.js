/* Portfolio interactions: project details, CV dialog, nav menu. No dependencies. */
(function () {
  "use strict";

  var openId = null;
  var modal = document.getElementById("cv-modal");
  var navToggle = document.getElementById("nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  var moreItem = document.querySelector(".more-item");
  var moreToggle = document.querySelector(".more-toggle");

  function setNavOpen(open) {
    if (!navToggle || !navMenu) return;
    navMenu.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  }

  function setMoreOpen(open) {
    if (!moreItem || !moreToggle) return;
    moreItem.classList.toggle("open", open);
    moreToggle.setAttribute("aria-expanded", String(open));
  }

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
      var frame = modal.querySelector("iframe[data-src]");
      if (frame) {
        frame.src = frame.getAttribute("data-src");
        frame.removeAttribute("data-src");
      }
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

    if (navToggle && e.target.closest("#nav-toggle")) {
      setNavOpen(!navMenu.classList.contains("open"));
      return;
    }
    if (moreToggle && e.target.closest(".more-toggle")) {
      setMoreOpen(!moreItem.classList.contains("open"));
      return;
    }
    if (navMenu && navMenu.classList.contains("open") && e.target.closest("#nav-menu a")) {
      setNavOpen(false);
    }
    if (moreItem && moreItem.classList.contains("open") && e.target.closest(".more-menu a")) {
      setMoreOpen(false);
      return;
    }
    if (moreItem && moreItem.classList.contains("open") && !e.target.closest(".more-item")) {
      setMoreOpen(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (modal && !modal.hidden) setCv(false);
    setNavOpen(false);
    setMoreOpen(false);
  });

  var desktopQuery = window.matchMedia("(min-width: 900px)");
  function closeMenus() {
    setNavOpen(false);
    setMoreOpen(false);
  }
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", closeMenus);
  } else if (desktopQuery.addListener) {
    desktopQuery.addListener(closeMenus);
  }

  setOpen(null);
})();
