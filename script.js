document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.textContent = "Sending…";
      status.className = "form-status";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            status.textContent = "Thanks! We've received your message and will be in touch soon.";
            status.className = "form-status success";
          } else {
            status.textContent = "Something went wrong. Please call us at 09 600 2608 instead.";
            status.className = "form-status error";
          }
        })
        .catch(function () {
          status.textContent = "Something went wrong. Please call us at 09 600 2608 instead.";
          status.className = "form-status error";
        });
    });
  }
});
