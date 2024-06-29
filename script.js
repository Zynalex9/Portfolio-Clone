document.addEventListener("DOMContentLoaded", function () {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"), // Replace with your container ID or class
    smooth: true,
    // Other options as needed
  });
});
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

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
gsap.registerPlugin("scrollTrigger");
gsap.from(".part-2 .right-section .img-container", {
  x: "-10%",
  scrollTrigger: {
    trigger: ".part-2",
    scroller: "#main",
    start: "top 50%",
    end: "bottom 30%",
    scrub: true,
  },
});
const containers = document.querySelectorAll(".image-container");
const container3 = document.querySelector("#con3");

containers.forEach((container) => {
  const hoverAnim = container.querySelector(".hover-anim-section1");

  container.addEventListener("mouseenter", (e) => {
    hoverAnim.style.display = "block";
  });

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    gsap.to(hoverAnim, {
      x: offsetX,
      y: offsetY,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  container.addEventListener("mouseleave", (e) => {
    hoverAnim.style.display = "none";
  });
});

const hoverAnim3 = container3.querySelector(".hover-anim-section1");

container3.addEventListener("mouseenter", (e) => {
  hoverAnim3.style.display = "block";
});

container3.addEventListener("mousemove", (e) => {
  const rect = container3.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  gsap.to(hoverAnim3, {
    x: offsetX,
    y: offsetY,
    duration: 0.2,
    ease: "power2.out",
  });
});

container3.addEventListener("mouseleave", (e) => {
  hoverAnim3.style.display = "none";
});

gsap.from(".work-headings .breaking-line", {
  width: "0",
  scrollTrigger: {
    trigger: ".work-headings",
    scroller: "#main",
    start: "top 40%",
    end: "bottom 20%",
    scrub: true,

  },
});
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".links-side a");
  const archivesImgContainer = document.getElementById(
    "archives-img-container"
  );

  links.forEach((link, idx) => {
    link.addEventListener("mouseenter", (e) => {
      const imgUrl = link.dataset.img;
      archivesImgContainer.style.backgroundImage = `url('${imgUrl}')`;
    });
  });
});
