/* Shared by all concepts: mobile nav + "Request a blanket" form -> mailto (no backend). */
(function () {
  var TO = "beaglebug18@gmail.com"; // <- change here to change where requests go
  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function setNav(open) {
    if (!toggle) return;
    toggle.setAttribute("aria-expanded", String(open));
    if (header) header.classList.toggle("nav-open", open);
  }
  if (toggle) {
    toggle.addEventListener("click", function () { setNav(toggle.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });
    if (nav) nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
  }
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 12); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  }

  var form = document.getElementById("request-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var v = function (n) { return (form.elements[n].value || "").trim(); };
    var body = [
      "Hi! I'd like to request a blanket from Wrapped in Grace Co.",
      "",
      "Name: " + v("name"),
      "Email: " + v("email"),
      "Size: " + v("size"),
      "Colors: " + (v("colors") || "(not sure yet)"),
      "",
      "Notes:",
      v("notes") || "(none)"
    ].join("\n");
    var subject = "Blanket request from " + v("name");
    var href = "mailto:" + TO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    if (status) {
      status.textContent = "Opening your email app with your request filled in. Just press send. If nothing opens, email " + TO + " directly.";
      status.className = "form-status is-info";
    }
    window.location.href = href;
  });
})();
