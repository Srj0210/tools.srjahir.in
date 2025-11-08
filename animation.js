// Animate logo, text, and tool cards
window.addEventListener("load", () => {
  gsap.from(".logo", {
    duration: 1,
    opacity: 0,
    scale: 0.8,
    ease: "power2.out"
  });

  gsap.from("h1", {
    duration: 1,
    y: -20,
    opacity: 0,
    delay: 0.3,
    ease: "power3.out"
  });

  gsap.from(".subtitle", {
    duration: 1,
    opacity: 0,
    y: 10,
    delay: 0.5
  });

  gsap.to(".fade-in-up", {
    scrollTrigger: {
      trigger: ".tools-section",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
  });
});
