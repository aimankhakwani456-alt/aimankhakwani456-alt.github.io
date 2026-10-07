document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Certificate lightbox
  var dlg = document.getElementById("dlg");
  var btn = document.getElementById("certBtn");
  if (btn && dlg) {
    btn.addEventListener("click", function () {
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    });
    dlg.addEventListener("click", function () {
      if (dlg.close) dlg.close(); else dlg.removeAttribute("open");
    });
  }

  // Highlight the nav link of the section in view
  var links = document.querySelectorAll("#navLinks a");
  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (a) { a.classList.remove("active"); a.removeAttribute("aria-current"); });
          map[e.target.id].classList.add("active");
          map[e.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  // Contact form: opens the visitor's email app (no server needed)
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var d = new FormData(form);
      var subject = "Portfolio message from " + d.get("n");
      var body = d.get("m") + "\n\n" + d.get("n") + " (" + d.get("e") + ")";
      window.location.href = "mailto:aimankhawkwani@gmail.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
});
