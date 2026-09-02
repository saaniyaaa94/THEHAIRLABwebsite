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

  var todayRow = document.querySelector('.hours-table tr[data-day="' + new Date().getDay() + '"]');
  if (todayRow) {
    todayRow.classList.add("today");
  }

  var revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  var reviewBars = document.querySelectorAll(".bar i[data-width]");
  reviewBars.forEach(function (bar) {
    bar.style.width = "0";
  });
  if ("IntersectionObserver" in window && reviewBars.length) {
    var barObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute("data-width");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    reviewBars.forEach(function (bar) {
      barObserver.observe(bar);
    });
  } else {
    reviewBars.forEach(function (bar) {
      bar.style.width = bar.getAttribute("data-width");
    });
  }

  // Safety net: guarantee everything is visible even if a scroll-triggered
  // observer never fires (fast scrollers, crawlers, odd viewport states).
  setTimeout(function () {
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
    reviewBars.forEach(function (bar) {
      if (bar.style.width === "0px" || bar.style.width === "0") {
        bar.style.width = bar.getAttribute("data-width");
      }
    });
  }, 2500);

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
