(function () {
  var visual = document.querySelector(".hero-visual");
  var shot = document.querySelector(".hero-shot");
  if (!visual || !shot) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover)").matches) return;

  visual.addEventListener("mousemove", function (e) {
    var box = visual.getBoundingClientRect();
    var x = (e.clientX - box.left) / box.width - 0.5;
    var y = (e.clientY - box.top) / box.height - 0.5;
    shot.style.setProperty("--ry", (x * 10).toFixed(2) + "deg");
    shot.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
  });

  visual.addEventListener("mouseleave", function () {
    shot.style.removeProperty("--ry");
    shot.style.removeProperty("--rx");
  });
})();
