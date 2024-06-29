
const reveal = document.querySelectorAll(".reveal");
 function valueSetters() {
  gsap.set("#nav a", { y: "-100%", opacity: 0 });
  gsap.set("#hero-section .parent .child", { y: "100%", opacity: 0 });
  gsap.set("#hero-section .row h5", { y: "100%", opacity: 0 });
  gsap.set("#hero-section .row img", { opacity: 0 });
  document.querySelectorAll("#Visual>g").forEach((e) => {
    var character = e.childNodes[1].childNodes[1];
    character.style.strokeDasharray = character.getTotalLength() + "px";
    character.style.strokeDashoffset = character.getTotalLength() + "px";
  });
}
function animateSvg() {
  gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
    strokeDashoffset: 0,
    duration: 2,
    ease: Expo.easeInOut,
  });
}
function animateHome() {
  var tl = gsap.timeline();
  tl.to("#nav a", {
    y: 0,
    opacity: 1,
    duration: 0.3,
    stagger: 0.1,
  });
  tl.to("#hero-section .parent .child", {
    y: 0,
    opacity: 1,
    duration: 0.2,
    stagger: 0.2,
  });
  tl.to("#hero-section .row h5", {
    y: 0,
    opacity: 1,
    duration: 0.2,
    stagger: 0.2,
  });
  tl.to("#hero-section .row img", {
    opacity: 1,
    duration: 0.2,
    stagger: 0.2,
    ease: Circ.easeIn,
    onComplete: function () {
      animateSvg();
    },
  });
}

reveal.forEach((rev) => {
  let revText = rev.innerHTML;
  let parent = document.createElement("span");
  let child = document.createElement("span");
  parent.classList.add("parent");
  child.classList.add("child");
  parent.appendChild(child);
  child.innerHTML = revText;
  rev.innerHTML = "";
  rev.appendChild(parent);
});
valueSetters();
let tl = gsap.timeline();
tl.from("#loader .child span", {
  x: "100%",
  opacity: 0,
  duration: 2,
  stagger: 0.1,
  ease: "circ.out",
});
tl.to("#loader .parent .child", {
  y: "-100%",
  opacity: 0,
  duration: 0.3,
});
tl.to("#loader", {
  height: 0,
  duration: 0.5,
  onComplete: function () {
    animateHome();
  },
});
