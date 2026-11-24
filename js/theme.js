(function () {
  var root = document.documentElement;
  var button = document.querySelector(".theme-toggle");
  if (!button) return;

  function label() {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", "Switch to " + next + " mode");
  }

  button.addEventListener("click", function () {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch (e) {}
    label();
  });

  label();
})();

(function () {
  function fitTimelines() {
    document.querySelectorAll(".timeline").forEach(function (list) {
      var dots = list.querySelectorAll(".step > h3, .step > h4");
      if (!dots.length) return;
      var box = list.getBoundingClientRect();
      var first = dots[0].getBoundingClientRect();
      var last = dots[dots.length - 1].getBoundingClientRect();
      var offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.45 + 5;
      var top = first.top - box.top + offset;
      var bottom = last.top - box.top + offset;
      list.style.setProperty("--rail-top", top + "px");
      list.style.setProperty("--rail-height", Math.max(bottom - top, 0) + "px");
      list.classList.add("fitted");
    });
  }

  window.addEventListener("load", fitTimelines);
  window.addEventListener("resize", fitTimelines);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTimelines);
  fitTimelines();
})();
